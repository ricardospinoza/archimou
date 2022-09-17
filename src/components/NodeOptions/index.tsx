import {Pressable, View, Text} from 'react-native';
import {NODE_SIZE} from '../../constants';
import {PersonNode} from '../../models/TreeViewModel';

interface NodeOptionsProps {
  nodePressed: PersonNode | null;
}

export const NodeOptions = ({nodePressed}: NodeOptionsProps) => {
  return (
    <View
      style={{
        position: 'absolute',
        height: '100%',
        zIndex: 20,
      }}>
      {!!nodePressed && (
        <Pressable
          style={{
            transform: [
              {translateX: nodePressed.position!.x},
              {translateY: nodePressed.position!.y},
            ],
            height: NODE_SIZE,
            width: NODE_SIZE,
            backgroundColor: 'blue',
            zIndex: 20,
          }}>
          <Text>Options</Text>
        </Pressable>
      )}
    </View>
  );
};
