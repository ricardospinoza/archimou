import {useNavigation, useRoute} from '@react-navigation/native';
import {useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {Input, ProfilePictureInput} from '../../components';
import {DATE_MASK} from '../../constants';
import {Container, Continue, Footer, Form} from './styles';
import {StackActions} from '@react-navigation/native';
export const Register = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');

  const navigation = useNavigation();

  const handleSubmit = () => {
    console.log({
      name,
      date,
    });

    navigation.navigate('Home');
  };

  return (
    <>
      <ScrollView>
        <Container>
          <ProfilePictureInput />
          <Form>
            <Input
              value={name}
              onChangeText={setName}
              iconName="person"
              placeholder="Nome *"
            />
            <Input
              value={date}
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
