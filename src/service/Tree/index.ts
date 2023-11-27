import {FamiliarTypes, Invitation, Invite, PersonNode, Relation} from './../../models/TreeViewModel/index';
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


// export const addInviteToNode = async (
//   node: PersonNode,
//   newInvite: Invite,
// ) => {
//   try {
//     node.invites = !!node.invites ? [...node.invites, newInvite] : [newInvite];
//     await getIntancePeople()
//       .doc(node.id)
//       .update({
//         invites: node.invites,
//       });
//   } catch (e) {
//     console.error(e);
//   }
// };

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

export const createInvitation = async (
  invite: {
    receiverNodeId: string,
    senderNodeId: string,
    type: FamiliarTypes,
    senderName: string,
    senderPhoto: string,
  }
) => {
  try {

    await createReceiverInvitation(invite);
    await createSenderInvitation(invite);
    
  } catch (e) {
    console.error(e);
  }
};

const createReceiverInvitation = async (invite: any) => {
  const {receiverNodeId, senderName, senderPhoto, senderNodeId, type} = invite;

    const inviteReceiver = await getIntanceInvite().doc(receiverNodeId).get();

    const invitation = new Invitation({
      id: senderNodeId,
      name: senderName,
      photo: senderPhoto,
      type
    });

    if (inviteReceiver.exists) {
      const receivedInvites = (inviteReceiver.data()?.received as Array<Invitation>) ?? [];


      if (receivedInvites.map(v => v.id).includes(senderNodeId)) {
        return;
      }

      await getIntanceInvite()
      .doc(receiverNodeId)
      .update({
        received: [...receivedInvites, 
          invitation
        ],
      });

    } else {
      await getIntanceInvite()
        .doc(receiverNodeId)
        .set({
          received: [invitation],
          sent: []
        });
    }

}


const createSenderInvitation = async (invite: any) => {
  const {receiverNodeId, senderNodeId, type} = invite;

    const inviteSender = await getIntanceInvite().doc(senderNodeId).get();

    const invitation = new Invitation({
      id: receiverNodeId, 
      type
    });

    if (inviteSender.exists) {
      const sentInvites = (inviteSender.data()?.sent as Array<Invitation>) ?? [];

      if (sentInvites.map(v => v.id).includes(receiverNodeId)) {
        return;
      }

      await getIntanceInvite()
      .doc(senderNodeId)
      .update({
        sent: [...sentInvites, 
          invitation
        ],
      });

    } else {
      await getIntanceInvite()
        .doc(senderNodeId)
        .set({
          sent: [invitation],
          received: []
        });
    }

}

export const getInviteSent = (userId: string, callback: (sentInviteIds: string[]) => void) => {
  getIntanceInvite()
    .doc(userId)
    .onSnapshot((data: any) => {
      const invites = data.data() as Invite;
      const sentIds = invites?.sent.map(value => value.id) ?? [];
      callback(sentIds);
    })
}

export const listenInvitations = (
  userId: string,
  callback: (invitations: Invitation[]) => void,
) => {
  getIntanceInvite()
    .doc(userId)
    .onSnapshot((data: any) => {
      const invites = data.data() as Invite;
      const received = invites?.received ?? [];
      callback(received);
    });
};

export const updateUserInvitations = async (
  userId: string,
  invitations: Invitation[],
) => {
  try {
    await getIntanceInvite().doc(userId).update({received: invitations});
  } catch (e) {
    console.error(e);
  }
};

export const updateSentUserInvitations = async (
  receiverUserId: string,
  invitation: Invitation,
) => {
  try {

    const getIntanceSent = await getIntanceInvite().doc(invitation.id).get();
    const sentInvite = getIntanceSent.data() as Invite;
    

    await getIntanceInvite().doc(invitation.id).update({
      sent: sentInvite.sent.map(inv => {
        if (inv.id === receiverUserId) {
          inv.status = 'rejected';
        }
        return inv;
      })
    });
  } catch (e) {
    console.error(e);
  }
};


export const removeNodeInvitation = async (ids: {
  nodeSentId: string;
  nodeReceivedId: string;
}
) => {
  try {

    const {nodeSentId, nodeReceivedId} = ids;

    const getIntanceSent = await getIntanceInvite().doc(nodeSentId).get();
    const sentNode = getIntanceSent.data() as Invite;
    await getIntanceInvite().doc(nodeSentId)
      .update({
        sent: sentNode.sent.filter(({id}) => id !== nodeReceivedId)
      } as Invite)

    const getInstanceReceived = await getIntanceInvite().doc(nodeReceivedId).get();
    const receivedNode = getInstanceReceived.data() as Invite;
    await getIntanceInvite().doc(nodeReceivedId)
      .update({
        received: receivedNode.received.filter(({id}) => id !== nodeSentId)
      } as Invite)

  } catch (e) {
    console.error(e);
  }
};
