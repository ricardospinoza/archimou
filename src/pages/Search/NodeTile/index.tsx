import {Text} from 'react-native';
import {PersonNode} from '../../../models/TreeViewModel';
import {addFamiliarToNode, createInvitation} from '../../../service';
import Toast from 'react-native-toast-message'
import {
  Container,
  Name,
  Photo,
  Parents,
  ConnectButton,
  InfoSection,
} from './styles';
import {useNavigation} from '@react-navigation/native';
import { PAGE_NAMES } from '../../../constants';
import { useParentType } from '../../../hooks/ParentType';

interface NodeTileProps {
  id: string;
  user: PersonNode;
  name: string;
  parents: string[];
}

export const NodeTile = ({id, user, name, parents}: NodeTileProps) => {
  const navigation = useNavigation();

  const invite = async () => {

    /*
    await createInvitation(id, user.id);
    await addFamiliarToNode(user, {
      id,
      type: 'Parent', // FIXME: ask for relation
    });
    */

    await goToAddFamiliar();
    
    Toast.show({
      type: 'info',
      text1: `Convite enviado para o usuário ${name}`
    })
  };

  const goToAddFamiliar = async () => {
   

    const result = await new Promise((resolve) => {
      navigation.navigate(PAGE_NAMES.ADD_FAMILIAR, {
        node: user,
        response: true,
      });

      navigation.addListener('focus', () => {
        // Listen for the screen focus to receive the response
        const parentType = useParentType();
        if (!!parentType) {
          resolve(parentType);
        }
      });
    });

    const parentType = useParentType();

    console.log(result);
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
