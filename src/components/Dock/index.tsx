import {Icon} from '../Icon';
import {Center, Container, TreeIcon} from './styles';

export const Dock = () => {
  return (
    <Container>
      <Icon name="search" color="#ffffff" size={30} />
      <Center>
        <TreeIcon name="treeLogo" color="#ffffff" size={40} />
      </Center>
      <Icon name="chat" color="#ffffff" size={30} />
    </Container>
  );
};
