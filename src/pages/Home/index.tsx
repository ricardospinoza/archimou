import {ElementRef, Ref, useEffect, useRef, useState} from 'react';
import {BaseTree, Dock, NodeOptions} from '../../components';
import {
  InteractiveView,
  InteractiveViewHandler,
} from '../../components/InteractiveView';
import {HALF_SIZE, NODE_CENTER, SIZE} from '../../constants';
import {useTree} from '../../hooks';
import {Position} from '../../types';
import {PersonNode} from '../../models/TreeViewModel';
import {useIsFocused} from '@react-navigation/native';
import {useNode} from './useNode';

export const Home = () => {
  const interactiveViewRef = useRef<ElementRef<typeof InteractiveView>>();
  const {nodes, lines, setFocusedNode, setMainNode} = useTree();
  const [pressedNode, setPressedNode] = useState<PersonNode | null>(null);

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

  return (
    <>
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
