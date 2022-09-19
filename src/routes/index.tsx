import {
  AddFamiliar,
  Home,
  Profile,
  FamiliarRegister,
  Login,
  Register,
  Splash,
} from '../pages';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerTitle: '',
          headerTintColor: '#8c59b5',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="AddFamiliar"
        component={AddFamiliar}
        options={{
          headerTitle: 'Quem é essa pessoa?',
          headerTintColor: '#ffffff',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#8c59b5',
          },
        }}
      />
      <Stack.Screen
        name="FamiliarRegister"
        component={FamiliarRegister}
        options={{
          headerTitle: '',
          headerTintColor: '#8c59b5',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitle: '',
          headerTintColor: '#8c59b5',
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};
