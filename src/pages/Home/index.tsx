import messaging from '@react-native-firebase/messaging';
import { useIsFocused } from '@react-navigation/native';
import { ElementRef, Ref, useEffect, useRef, useState } from 'react';
import { BaseTree, Dock, InvitationModal, NodeOptions } from '../../components';
import {
  InteractiveView,
  InteractiveViewHandler,
} from '../../components/InteractiveView';
import { HALF_SIZE, NODE_CENTER, SIZE } from '../../constants';
import { useTree, useUser } from '../../hooks';
import { FamiliarTypes, Invitation, PersonNode, Relation, StatusInvite } from '../../models/TreeViewModel';
import { Position } from '../../types';


import { Alert } from 'react-native';
import {
  addFamiliarToNode,
  deleteTempNode,
  existsTokenFCM,
  getDynamicLinkData,
  getUserNode,
  listenInvitations,
  replaceFamiliarNode,
  updateTokenFCM,
  updateUserInvitations
} from '../../service';


export const Home = () => {
  const interactiveViewRef = useRef<ElementRef<typeof InteractiveView>>();
  const {nodes, lines, setFocusedNode, setMainNode} = useTree();
  const [pressedNode, setPressedNode] = useState<PersonNode | null>(null);

  const [showInviteModal, setShowInviteModal] = useState(false);

  const [userInvitation, setUserInvitation] = useState<Invitation[] | null>(null);
  const [tempId, setTempId] = useState('');

  const user = useUser();

  const screenCenter = {
    x: HALF_SIZE + NODE_CENTER.x,
    y: HALF_SIZE + NODE_CENTER.y,
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log("teste de mensagem", remoteMessage.data)
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    initialize();
  }, [isFocused, user]);

  const initialize = async () => {
    if (isFocused) {
      centerMainNode();
      setPressedNode(null);
    }
  };

  useEffect(() => {
    fetchInvitationLink();
  }, []);

  useEffect(() => {
    listenInvitations(user.id, async invitations => {
      console.log("ouvindo o invite")
      console.log(invitations)

      if (!!invitations.length) {
        setTempId(user.id);

        setUserInvitation(invitations);
        // Necessário pensar na lógica para mostrar os modais sequênciais quando houver mais de um invite
        // Ou, o que considero ideal, mostra uma tela de notificação para aceitar ou rejeitar o convite
        setShowInviteModal(true);
        // await updateUserInvitations(user.id, invitations);
      }
    });
  }, []);

  const fetchInvitationLink = async () => {
    const data = await getDynamicLinkData();
    if (!data) return;

    await deleteTempNode(data!.tempId);

    setTempId(data!.tempId);
    setInvite(data!.userInviteId);
  };

  useEffect(() => {
    const requestPermission = async () => {
      try {
        
        const existsToken = await existsTokenFCM(user.id);

        if (!existsToken) {
          console.log("Get token fcm")
          const permissionStatus = await messaging().requestPermission();

          if (permissionStatus === messaging.AuthorizationStatus.AUTHORIZED) {
            console.log('Permission granted');
            const fcmToken = await messaging().getToken();
            updateTokenFCM({
              userId: user.id,
              token: fcmToken,
              created_at: new Date().toISOString(),
            });
            
          } else {
            console.log('Permission denied');
          }
        }

      } catch (error) {
        console.error('Error requesting permission:', error);
      }
    };

    requestPermission();
  }, []);

  // const setInvite = async (relations: Invitation[]) => {

  //   const inviteList = relations.map(async r => {
  //     const user: PersonNode = await getUserNode(r.id);
  //     return {
  //       name: user.name,
  //       ...r
  //     }
  //   });

  //   // const userInvitation = await getUserNode(userInviteId);

  //   setUserInvitation(inviteList);
  //   setShowInviteModal(true);

  // };

  const centerMainNode = () => {
    centralizeView(screenCenter);
    setMainNode({
      ...user,
      position: {...screenCenter},
    } as PersonNode);
  };

  const centralizeView = (position: Position) => {
    interactiveViewRef.current?.centerView(position);
  };

  const hideOptions = () => {
    setPressedNode(null);
  };

  const handleNodeClick = (node: PersonNode) => {
    centralizeView(node.position!);
    setFocusedNode(node);
  };

  const acceptInvitation = async () => {

    return;
    const relation = userInvitation?.relations.find(({id}) => id === tempId);

    const mapRelations = {
      Children: 'Parent',
      Parent: 'Children',
      Sibling: 'Sibling',
      Partner: 'Partner',
    } as {[key: FamiliarTypes]: FamiliarTypes};

    await addFamiliarToNode(user, {
      id: userInvitation!.id,
      type: mapRelations[relation!.type],
    });

    if (tempId !== user.id) {
      await replaceFamiliarNode(userInvitation!, {
        tempId,
        realId: user.id,
      });
    }
    setShowInviteModal(false);
    centerMainNode();
  };

  return (
    <>
      {
        userInvitation?.map(invite => {
          return (<InvitationModal
            show={showInviteModal}
            userInvitation={invite}
            onConfirm={acceptInvitation}
            onDenied={() => {
              setShowInviteModal(false);
            }}
            />)
        })
      }
      <InteractiveView
        size={SIZE}
        ref={interactiveViewRef as Ref<InteractiveViewHandler>}
        onMove={hideOptions}>
        <BaseTree
          nodes={nodes}
          lines={lines}
          onLongNodePress={setPressedNode}
          onNodePress={handleNodeClick}
        />

        <NodeOptions nodePressed={pressedNode} />
      </InteractiveView>
      <Dock onTreePress={centerMainNode} />
    </>
  );
};
