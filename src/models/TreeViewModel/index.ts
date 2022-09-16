import {HALF_SIZE, NODE_CENTER, NODE_SIZE} from '../../constants';
import {getUserTree} from '../../service';
import {Position} from '../../types';

type FamiliarTypes = 'Parent' | 'Sibling' | 'Children' | 'Partner';

export interface PersonNode {
  id: string;
  name: string;
  position?: Position;
  relations: {id: string; type: FamiliarTypes}[];
}

export class TreeViewModel {
  #data: PersonNode[] = [];
  #nodeRef = {} as PersonNode;

  #addPositionsToFamiliars() {
    const parents = this.#getNodesByType('Parent');
    const parentsWithPosition = this.#setParentsPositions(parents);

    const children = this.#getNodesByType('Children');
    const childrenWithPosition = this.#setParentsPositions(children);

    return [...parentsWithPosition, ...childrenWithPosition];
  }

  #getNodesByType(familiarType: FamiliarTypes) {
    const relations = this.#nodeRef.relations;
    return this.#data.filter(({id: idNode}) =>
      relations.some(({id, type}) => idNode === id && type === familiarType),
    );
  }

  #setParentsPositions(parents: PersonNode[]) {
    const refPosition = this.#nodeRef.position!;

    const diameter = NODE_SIZE * (parents.length + 2);
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
        y: y - NODE_CENTER.y - NODE_SIZE * i,
      };
      return parent;
    });

    return parentsWithPositions;
  }

  async putFamiliarNodesByFocusedNode(node: PersonNode) {
    this.#data = await getUserTree(node.id);
    this.#nodeRef = node;

    const familiarsWithPositions = this.#addPositionsToFamiliars();

    return [...familiarsWithPositions];
  }
}
