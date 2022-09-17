import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import {NODE_SIZE} from '../../constants';

interface ContainerProps {
  x: number;
  y: number;
  colors?: string[];
}

export const Container = styled(LinearGradient).attrs<ContainerProps>(() => ({
  colors: ['#BB93DC', '#DDD5E4', '#C0A5D5', '#8C59B5', '#8C59B5', '#8C59B5'],
  start: {x: 0.0, y: 0.0},
  end: {x: 1.0, y: 1.0},
}))<ContainerProps>`
  flex: 1;
  border-radius: ${NODE_SIZE / 2}px;
  height: ${NODE_SIZE}px;
  width: ${NODE_SIZE}px;
  position: absolute;
  z-index: 10;
  align-items: center;
  justify-content: center;
  transform: ${({x, y}) => `translate(${x}px, ${y}px)`};
  z-index: 20;
`;

export const Base = styled.TouchableOpacity`
  height: ${NODE_SIZE * 0.9}px;
  width: ${NODE_SIZE * 0.9}px;
  border-radius: ${(NODE_SIZE * 0.9) / 2}px;
  z-index: 50;
  align-items: center;
  justify-content: center;
`;
