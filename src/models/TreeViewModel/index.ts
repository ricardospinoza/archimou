import {NODE_CENTER, NODE_SIZE} from '../../constants';
import {getUserTree} from '../../service';
import {Position} from '../../types';
import {DistributeService} from './DistributeService';

export type FamiliarTypes = 'Parent' | 'Sibling' | 'Children' | 'Partner';
export type StatusInvite = 'accepted' | 'rejected' | 'pending';

export interface PersonNode {
  id: string;
  name: string;
  birthDate: string;
  photo: string;
  description?: string;
  relations: Relation[];
  position?: Position;
}

export interface CreationInvite {
  receiverNodeId: string;
  senderNodeId: string;
  type: FamiliarTypes;
}

export interface Relation {
  id: string;
  type: FamiliarTypes;
}

export class Invitation implements Relation {
  id: string;
  name: string;
  photo: string;
  type: FamiliarTypes;
  status: StatusInvite;

  constructor(invitation: {
    id: string,
    name?: string,
    photo?: string,
    type: FamiliarTypes
  }) {
    const {id, name, type, photo} = invitation;
    this.status = `pending`;
    this.id = id;
    this.name = name ?? "";
    this.type = type;
    this.photo = photo ?? "";
  }
}

export interface Invite {
  sent: Invitation[];
  received: Invitation[];
}

export interface FcmToken {
  userId: string;
  token: string;
  created_at: string;
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
