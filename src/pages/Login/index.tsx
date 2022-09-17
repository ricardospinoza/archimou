import {Background, Container} from './styles';
import backgroundImage from '../../assets/background.png';
import {GoogleSignInButton} from './GoogleSignInButton';
import {useNavigation} from '@react-navigation/native';

export const Login = () => {
  const navigation = useNavigation();

  const handleSignIn = () => {
    navigation.navigate('Register');
  };

  return (
    <Background source={backgroundImage}>
      <Container>
        <GoogleSignInButton onSignIn={handleSignIn} />
      </Container>
    </Background>
  );
};
