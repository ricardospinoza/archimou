import { useNavigation, useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { FullLoading, Input, ProfilePictureInput } from '../../components';
import { DATE_MASK } from '../../constants';
import { Container, Continue, Footer, Form } from './styles';
import { StackActions } from '@react-navigation/native';
import { PersonNode } from '../../models/TreeViewModel';
import { addFamiliarToNode, createFamiliar, getUserNode } from '../../service';
import { saveUser } from '../../store/slices';
import { useDispatch } from 'react-redux';
import { useUser } from '../../hooks';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
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
    const tempId = `${node.id}_${relationType}_${name.trim()}`;
    if (name === '') {
      Toast.show({
        type: 'error',
        text1: 'Por favor informe seu nome'
      })
      return
    }

    if (birthDate === '') {
      Toast.show({
        type: 'error',
        text1: 'Por favor informe sua data de nascimento'
      })
      return
    }
    const [day, month, year] = birthDate.split('/').map(Number);

    const invalidDay = day > 31;
    const invalidMonth = month > 12;
    const invalidYear = year > (new Date()).getFullYear();

    const noExistentDate = invalidDay || invalidMonth || invalidYear;

    if (noExistentDate) {
      Toast.show({
        type: 'error',
        text1: 'Data inválida'
      })
    }
    const newFamiliarNode = {
      id: tempId,
      name,
      birthDate,
      photo,
      relations: [],
    } as PersonNode;

    try {
      setIsLoading(true);
      await createFamiliar(newFamiliarNode);
      await addFamiliarToNode(node, {
        id: tempId,
        type: relationType,
      });
      setIsLoading(false);
      const updatedUser = await getUserNode(user.id);
      dispatch(saveUser(updatedUser));
      navigation.dispatch(StackActions.pop(3));
    } catch (e) {
      console.log('Failed to add new Familiar', e);
    }
  };

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
