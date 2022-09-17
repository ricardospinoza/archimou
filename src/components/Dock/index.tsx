import {Icon} from '../Icon';
import {Center, Container, TreeIcon} from './styles';

interface DockProps {
  onTreePress: () => void;
}

export const Dock = ({onTreePress}: DockProps) => {
  return (
    <Container>
      <Icon name="search" color="#ffffff" size={30} />
      <Center onPress={onTreePress}>
        <TreeIcon name="treeLogo" color="#ffffff" size={40} />
      </Center>
      <Icon name="chat" color="#ffffff" size={30} />
    </Container>
  );
};
