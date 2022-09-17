import {NavigationContainer} from '@react-navigation/native';
import {Router} from './src/routes';

const App = () => {
  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  );
};

export default App;
