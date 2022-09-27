import {NODE_CENTER} from '../../constants';
import {Line} from '../../types';
import {LineColor, LineContainer} from './styles';

interface LinesProps {
  lines: Line[];
}

const {sqrt, pow, abs, atan2} = Math;

export const Lines = ({lines}: LinesProps) => {
  const calculateLineProps = (line: Line) => {
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

    return {
      anchorPoint,
      lineWidth,
      lineAngle,
    };
  };

  return (
    <>
      {lines.map(line => {
        const {anchorPoint, lineWidth, lineAngle} = calculateLineProps(line);
        return (
          <LineContainer
            key={line.id + line.from.x + line.to.x + line.from.y + line.to.y}
            anchorPoint={anchorPoint}
            lineAngle={lineAngle}
            lineWidth={lineWidth}>
            <LineColor lineWidth={lineWidth} />
          </LineContainer>
        );
      })}
    </>
  );
};
