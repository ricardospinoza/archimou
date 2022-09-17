import {NODE_CENTER, NODE_SIZE} from '../../constants';
import {getUserTree} from '../../service';
import {Position} from '../../types';
import {DistributeService} from './DistributeService';

type FamiliarTypes = 'Parent' | 'Sibling' | 'Children' | 'Partner';

export interface PersonNode {
  id: string;
  name: string;
  photo: string;
  relations: {id: string; type: FamiliarTypes}[];
  position?: Position;
}

export class TreeViewModel {
  #data: PersonNode[] = [];
  #nodeRef = {} as PersonNode;
  #distribute = new DistributeService();

  #addPositionsToFamiliars() {
    const parents = this.#getNodesByType('Parent');
    const parentsWithPosition = this.#distribute.parentsPositions(parents);

    const children = this.#getNodesByType('Children');
    const childrenWithPosition = this.#distribute.childrensPositions(children);

    return [...parentsWithPosition, ...childrenWithPosition];
  }

  #getNodesByType(familiarType: FamiliarTypes) {
    const relations = this.#nodeRef.relations;
    return this.#data.filter(({id: idNode}) =>
      relations.some(({id, type}) => idNode === id && type === familiarType),
    );
  }

  async putFamiliarNodesByFocusedNode(node: PersonNode) {
    this.#data = await getUserTree(node.id);
    this.#nodeRef = node;
    this.#distribute.nodeRef = node;

    const familiarsWithPositions = this.#addPositionsToFamiliars();

    return [...familiarsWithPositions];
  }
}
