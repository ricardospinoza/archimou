import {useRoute} from '@react-navigation/native';
import {useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {Input, ProfilePictureInput} from '../../components';
import {Container, Continue, Form} from './styles';

export const FamiliarRegister = () => {
  const {
    params: {node, relationType},
  } = useRoute();

  const [name, setName] = useState('');

  return (
    <Container>
      <ProfilePictureInput />
      <Form>
        <Input value={name} onChange={setName} />
        {/* <DateInput /> */}
      </Form>

      <Continue label="Continuar" onPress={() => {}} />
    </Container>
  );
};
