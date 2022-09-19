import auth from '@react-native-firebase/auth';
import {StackActions, useNavigation, useRoute} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
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

export const Profile = () => {
  const {params} = useRoute();
  const node = params?.node as PersonNode;
  const itsMe = params?.itsMe as boolean;

  const navigation = useNavigation();

  const handleSignOut = async () => {
    await auth().signOut();
    navigation.dispatch(StackActions.popToTop());
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
