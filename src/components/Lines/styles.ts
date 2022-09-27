import {MotiView} from 'moti';
import styled from 'styled-components/native';
import {Position} from '../../types';

interface LineContainerProps {
  anchorPoint: Position;
  lineWidth: number;
  lineAngle: number;
}

export const LineContainer = styled.View.attrs<LineContainerProps>(
  ({anchorPoint, lineWidth, lineAngle}) => ({
    transform: [
      {translateY: anchorPoint.y - 1 / 2},
      {translateX: anchorPoint.x - lineWidth / 2},
      {rotateZ: `${lineAngle}rad`},
      {translateY: 1 / 2},
      {translateX: lineWidth / 2},
    ],
  }),
)<LineContainerProps>`
  position: absolute;
  height: 2px;
  width: ${({lineWidth}) => lineWidth}px;
  overflow: hidden;
`;

interface LineColorProps {
  lineWidth: number;
}

export const LineColor = styled(MotiView).attrs<LineColorProps>(
  ({lineWidth}) => ({
    from: {width: 0},
    animate: {width: lineWidth},
    transition: {
      type: 'timing',
      duration: 1200,
    },
  }),
)<LineColorProps>`
  flex: 1;
  height: 2px;
  background-color: #8c59b5;
`;
