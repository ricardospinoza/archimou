import { FamiliarTypes, Invitation, Invite } from "../../models/TreeViewModel";
import { getIntanceInvite } from "../../utils/firebase-factory";

export const updateUserInvitations = async (
    userId: string,
    invitations: Invitation[],
) => {
    try {
        await getIntanceInvite().doc(userId).update({ received: invitations });
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
    const { receiverNodeId, senderName, senderPhoto, senderNodeId, type } = invite;

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
    const { receiverNodeId, senderNodeId, type } = invite;

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


export const removeNodeInvitation = async (ids: {
    nodeSentId: string;
    nodeReceivedId: string;
}
) => {
    try {

        const { nodeSentId, nodeReceivedId } = ids;

        const getIntanceSent = await getIntanceInvite().doc(nodeSentId).get();
        const sentNode = getIntanceSent.data() as Invite;
        await getIntanceInvite().doc(nodeSentId)
            .update({
                sent: sentNode.sent.filter(({ id }) => id !== nodeReceivedId)
            } as Invite)

        const getInstanceReceived = await getIntanceInvite().doc(nodeReceivedId).get();
        const receivedNode = getInstanceReceived.data() as Invite;
        await getIntanceInvite().doc(nodeReceivedId)
            .update({
                received: receivedNode.received.filter(({ id }) => id !== nodeSentId)
            } as Invite)

    } catch (e) {
        console.error(e);
    }
};
