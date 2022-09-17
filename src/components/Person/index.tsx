import {GestureResponderEvent, Image, Pressable, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {NODE_SIZE} from '../../constants';
import {PersonNode} from '../../models/TreeViewModel';
import {Container, Photo, PressableContainer} from './styles';
import defaultAvatar from '../../assets/default-avatar.png';

interface PersonProps {
  value: PersonNode;
  onLongPress: ((event: GestureResponderEvent) => void) | null | undefined;
  onPress: ((event: GestureResponderEvent) => void) | null | undefined;
}

export const Person = ({value, onLongPress, onPress}: PersonProps) => {
  const imageSource = value?.photo
    ? {
        uri: value?.photo,
      }
    : defaultAvatar;

  return (
    <Container colors={[]} x={value.position!.x} y={value.position!.y}>
      <PressableContainer onPress={onPress} onLongPress={onLongPress}>
        <Photo source={imageSource} />
      </PressableContainer>
    </Container>
  );
};
