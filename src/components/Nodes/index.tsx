import {View} from 'react-native';
import {PersonNode} from '../../models/TreeViewModel';
import {Person} from '../Person';

interface NodesProps {
  nodes: PersonNode[];
  onLongNodePress: (node: PersonNode) => void;
  onNodePress: (node: PersonNode) => void;
}

export const Nodes = ({nodes, onLongNodePress, onNodePress}: NodesProps) => {
  return (
    <View
      style={{
        position: 'absolute',
        height: '100%',
      }}>
      {nodes.map(node => {
        console.log('INSIDE MAP: ', {node});
        return (
          <Person
            key={node.id}
            value={node}
            onLongPress={() => onLongNodePress(node)}
            onPress={() => onNodePress(node)}
          />
        );
      })}
    </View>
  );
};
