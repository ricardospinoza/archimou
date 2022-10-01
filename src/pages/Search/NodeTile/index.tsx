import {Text} from 'react-native';
import {PersonNode} from '../../../models/TreeViewModel';
import {addFamiliarToNode, createInvitation} from '../../../service';
import {
  Container,
  Name,
  Photo,
  Parents,
  ConnectButton,
  InfoSection,
} from './styles';

interface NodeTileProps {
  id: string;
  user: PersonNode;
  name: string;
  parents: string[];
}

export const NodeTile = ({id, user, name, parents}: NodeTileProps) => {
  const invite = async () => {
    await createInvitation(id, user.id);
    await addFamiliarToNode(user, {
      id,
      type: 'Parent', // FIXME: ask for relation
    });
  };

  return (
    <Container>
      <Photo photoUrl="" />
      <InfoSection>
        <Name>{name}</Name>
        {!!parents.length && <Parents>Filho do {parents.join(' e ')}</Parents>}
        <ConnectButton label="Adicionar Familiar" onPress={invite} />
      </InfoSection>
    </Container>
  );
};
