import {GestureResponderEvent, Pressable, Text} from 'react-native';
import {NODE_SIZE} from '../../constants';
import {PersonNode} from '../../models/TreeViewModel';

interface PersonProps {
  value: PersonNode;
  onLongPress: ((event: GestureResponderEvent) => void) | null | undefined;
}

export const Person = ({value, onLongPress}: PersonProps) => {
  return (
    <Pressable
      key={value.id}
      style={{
        position: 'absolute',
        transform: [
          {translateX: value.position!.x},
          {translateY: value.position!.y},
        ],
        height: NODE_SIZE,
        width: NODE_SIZE,
        backgroundColor: 'red',
        zIndex: 10,
      }}
      onPress={() => {
        console.log('touch');
      }}
      onLongPress={onLongPress}>
      <Text>{value.name}</Text>
    </Pressable>
  );
};
