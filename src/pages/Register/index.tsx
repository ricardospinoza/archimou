import {useNavigation, useRoute} from '@react-navigation/native';
import {useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {FullLoading, Input, ProfilePictureInput} from '../../components';
import {DATE_MASK} from '../../constants';
import {useUser} from '../../hooks';
import {
  createUserNode,
  deleteTempNode,
  getDynamicLinkData,
} from '../../service';
import {Container, Continue, Footer, Form} from './styles';
export const Register = () => {
  const user = useUser();

  const [name, setName] = useState(user.displayName);
  const [birthDate, setDate] = useState('');
  const [photo, setPhoto] = useState(
    user?.photoURL?.replaceAll('s96-c', 's192-c') ?? '',
  );

  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const handleSubmit = async () => {
    const node = {
      id: user.uid,
      name,
      birthDate,
      photo,
      relations: [],
    };
    try {
      setIsLoading(true);
      const data = await getDynamicLinkData();
      if (!!data?.tempId) {
        await deleteTempNode(data.tempId);
      }
      await createUserNode(node);
      setIsLoading(false);
      navigation.navigate('Home', {
        node,
      });
    } catch (e) {
      console.log('Error registring new user', e);
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
      <FullLoading show={isLoading} />
    </>
  );
};
