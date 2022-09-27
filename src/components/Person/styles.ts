import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import {NODE_SIZE} from '../../constants';
import {motify} from 'moti';

interface ContainerProps {
  x: number;
  y: number;
  colors?: string[];
}

const MotiLinearGradient = motify(LinearGradient)();

export const Container = styled(MotiLinearGradient).attrs<ContainerProps>(
  () => ({
    colors: ['#BB93DC', '#DDD5E4', '#C0A5D5', '#8C59B5', '#8C59B5', '#8C59B5'],
    start: {x: 0.0, y: 0.0},
    end: {x: 1.0, y: 1.0},
    from: {opacity: 0},
    animate: {opacity: 1},
    transition: {
      type: 'timing',
      duration: 800,
    },
  }),
)<ContainerProps>`
  flex: 1;
  border-radius: ${NODE_SIZE / 2}px;
  height: ${NODE_SIZE}px;
  width: ${NODE_SIZE}px;
  position: absolute;
  z-index: 10;
  align-items: center;
  justify-content: center;
  transform: ${({x, y}) => `translate(${x}px, ${y}px)`};
`;

export const PressableContainer = styled.Pressable`
  height: ${NODE_SIZE * 0.9}px;
  width: ${NODE_SIZE * 0.9}px;
  border-radius: ${(NODE_SIZE * 0.9) / 2}px;
`;

export const Photo = styled.Image`
  height: ${NODE_SIZE * 0.9}px;
  width: ${NODE_SIZE * 0.9}px;
  border-radius: ${(NODE_SIZE * 0.9) / 2}px;
`;
