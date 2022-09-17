import {ElementRef, Ref, useEffect, useRef, useState} from 'react';
import {Text, View} from 'react-native';
import {BaseTree, Dock, Icon, NodeOptions} from '../../components';
import {
  InteractiveView,
  InteractiveViewHandler,
} from '../../components/InteractiveView';
import {HALF_SIZE, NODE_CENTER, SIZE} from '../../constants';
import {useTree} from '../../hooks';
import {Position} from '../../types';
import {PersonNode} from '../../models/TreeViewModel';
import {useIsFocused, useRoute} from '@react-navigation/native';

export const Home = () => {
  const interactiveViewRef = useRef<ElementRef<typeof InteractiveView>>();
  const {data, setFocusedNode, setMainNode} = useTree();
  const [pressedNode, setPressedNode] = useState<PersonNode | null>(null);

  const {
    params: {node},
  } = useRoute();

  const screenCenter = {
    x: HALF_SIZE + NODE_CENTER.x,
    y: HALF_SIZE + NODE_CENTER.y,
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    centerMainNode();
  }, []);

  useEffect(() => {
    if (isFocused) {
      setPressedNode(null);
    }
  }, [isFocused]);

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
          nodes={data.nodes}
          lines={data.lines}
          onLongNodePress={setPressedNode}
          onNodePress={handleNodeClick}
        />

        <NodeOptions nodePressed={pressedNode} />
      </InteractiveView>
      <Dock onTreePress={centerMainNode} />
    </>
  );
};
