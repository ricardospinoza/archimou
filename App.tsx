import {ElementRef, useEffect, useRef, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {NodeOptions, Nodes, Person} from './src/components';
import {InteractiveView} from './src/components/InteractiveView';
import {HALF_SIZE, NODE_CENTER, NODE_SIZE, SIZE} from './src/constants';
import {useTree} from './src/hooks';
import {PersonNode} from './src/models/TreeViewModel';
const mockedNode: PersonNode = {
  id: '1',
  name: 'Eu',
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
    {
      id: '6',
      type: 'Children',
    },
    {
      id: '7',
      type: 'Children',
    },
  ],
};

const App = () => {
  const interactiveViewRef = useRef<ElementRef<typeof InteractiveView>>();
  const {data, setFocusedNode} = useTree();
  const [pressedNode, setPressedNode] = useState<PersonNode | null>(null);

  const node = mockedNode;

  const screenCenter = {
    x: HALF_SIZE + NODE_CENTER.x,
    y: HALF_SIZE + NODE_CENTER.y,
  };

  useEffect(() => {
    centerNode();
  }, []);

  const centerNode = () => {
    interactiveViewRef.current?.centerView({
      x: screenCenter.x,
      y: screenCenter.y,
    });
    setFocusedNode({
      ...node,
      position: {...screenCenter},
    } as PersonNode);
  };

  const hideOptions = () => {
    setPressedNode(null);
  };

  return (
    <InteractiveView size={SIZE} ref={interactiveViewRef} onMove={hideOptions}>
      <Nodes nodes={data.nodes} onLongNodePress={setPressedNode} />
      <NodeOptions nodePressed={pressedNode} />
    </InteractiveView>
  );
};

export default App;
