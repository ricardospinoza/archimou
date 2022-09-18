import {StyleSheet, View} from 'react-native';
import Svg, {Line as SvgLine} from 'react-native-svg';
import {NODE_CENTER, SIZE} from '../../constants';
import {Line} from '../../types';

interface LinesProps {
  lines: Line[];
}

const {sqrt, pow, abs, atan2} = Math;

export const Lines = ({lines}: LinesProps) => {
  return (
    <>
      {lines.map(line => {
        const anchorPoint = {
          x: line.from.x + NODE_CENTER.x,
          y: line.from.y + NODE_CENTER.y,
        };
        const subX = line.from.x - line.to.x;
        const subY = line.from.y - line.to.y;
        const sumSquareX = pow(abs(subX), 2);
        const sumSquareY = pow(abs(subY), 2);
        const lineWidth = sqrt(sumSquareX + sumSquareY);
        const lineAngle = Math.PI + atan2(subY, subX);
        return (
          <View
            key={Math.random()}
            style={{
              position: 'absolute',
              height: 2,
              width: lineWidth,
              backgroundColor: '#8C59B5',
              transform: [
                {translateY: anchorPoint.y - 1 / 2},
                {translateX: anchorPoint.x - lineWidth / 2},
                {rotateZ: `${lineAngle}rad`},
                {translateY: 1 / 2},
                {translateX: lineWidth / 2},
              ],
            }}
          />
        );
      })}
    </>
  );
};
