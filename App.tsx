import { NavigationContainer } from '@react-navigation/native';
import { Router } from './src/routes';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import Toast from 'react-native-toast-message';

GoogleSignin.configure({
  webClientId:
    '92146690602-e5u9c32trvitgb6ntvg0v39h54es14tb.apps.googleusercontent.com',
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
