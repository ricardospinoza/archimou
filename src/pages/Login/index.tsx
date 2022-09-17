import {Background, Container} from './styles';
import backgroundImage from '../../assets/background.png';
import {GoogleSignInButton} from './GoogleSignInButton';

export const Login = () => {
  return (
    <Background source={backgroundImage}>
      <Container>
        <GoogleSignInButton />
      </Container>
    </Background>
  );
};
