import {Modal} from 'react-native';
import {PersonNode} from '../../models/TreeViewModel';
import {
  Button,
  Card,
  Container,
  InviteActions,
  InviteText,
  ProfilePhoto,
} from './styles';

interface InvitationModalProps {
  show: boolean;
  userInvitation: PersonNode;
  onConfirm: () => void;
  onDenied: () => void;
}

export const InvitationModal = ({
  show,
  onConfirm,
  onDenied,
  userInvitation,
}: InvitationModalProps) => {
  return (
    <Modal visible={show} transparent={true} animationType="fade">
      <Container>
        <Card>
          <ProfilePhoto photoUrl={userInvitation.photo} />

          <InviteText>
            {userInvitation.name} quer entrar na sua rede. Você é relation de
            fulano?
          </InviteText>
          <InviteActions>
            <Button label="Sim" onPress={() => onConfirm()} />
            <Button label="Não" onPress={onDenied} />
          </InviteActions>
        </Card>
      </Container>
    </Modal>
  );
};
