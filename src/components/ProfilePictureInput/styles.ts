import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

interface SizeProps {
  size: number;
}

export const Container = styled(LinearGradient).attrs(() => ({
  colors: ['#BB93DC', '#DDD5E4', '#C0A5D5', '#8C59B5', '#8C59B5', '#8C59B5'],
  start: {x: 0.0, y: 0.0},
  end: {x: 1.0, y: 1.0},
}))<SizeProps>`
  border-radius: ${({size}) => size / 2}px;
  height: ${({size}) => size}px;
  width: ${({size}) => size}px;
  align-items: center;
  justify-content: center;
`;

export const PressableContainer = styled.Pressable<SizeProps>`
  height: ${({size}) => size * 0.9}px;
  width: ${({size}) => size * 0.9}px;
  border-radius: ${({size}) => (size * 0.9) / 2}px;
`;

export const Photo = styled.Image<SizeProps>`
  height: ${({size}) => size * 0.9}px;
  width: ${({size}) => size * 0.9}px;
  border-radius: ${({size}) => (size * 0.9) / 2}px;
`;
