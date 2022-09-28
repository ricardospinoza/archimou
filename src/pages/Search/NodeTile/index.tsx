import {Text} from 'react-native';
import {
  Container,
  Name,
  Photo,
  Parents,
  ConnectButton,
  InfoSection,
} from './styles';

interface NodeTileProps {
  name: string;
  parents: string[];
}

export const NodeTile = ({name, parents}: NodeTileProps) => {
  return (
    <Container>
      <Photo photoUrl="" />
      <InfoSection>
        <Name>{name}</Name>
        {!!parents.length && <Parents>Filho do {parents.join(' e ')}</Parents>}
        <ConnectButton label="Adicionar Familiar" onPress={() => {}} />
      </InfoSection>
    </Container>
  );
};
