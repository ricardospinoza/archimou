import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import backgroundImage from '../../assets/background.png';
import {Background} from './styles';
import {getUserNode} from '../../service';
import {acc} from 'react-native-reanimated';
import dynamicLinks from '@react-native-firebase/dynamic-links';
export const Splash = () => {
  const navigation = useNavigation();

  const handleDynamicLink = link => {
    console.log({link});
  };

  useEffect(() => {
    dynamicLinks().getInitialLink().then(handleDynamicLink);
  }, []);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(handleAuthStateChanged);
    return () => {
      subscriber();
    };
  }, []);

  const handleAuthStateChanged = async (
    firebaseUser: FirebaseAuthTypes.User | null,
  ) => {
    const {displayName, uid, photoURL} = firebaseUser ?? {
      displayName: '',
      uid: '',
      photoURL: '',
    };

    const user = {displayName, uid, photoURL};
    if (!firebaseUser) {
      navigation.navigate('Login');
    } else {
      const userNode = await getUserNode(user.uid);

      if (!userNode) {
        navigation.navigate('Register', {
          user,
        });
      } else {
        navigation.navigate('Home', {
          node: userNode,
        });
      }
    }
  };

  return <Background source={backgroundImage} />;
};
