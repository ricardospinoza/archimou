import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {StackActions, useNavigation, useRoute} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {BaseButton} from '../../components';
import {PersonNode} from '../../models/TreeViewModel';
import {
  Container,
  Date,
  Description,
  Header,
  Info,
  Name,
  ProfilePicture,
  Remove,
  Footer,
  Content,
} from './styles';
import Clipboard from '@react-native-community/clipboard';
import {Alert} from 'react-native';
import {useUser} from '../../hooks';
import {getUserNode, removeNodeRelation} from '../../service';
import {useDispatch} from 'react-redux';
import {saveUser} from '../../store/slices';

export const Profile = () => {
  const {params} = useRoute();

  const dispatch = useDispatch();

  const node = params?.node as PersonNode;
  const user = useUser();
  const itsMe = node.id === user.id;

  const navigation = useNavigation();

  const handleSignOut = async () => {
    await auth().signOut();
    await GoogleSignin.signOut();
    navigation.dispatch(StackActions.popToTop());
  };

  const buildLink = async () => {
    const link = await dynamicLinks().buildLink({
      link: `https://archimou.com?tempId=${node.id}&userInviteId=${user.id}`,
      domainUriPrefix: 'https://archimou.page.link/',
      android: {
        packageName: 'com.archimou',
      },
    });
    Clipboard.setString(link);
    Alert.alert('Link do convite enviado para area de transferencia', link);
  };

  const removeRelation = async () => {
    try {
      await removeNodeRelation(user, node);
      const updatedUser = await getUserNode(user.id);
      dispatch(saveUser(updatedUser));
    } catch (e) {
      console.error('Error removing relation', e);
    } finally {
      navigation.dispatch(StackActions.pop());
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Container>
        <Header>
          <ProfilePicture photoUrl={node.photo} />
          <Info>
            <Name>{node.name}</Name>
            <Date>{node.birthDate}</Date>
          </Info>
        </Header>

        <Content>
          <BaseButton label="Convidar para a rede" onPress={buildLink} />
          {!!node.description && <Description>{node.description}</Description>}
        </Content>
        <Footer>
          {itsMe ? (
            <Remove label="Sair" onPress={handleSignOut} />
          ) : (
            <Remove label="Remover da árvore" onPress={removeRelation} />
          )}
        </Footer>
      </Container>
    </ScrollView>
  );
};
