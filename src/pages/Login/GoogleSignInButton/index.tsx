import {
  Container,
  ButtonText,
  GoogleIcon,
  IconContainer,
  TextContainer,
} from './styles';

export const GoogleSignInButton = () => {
  return (
    <Container>
      <IconContainer>
        <GoogleIcon />
      </IconContainer>
      <TextContainer>
        <ButtonText>Entrar com Google</ButtonText>
      </TextContainer>
    </Container>
  );
};
