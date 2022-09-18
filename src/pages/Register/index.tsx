import {useNavigation, useRoute} from '@react-navigation/native';
import {useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {Input, ProfilePictureInput} from '../../components';
import {DATE_MASK} from '../../constants';
import {createUserNode} from '../../service';
import {Container, Continue, Footer, Form} from './styles';
export const Register = () => {
  const {
    params: {user},
  } = useRoute();

  const [name, setName] = useState(user.displayName);
  const [birthDate, setDate] = useState('');
  const [photo, setPhoto] = useState(
    user?.photoURL?.replaceAll('s96-c', 's192-c') ?? '',
  );

  const navigation = useNavigation();

  const handleSubmit = async () => {
    const node = {
      id: user.uid,
      name,
      birthDate,
      photo,
      relations: [],
    };

    await createUserNode(node);

    navigation.navigate('Home', {
      node,
    });
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
              onChangeText={setDate}
              iconName="calendar"
              placeholder="Data de Nascimento *"
              keyboardType="numbers-and-punctuation"
              mask={DATE_MASK}
            />
          </Form>
        </Container>
      </ScrollView>
      <Footer>
        <Continue label="Continuar" onPress={handleSubmit} />
      </Footer>
    </>
  );
};
