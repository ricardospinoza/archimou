import {NODE_CENTER, NODE_SIZE} from '../../constants';
import {getUserTree} from '../../service';
import {Position} from '../../types';
import {DistributeService} from './DistributeService';

export type FamiliarTypes = 'Parent' | 'Sibling' | 'Children' | 'Partner';

export interface PersonNode {
  id: string;
  name: string;
  birthDate: string;
  photo: string;
  description?: string;
  relations: Relation[];
  invites?: Invite[];
  position?: Position;
}

export interface Relation {
  id: string;
  type: FamiliarTypes;
}

export interface Invite extends Relation {}

export class TreeViewModel {
  #data: PersonNode[] = [];
  #nodeRef = {} as PersonNode;
  #distribute = new DistributeService();

  #addPositionsToFamiliars() {
    const parents = this.#getNodesByType('Parent');
    const parentsWithPosition = this.#distribute.parentsPositions(parents);

    const children = this.#getNodesByType('Children');
    const childrenWithPosition = this.#distribute.childrensPositions(children);

    const sibling = this.#getNodesByType('Sibling');
    const siblingWithPosition = this.#distribute.siblingsPositions(sibling);

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
