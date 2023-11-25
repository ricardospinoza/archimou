import { Modal } from 'react-native';
import { Invitation, PersonNode } from '../../models/TreeViewModel';
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
  userInvitation: Invitation;
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
            {userInvitation.name} quer entrar na sua rede como {userInvitation.type}.
          </InviteText>
          <InviteText>
            Deseja aceitar o convite?
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
