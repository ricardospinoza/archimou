import {ElementRef, Ref, useEffect, useRef, useState} from 'react';
import {BaseTree, Dock, InvitationModal, NodeOptions} from '../../components';
import {
  InteractiveView,
  InteractiveViewHandler,
} from '../../components/InteractiveView';
import {HALF_SIZE, NODE_CENTER, SIZE} from '../../constants';
import {useTree} from '../../hooks';
import {Position} from '../../types';
import {FamiliarTypes, PersonNode} from '../../models/TreeViewModel';
import {useIsFocused, useRoute} from '@react-navigation/native';
import {useNode} from './useNode';
import dynamicLinks from '@react-native-firebase/dynamic-links';

import parse from 'url-parse';
import {
  addFamiliarToNode,
  deleteTempNode,
  getDynamicLinkData,
  getUserNode,
  replaceFamiliarNode,
} from '../../service';

export const Home = () => {
  const interactiveViewRef = useRef<ElementRef<typeof InteractiveView>>();
  const {nodes, lines, setFocusedNode, setMainNode} = useTree();
  const [pressedNode, setPressedNode] = useState<PersonNode | null>(null);

  const [showInviteModal, setShowInviteModal] = useState(false);

  const [userInvitation, setUserInvitation] = useState<PersonNode | null>(null);
  const [tempId, setTempId] = useState('');

  const node = useNode();

  const screenCenter = {
    x: HALF_SIZE + NODE_CENTER.x,
    y: HALF_SIZE + NODE_CENTER.y,
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    initialize();
  }, [isFocused, node]);

  const initialize = async () => {
    if (isFocused) {
      centerMainNode();
      setPressedNode(null);
    }
  };

  useEffect(() => {
    fetchInvitationLink();
  }, []);

  const fetchInvitationLink = async () => {
    const data = await getDynamicLinkData();
    if (!data) return;

    await deleteTempNode(data!.tempId);

    const userInvitation = await getUserNode(data!.userInviteId);

    console.log({data});

    setTempId(data!.tempId);
    setUserInvitation(userInvitation!);
    setShowInviteModal(true);
  };

  const centerMainNode = () => {
    centralizeView(screenCenter);
    setMainNode({
      ...node,
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
    const relation = userInvitation?.relations.find(({id}) => id === tempId);

    const mapRelations = {
      Children: 'Parent',
      Parent: 'Children',
      Sibling: 'Sibling',
      Partner: 'Partner',
    } as {[key: FamiliarTypes]: FamiliarTypes};

    console.log({
      relation,
      userInvitation,
    });

    console.log('RELATIONS: ', userInvitation?.relations);
    console.log('TEMPID: ', tempId);

    await addFamiliarToNode(node, {
      id: userInvitation!.id,
      type: mapRelations[relation!.type],
    });

    await replaceFamiliarNode(userInvitation!, {
      tempId,
      realId: node.id,
    });

    setShowInviteModal(false);
  };

  return (
    <>
      {!!userInvitation && (
        <InvitationModal
          show={showInviteModal}
          userInvitation={userInvitation!}
          onConfirm={acceptInvitation}
          onDenied={() => {
            setShowInviteModal(false);
          }}
        />
      )}
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

        <NodeOptions nodePressed={pressedNode} userId={node.id} />
      </InteractiveView>
      <Dock onTreePress={centerMainNode} />
    </>
  );
};
