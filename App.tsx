import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { Router } from './src/routes';
import { store } from './src/store/store';


GoogleSignin.configure({
  webClientId:
    '972273575075-7r837ackasifn29f569kn9p1s0lksoht.apps.googleusercontent.com',
});
const App = () => {

  return (
    <>
      <Provider
        store={store}>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
      </Provider>
      <Toast />
    </>
  );
};

export default App;
