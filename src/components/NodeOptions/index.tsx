import {NODE_SIZE} from '../../constants';
import {PersonNode} from '../../models/TreeViewModel';
import {Icon} from '../Icon';
import {Container, PressableContainer} from './styles';
interface NodeOptionsProps {
  nodePressed: PersonNode | null;
}

export const NodeOptions = ({nodePressed}: NodeOptionsProps) => {
  return !!nodePressed ? (
    <>
      <Container
        colors={[]}
        x={nodePressed.position!.x}
        y={nodePressed.position!.y - NODE_SIZE * 1.2}>
        {!!nodePressed && (
          <PressableContainer>
            <Icon name="user" size={NODE_SIZE * 0.8} color="black" />
          </PressableContainer>
        )}
      </Container>
      <Container
        colors={[]}
        x={nodePressed.position!.x}
        y={nodePressed.position!.y + NODE_SIZE * 1.2}>
        {!!nodePressed && (
          <PressableContainer>
            <Icon name="add" size={NODE_SIZE * 0.8} color="black" />
          </PressableContainer>
        )}
      </Container>
    </>
  ) : null;
};
