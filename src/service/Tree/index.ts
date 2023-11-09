import {Invite, PersonNode, Relation} from './../../models/TreeViewModel/index';
import { getIntancePeople, getIntanceInvite } from '../../utils/firebase-factory';

export const getUserTree = async (relations: Relation[]) => {
  const nodeTree = await Promise.all(
    relations.map(async ({id}) => {
      const node = await getIntancePeople().doc(id).get();
      return node.data();
    }),
  );
  return nodeTree as PersonNode[];
};

export const getUserNode = async (nodeId: string) => {
  try {
    const userNode = await getIntancePeople().doc(nodeId).get();
    
    if (!userNode.exists) {
      return;
    }

    return userNode.data();
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

export const createUserNode = async (node: PersonNode) => {
  await createPeople(node);
};

export const createFamiliar = async (node: PersonNode) => {
  await createPeople(node);
};

const createPeople = async (node: PersonNode) => {
  try {
    await getIntancePeople().doc(node.id).set(node);
  } catch (e) {
    console.error(e);
  }
}

export const addFamiliarToNode = async (
  node: PersonNode,
  newRelation: Relation,
) => {
  try {
    await getIntancePeople()
      .doc(node.id)
      .update({
        relations: [...node.relations, newRelation],
      });
  } catch (e) {
    console.error(e);
  }
};


export const addInviteToNode = async (
  node: PersonNode,
  newInvite: Invite,
) => {
  try {
    await getIntancePeople()
      .doc(node.id)
      .update({
        invites: !!node.invites ? [...node.invites, newInvite] : newInvite,
      });
  } catch (e) {
    console.error(e);
  }
};

export const replaceFamiliarNode = async (
  node: PersonNode,
  {
    tempId,
    realId,
  }: {
    tempId: string;
    realId: string;
  },
) => {
  try {
    const relations = [...node.relations];
    const relationIndex = relations.findIndex(({id}) => id === tempId);

    relations[relationIndex] = {
      ...relations[relationIndex],
      id: realId,
    };

    await getIntancePeople().doc(node.id).update({
      relations,
    });
  } catch (e) {
    console.error(e);
  }
};

export const deleteTempNode = async (tempId: string) => {
  try {
    await getIntancePeople().doc(tempId).delete();
  } catch (e) {}
};

export const removeNodeRelation = async (
  user: PersonNode,
  node: PersonNode,
) => {
  try {
    const userRelations = user.relations.filter(({id}) => id !== node.id);
    const nodeRelations = user.relations.filter(({id}) => id !== user.id);

    await getIntancePeople().doc(user.id).update({
      relations: userRelations,
    });

    await getIntancePeople().doc(node.id).update({
      relations: nodeRelations,
    });
  } catch (e) {
    console.error(e);
  }
};

export const getUsersByName = async (name: string) => {
  try {
    const response = await getIntancePeople()
      .where('name', '>=', name)
      .where('name', '<=', name + '\uf8ff')
      .get();

    const users = [] as PersonNode[];

    response.forEach(userRaw => {
      const user = userRaw.data() as PersonNode;
      users.push(user);
    });

    return users;
  } catch (e) {
    console.error(e);
  }
};

export const getParentsByNode = async (node: PersonNode) => {
  try {
    const parents = node.relations.filter(({type}) => type === 'Parent');

    const parentNames = await Promise.all(
      parents.map(async ({id}) => {
        const node = await getIntancePeople().doc(id).get();
        return (node.data() as PersonNode)['name'];
      }),
    );

    return parentNames;
  } catch (e) {
    console.error(e);
  }
};
// Não entendi a necessidade do invite

/*
 * Dúvidas em relação ao motivo de não ter notificação, e entrar direto na rede da outra pessoa
 */
export const createInvitation = async (
  invitedNodeId: string,
  invitationNodeId: string,
) => {
  try {
    const invitesRaw = await getIntanceInvite().doc(invitedNodeId).get();

    const invites = (invitesRaw.data()?.invitations as Array<string>) ?? [];

    await getIntanceInvite()
      .doc(invitedNodeId)
      .set({
        invitations: [...invites, invitationNodeId],
      });
  } catch (e) {
    console.error(e);
  }
};

export const listenInvitations = (
  userId: string,
  callback: (invitaions: string[]) => void,
) => {
  getIntanceInvite()
    .doc(userId)
    .onSnapshot(data => {
      const invitaions = data.data()?.invitations ?? [];
      callback(invitaions);
    });
};

export const updateUserInvitations = async (
  userId: string,
  invitations: string[],
) => {
  try {
    await getIntanceInvite().doc(userId).update({invitations});
  } catch (e) {
    console.error(e);
  }
};
