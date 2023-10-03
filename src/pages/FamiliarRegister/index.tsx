import { useNavigation, useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { FullLoading, Input, ProfilePictureInput } from '../../components';
import { DATE_MASK } from '../../constants';
import { Container, Continue, Footer, Form } from './styles';
import { StackActions } from '@react-navigation/native';
import { FamiliarTypes, PersonNode, Relation } from '../../models/TreeViewModel';
import { addFamiliarToNode, createFamiliar, getUserNode } from '../../service';
import { saveUser } from '../../store/slices';
import { useDispatch } from 'react-redux';
import { useUser } from '../../hooks';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import uuid from 'react-native-uuid';
import Toast from 'react-native-toast-message'

export const FamiliarRegister = () => {
  const {
    params: { node, relationType },
  } = useRoute();

  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [photo, setPhoto] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const dispatch = useDispatch();
  const user = useUser();

  const handleSubmitNewFamiliar = async () => {
    try {
      setIsLoading(true);

      validateDataNewFamiliar();

      await saveRelationWithParent();
      
      const updatedUser = await getUserNode(user.id);
      dispatch(saveUser(updatedUser));
      navigation.dispatch(StackActions.pop(3));

    } catch(e) {
      console.log('Failed to add new Familiar', e);
      return;
    } finally {
      setIsLoading(false);
    }
  };

  function validateDataNewFamiliar() {
    if (name === '') {
      Toast.show({
        type: 'error',
        text1: 'Por favor informe seu nome'
      })
      throw new Error("Nome é obrigatório");
    }

    if (birthDate === '') {
      Toast.show({
        type: 'error',
        text1: 'Por favor informe sua data de nascimento'
      })
      throw new Error("Data de nascimento é obrigatória");
    }

    validateDate();
  }

  function validateDate() {
    const [day, month, year] = birthDate.split('/').map(Number);

    const invalidDay = day > 31;
    const invalidMonth = month > 12;
    const invalidYear = year > (new Date()).getFullYear();

    const noExistentDate = invalidDay || invalidMonth || invalidYear;

    /**
     * TODO:
     * 1) Validar data minima e máxima
     * 2) Validar data atual
     * 3) Validar data por geração, por exemplo, o pai não pode ter nascido depois do filho
     * 4) Verificar outra possíveis validações
     * 
     */
    if (noExistentDate) {
      Toast.show({
        type: 'error',
        text1: 'Data inválida'
      })

      throw new Error(`Data inválida: ${invalidDay ? "dia inválido" : invalidMonth ? "mes invalido" : "ano invalido"}`);
    }
  }

  async function saveRelationWithParent() {
    const tempId = `${node.id}_${relationType}_${name.trim()}`;
    const uuidV1 = uuid.v1().toString();

    const newFamiliarNode = {
      id: tempId,
      relationId: uuidV1,
      name,
      birthDate,
      photo,
      relations: [setRelation(node.id, uuidV1, relationType)],
    } as PersonNode;
    
    await createFamiliar(newFamiliarNode);
    await addFamiliarToNode(node, {
      id: tempId,
      relationId: uuidV1,
      type: relationType,
    });
  }

  function setRelation(id: string, relationId: string, relationFromFamiliar: FamiliarTypes): Relation {

    return {
      id,
      relationId,
      type: setRelationType(relationFromFamiliar)
    }

  }

  /**
   * The method set the familiar relation with the user.
   * 
   * If the user is creating a parent, the user will be parent's children
   */
  function setRelationType(relationFromFamiliar: FamiliarTypes): FamiliarTypes {

    switch (relationFromFamiliar) {
      case 'Parent':
        return 'Children';
      case 'Children':
        return 'Parent';
      default:
        return relationFromFamiliar;
    }
      
  }

  return (
    <KeyboardAwareScrollView>
      <ScrollView>
        <Container>
          <ProfilePictureInput photoUrl={photo} onChangePhoto={setPhoto} />
          <Form>
            <Input
              value={name}
              onChangeText={setName}
              iconName="person"
              placeholder="Nome *"
            />
            <Input
              value={birthDate}
              onChangeText={setBirthDate}
              iconName="calendar"
              placeholder="Data de Nascimento *"
              keyboardType="numbers-and-punctuation"
              mask={DATE_MASK}
            />
          </Form>
        </Container>
      </ScrollView>
      <Footer>
        <Continue label="Continuar" onPress={handleSubmitNewFamiliar} />
      </Footer>
      <FullLoading show={isLoading} />
    </KeyboardAwareScrollView>
  );
};
