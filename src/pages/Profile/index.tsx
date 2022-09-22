import auth from '@react-native-firebase/auth';
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

export const Profile = () => {
  const {params} = useRoute();
  const node = params?.node as PersonNode;
  const itsMe = params?.itsMe as boolean;

  const navigation = useNavigation();

  const handleSignOut = async () => {
    await auth().signOut();
    navigation.dispatch(StackActions.popToTop());
  };

  const buildLink = async () => {
    const link = await dynamicLinks().buildLink({
      link: `https://archimou.com?tempId=${node.id}`,
      domainUriPrefix: 'https://archimou.page.link/',
      android: {
        packageName: 'com.archimou',
      },
    });
    Clipboard.setString(link);
    console.log({link});
    Alert.alert('Link do convite enviado para area de transferencia', link);
  };

  //archimou.page.link/join?link=https%3A%2F%2Farchimou.com%3Fid%3Dquejo

  https: return (
    <ScrollView>
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
            <Remove label="Deslogar" onPress={handleSignOut} />
          ) : (
            <Remove label="Remover da árvore" onPress={() => {}} />
          )}
        </Footer>
      </Container>
    </ScrollView>
  );
};
