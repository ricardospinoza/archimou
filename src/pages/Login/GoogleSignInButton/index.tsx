import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {
  Container,
  ButtonText,
  GoogleIcon,
  IconContainer,
  TextContainer,
} from './styles';
import auth from '@react-native-firebase/auth';
interface GoogleSignInButtonProps {
  // onSignIn: () => void;
}

export const GoogleSignInButton = ({}: GoogleSignInButtonProps) => {
  async function onGoogleButtonPress() {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    auth().signInWithCredential(googleCredential);
  }

  return (
    <Container onPress={onGoogleButtonPress}>
      <IconContainer>
        <GoogleIcon />
      </IconContainer>
      <TextContainer>
        <ButtonText>Entrar com Google</ButtonText>
      </TextContainer>
    </Container>
  );
};
