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
  onLoading: (loading: boolean) => void;
}

export const GoogleSignInButton = ({onLoading}: GoogleSignInButtonProps) => {
  async function onGoogleButtonPress() {
    try {
      onLoading(true);
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      auth().signInWithCredential(googleCredential);
    } catch (e) {
      console.error(e);
    } finally {
      onLoading(false);
    }
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
