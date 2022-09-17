import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import {NODE_SIZE} from '../../constants';

const size = 300;

export const Container = styled(LinearGradient).attrs(() => ({
  colors: ['#BB93DC', '#DDD5E4', '#C0A5D5', '#8C59B5', '#8C59B5', '#8C59B5'],
  start: {x: 0.0, y: 0.0},
  end: {x: 1.0, y: 1.0},
}))`
  border-radius: ${size / 2}px;
  height: ${size}px;
  width: ${size}px;
  align-items: center;
  justify-content: center;
`;

export const PressableContainer = styled.Pressable`
  height: ${size * 0.9}px;
  width: ${size * 0.9}px;
  border-radius: ${(size * 0.9) / 2}px;
`;

export const Photo = styled.Image`
  height: ${size * 0.9}px;
  width: ${size * 0.9}px;
  border-radius: ${(size * 0.9) / 2}px;
`;
