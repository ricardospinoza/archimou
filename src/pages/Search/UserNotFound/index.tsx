import { useNavigation } from '@react-navigation/native';
import { Button, Container, Description } from './styles';

export const UserNotFound = ({node}) => {
  const navigation = useNavigation();

  const goToAddFamiliar = () => navigation.navigate('AddFamiliar', {node});

  return (
    <Container>
      <Description>Não encontramos seu familiar</Description>
      <Description>Vamos adicionalo mesmo assim?</Description>
      <Button label="Adicionar Familiar" onPress={goToAddFamiliar} />
    </Container>
  );
};
