import {PersonNode} from '../index';
import {NODE_CENTER, NODE_SIZE} from '../../../constants';

export class DistributeService {
  #nodeRef = {} as PersonNode;

  set nodeRef(node: PersonNode) {
    this.#nodeRef = node;
  }

  childrensPositions(children: PersonNode[]) {
    const refPosition = this.#nodeRef.position!;

    const diameter = NODE_SIZE * (children.length + 1);
    const radius = diameter / 2;

    const circleRefCenter = {
      x: refPosition.x + NODE_CENTER.x,
      y: refPosition.y + NODE_SIZE / 2,
    };

    const angleForEach = Math.PI / (children.length + 1);

    const parentsWithPositions = children.map((child, i) => {
      const angle = angleForEach * (i + 1) + Math.PI;
      const x = circleRefCenter.x - radius * Math.cos(angle);
      const y = circleRefCenter.y - radius * Math.sin(angle);
      child.position = {
        x: x - NODE_CENTER.x,
        y: y + NODE_CENTER.y,
      };
      return child;
    });

    return parentsWithPositions;
  }
  parentsPositions(parents: PersonNode[]) {
    const refPosition = this.#nodeRef.position!;

    const diameter = NODE_SIZE * (parents.length + 1);
    const radius = diameter / 2;

    const circleRefCenter = {
      x: refPosition.x + NODE_CENTER.x,
      y: refPosition.y + NODE_CENTER.y - radius,
    };

    const angleForEach = Math.PI / (parents.length + 1);

    const parentsWithPositions = parents.map((parent, i) => {
      const angle = angleForEach * (i + 1);
      const x = circleRefCenter.x - radius * Math.cos(angle);
      const y = circleRefCenter.y - radius * Math.sin(angle);
      parent.position = {
        x: x - NODE_CENTER.x,
        y: y - NODE_CENTER.y,
      };
      return parent;
    });

    return parentsWithPositions;
  }

  siblingsPositions(siblings: PersonNode[]) {
    const refPosition = this.#nodeRef.position!;

    const siblingWithPositions = siblings.map((sibling, i) => {
      const x = refPosition.x - NODE_SIZE * (i + 1) * 1.5;
      const y = refPosition.y;
      sibling.position = {
        x,
        y,
      };
      return sibling;
    });

    return siblingWithPositions;
  }
}
