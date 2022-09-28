import {Background, Container} from './styles';
import backgroundImage from '../../assets/background.png';
import {GoogleSignInButton} from './GoogleSignInButton';
import {useNavigation} from '@react-navigation/native';
import {FullLoading} from '../../components';
import {useState} from 'react';

export const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Background source={backgroundImage}>
      <Container>
        <GoogleSignInButton onLoading={setIsLoading} />
      </Container>
      <FullLoading show={isLoading} />
    </Background>
  );
};
