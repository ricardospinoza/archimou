import {ElementRef, Ref, useEffect, useRef, useState} from 'react';
import {Text, View} from 'react-native';
import {BaseTree, Icon, NodeOptions} from '../../components';
import {
  InteractiveView,
  InteractiveViewHandler,
} from '../../components/InteractiveView';
import {HALF_SIZE, NODE_CENTER, SIZE} from '../../constants';
import {useTree} from '../../hooks';
import {Position} from '../../types';
import {PersonNode} from '../../models/TreeViewModel';

const mockedNode: PersonNode = {
  id: '1',
  name: 'Eu',
  photo: 'https://avatars.githubusercontent.com/u/55005400?v=4',
  relations: [
    {
      id: '2',
      type: 'Parent',
    },
    {
      id: '3',
      type: 'Parent',
    },
    {
      id: '4',
      type: 'Children',
    },
    {
      id: '5',
      type: 'Children',
    },
    // {
    //   id: '6',
    //   type: 'Children',
    // },
    {
      id: '7',
      type: 'Children',
    },
  ],
};

export const Home = () => {
  const interactiveViewRef = useRef<ElementRef<typeof InteractiveView>>();
  const {data, setFocusedNode, setMainNode} = useTree();
  const [pressedNode, setPressedNode] = useState<PersonNode | null>(null);

  const node = mockedNode;

  const screenCenter = {
    x: HALF_SIZE + NODE_CENTER.x,
    y: HALF_SIZE + NODE_CENTER.y,
  };

  useEffect(() => {
    centerMainNode();
  }, []);

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
  );
};
