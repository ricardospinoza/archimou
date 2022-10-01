import {useNavigation, useRoute} from '@react-navigation/native';
import {useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {FullLoading, Input, ProfilePictureInput} from '../../components';
import {DATE_MASK} from '../../constants';
import {Container, Continue, Footer, Form} from './styles';
import {StackActions} from '@react-navigation/native';
import {PersonNode} from '../../models/TreeViewModel';
import {addFamiliarToNode, createFamiliar, getUserNode} from '../../service';
import {saveUser} from '../../store/slices';
import {useDispatch} from 'react-redux';
import {useUser} from '../../hooks';
export const FamiliarRegister = () => {
  const {
    params: {node, relationType},
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
      <FullLoading show={isLoading} />
    </>
  );
};
