import { useNavigation, useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { FullLoading, Input, ProfilePictureInput } from '../../components';
import { DATE_MASK } from '../../constants';
import { useUser } from '../../hooks';
import {
  createUserNode,
  deleteTempNode,
  getDynamicLinkData,
} from '../../service';
import { saveUser } from '../../store/slices';
import { Container, Continue, Footer, Form } from './styles';
import Toast from 'react-native-toast-message'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const Register = () => {
  const { params } = useRoute();
  const user = params?.user;

  const [name, setName] = useState(user.displayName);
  const [birthDate, setDate] = useState('');
  const [photo, setPhoto] = useState(
    user?.photoURL?.replaceAll('s96-c', 's192-c') ?? '',
  );

  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleSubmit = async () => {


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
      dispatch(saveUser(node));
      navigation.navigate('Home');
    } catch (e) {
      console.log('Error registring new user', e);
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
    </KeyboardAwareScrollView>
  );
};
