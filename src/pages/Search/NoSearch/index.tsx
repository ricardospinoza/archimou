import {Image} from 'react-native';
import {BaseButton} from '../../../components';
import {Button, Container, Description} from './styles';
import graph from '../../../assets/graph.png';
import {useNavigation} from '@react-navigation/native';

export const NoSearch = () => {
  const navigation = useNavigation();

  const goToAddFamiliar = () => {
    navigation.navigate('AddFamiliar');
  };

  return (
    <Container>
      <Image source={graph} />
      <Description>Procure seu familiar em nossa rede</Description>
      <Description>ou</Description>
      <Description>Adicione por conta própria e o convideo depois</Description>
      <Button label="Adicionar Familiar" onPress={goToAddFamiliar} />
    </Container>
  );
};
