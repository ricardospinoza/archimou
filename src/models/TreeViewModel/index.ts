import {NODE_CENTER, NODE_SIZE} from '../../constants';
import {getUserTree} from '../../service';
import {Position} from '../../types';
import {DistributeService} from './DistributeService';

export type FamiliarTypes = 'Parent' | 'Sibling' | 'Children' | 'Partner';

export interface PersonNode {
  id: string;
  relationId: string;
  name: string;
  birthDate: string;
  photo: string;
  description?: string;
  relations: Relation[];
  position?: Position;
}

export interface Relation {
  id: string;
  relationId: string;
  type: FamiliarTypes;
}

export class TreeViewModel {
  #data: PersonNode[] = [];
  #nodeRef = {} as PersonNode;
  #distribute = new DistributeService();

  #addPositionsToFamiliars() {
    console.log(">>>>>>>> Parent")
    const parents = this.#getNodesByType('Parent');
    const parentsWithPosition = this.#distribute.parentsPositions(parents);

    console.log(">>>>>>>> Children")
    const children = this.#getNodesByType('Children');
    const childrenWithPosition = this.#distribute.childrensPositions(children);

    console.log(">>>>>>>> Sibling")
    const sibling = this.#getNodesByType('Sibling');
    const siblingWithPosition = this.#distribute.siblingsPositions(sibling);

    console.log(">>>>>>>> Partner")
    const partners = this.#getNodesByType('Partner');
    const partnersWithPosition = this.#distribute.partnersPositions(partners);

    return [
      ...parentsWithPosition,
      ...childrenWithPosition,
      ...siblingWithPosition,
      ...partnersWithPosition,
    ];
  }

  #getNodesByType(familiarType: FamiliarTypes) {
    const relations = this.#nodeRef.relations;
    return this.#data.filter(({id: idNode}) =>
      relations.some(({id, type}) => idNode === id && type === familiarType),
    );
  }

  async putFamiliarNodesByFocusedNode(node: PersonNode) {
    this.#data = await getUserTree(node.relations);
    this.#nodeRef = node;
    this.#distribute.nodeRef = node;

    const familiarsWithPositions = this.#addPositionsToFamiliars();

    return [...familiarsWithPositions];
  }
}
