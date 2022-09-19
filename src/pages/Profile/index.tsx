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
import {useClipboard} from '@react-native-community/clipboard';
import {Alert} from 'react-native';

export const Profile = () => {
  const {params} = useRoute();
  const node = params?.node as PersonNode;
  const itsMe = params?.itsMe as boolean;

  const navigation = useNavigation();

  const [link, setLink] = useClipboard();

  const handleSignOut = async () => {
    await auth().signOut();
    navigation.dispatch(StackActions.popToTop());
  };

  const buildLink = async () => {
    const link = await dynamicLinks().buildLink({
      link: 'https://archimou.com',
      domainUriPrefix: 'https://archimou.page.link',
    });
    setLink(link);
    Alert.alert('Link do convite enviado para area de transferencia');
  };

  return (
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
