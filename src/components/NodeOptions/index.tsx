import {Pressable, View, Text} from 'react-native';
import {NODE_SIZE} from '../../constants';
import {PersonNode} from '../../models/TreeViewModel';
import {Container, PressableContainer} from './styles';

interface NodeOptionsProps {
  nodePressed: PersonNode;
}

export const NodeOptions = ({nodePressed}: NodeOptionsProps) => {
  return (
    !!nodePressed && (
      <>
        <Container
          colors={[]}
          x={nodePressed.position!.x}
          y={nodePressed.position!.y - NODE_SIZE * 1.2}>
          {!!nodePressed && <PressableContainer></PressableContainer>}
        </Container>
        <Container
          colors={[]}
          x={nodePressed.position!.x}
          y={nodePressed.position!.y + NODE_SIZE * 1.2}>
          {!!nodePressed && <PressableContainer></PressableContainer>}
        </Container>
      </>
    )
  );
};
