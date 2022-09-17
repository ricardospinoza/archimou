import {PersonNode} from '../../models/TreeViewModel';
import {Person} from '../Person';
import {Container} from './styles';

interface NodesProps {
  nodes: PersonNode[];
  onLongNodePress: (node: PersonNode) => void;
  onNodePress: (node: PersonNode) => void;
}

export const Nodes = ({nodes, onLongNodePress, onNodePress}: NodesProps) => {
  return (
    <Container>
      {nodes.map(node => (
        <Person
          key={node.id}
          value={node}
          onLongPress={() => onLongNodePress(node)}
          onPress={() => onNodePress(node)}
        />
      ))}
    </Container>
  );
};
