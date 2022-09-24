import {useNavigation, useRoute} from '@react-navigation/native';
import {useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {Input, ProfilePictureInput} from '../../components';
import {DATE_MASK} from '../../constants';
import {Container, Continue, Footer, Form} from './styles';
import {StackActions} from '@react-navigation/native';
import {PersonNode} from '../../models/TreeViewModel';
import {addFamiliarToNode, createFamiliar} from '../../service';
export const FamiliarRegister = () => {
  const {
    params: {node, relationType},
  } = useRoute();

  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [photo, setPhoto] = useState('');

  const navigation = useNavigation();

  const handleSubmitNewFamiliar = async () => {
    const tempId = `${node.id}_${relationType}_${name.trim()}`;

    const newFamiliarNode = {
      id: tempId,
      name,
      birthDate,
      photo,
      relations: [],
    } as PersonNode;

    await createFamiliar(newFamiliarNode);
    await addFamiliarToNode(node, {
      id: tempId,
      type: relationType,
    });

    navigation.dispatch(StackActions.pop(2));
  };

  return (
    <>
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
    </>
  );
};
