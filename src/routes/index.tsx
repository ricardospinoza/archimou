import {AddFamiliar, Home, Profile} from '../pages';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />

      <Stack.Screen name="AddFamiliar" component={AddFamiliar} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};
