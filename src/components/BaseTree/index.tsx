import {PersonNode} from '../../models/TreeViewModel';
import {Line} from '../../types';
import {Lines} from '../Lines';
import {Person} from '../Person';
import {Container} from './styles';

interface NodesProps {
  nodes: PersonNode[];
  lines: Line[];
  onLongNodePress: (node: PersonNode) => void;
  onNodePress: (node: PersonNode) => void;
}

export const BaseTree = ({
  nodes,
  lines,
  onLongNodePress,
  onNodePress,
}: NodesProps) => {
  return (
    <Container>
      {nodes.map(node => (
        <Person
          key={Math.random()}
          value={node}
          onLongPress={() => onLongNodePress(node)}
          onPress={() => onNodePress(node)}
        />
      ))}
      <Lines lines={lines} />
    </Container>
  );
};
