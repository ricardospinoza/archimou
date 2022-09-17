import {
  Container,
  ButtonText,
  GoogleIcon,
  IconContainer,
  TextContainer,
} from './styles';

interface GoogleSignInButtonProps {
  onSignIn: () => void;
}

export const GoogleSignInButton = ({onSignIn}: GoogleSignInButtonProps) => {
  return (
    <Container onPress={onSignIn}>
      <IconContainer>
        <GoogleIcon />
      </IconContainer>
      <TextContainer>
        <ButtonText>Entrar com Google</ButtonText>
      </TextContainer>
    </Container>
  );
};
