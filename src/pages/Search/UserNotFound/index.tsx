import {useNavigation} from '@react-navigation/native';
import {Image} from 'react-native';
import {BaseButton} from '../../../components';
import {Button, Container, Description} from './styles';

export const UserNotFound = () => {
  const navigation = useNavigation();

  const goToAddFamiliar = () => {
    navigation.navigate('AddFamiliar');
  };

  return (
    <Container>
      <Description>Não encontramos seu familiar</Description>
      <Description>Vamos adicionalo mesmo assim?</Description>
      <Button label="Adicionar Familiar" onPress={goToAddFamiliar} />
    </Container>
  );
};
