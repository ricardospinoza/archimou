import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { PAGE_NAMES } from '../../../constants';
import { useParentType } from '../../../hooks/ParentType';
import { PersonNode } from '../../../models/TreeViewModel';
import { addInviteToNode, createInvitation } from '../../../service';
import { deleteParentType } from '../../../store/slices';
import {
  ConnectButton,
  Container,
  InfoSection,
  Name,
  Parents,
  Photo
} from './styles';

interface NodeTileProps {
  id: string;
  user: PersonNode;
  name: string;
  parents: string[];
}

export const NodeTile = ({id, user, name, parents}: NodeTileProps) => {
  const navigation = useNavigation();
  const parentType = useParentType();
  const dispatch = useDispatch();

  useEffect(() => {
    const addParent = async () => {
      if (!!parentType) {
  
        await createInvitation(id, user.id); // TODO: analisar lógica, para identificar a necessidade dessa collection
        await addInviteToNode(user, {
          id,
          type: parentType,
        });
  
        Toast.show({
          type: 'success',
          text1: `Convite enviado para o usuário ${name}`
        });
        dispatch(deleteParentType());
      }
    };

    addParent().catch((e) => {
      Toast.show({
        type: 'error',
        text1: `Não foi possível enviar o convite para o usuário ${name}`
      });
      console.error(e);
    });
  });

  const invite = async () => {
    await goToAddFamiliar();
  };

  const goToAddFamiliar = async () => {
    await new Promise((resolve) => {

      navigation.navigate(PAGE_NAMES.ADD_FAMILIAR, {
        node: user,
        response: true,
      });

      navigation.addListener('focus', () => resolve(true));
    });
  };

  const removeInvite = () => {
    Toast.show({
      type: 'info',
      text1: `Funcionalidade não implementada!!!`
    });
  }

  // TODO: Tratar erro no mapeamento do map na lista de invite. Necessário verificar o motivo do erro
  const hasInvite = () => {
    try {
      return !!user.invites ? user.invites.map(u => u.id).includes(id) : false;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  return (
    <Container>
      <Photo photoUrl="" />
      <InfoSection>
        <Name>{name}</Name>
        {!!parents.length && <Parents>Filho do {parents.join(' e ')}</Parents>}
        { 
          hasInvite()
          ? <ConnectButton label="Remover convite" onPress={removeInvite} />
          : <ConnectButton label="Adicionar Familiar" onPress={invite} />
        }
        
      </InfoSection>
    </Container>
  );
};
