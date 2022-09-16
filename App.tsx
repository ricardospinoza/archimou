import {ElementRef, useEffect, useMemo, useRef} from 'react';
import {Dimensions, Text, View} from 'react-native';
import {
  InteractiveView,
  InteractiveViewHandler,
} from './src/components/InteractiveView';
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

  console.log({nodes: data.nodes});

  return (
    <InteractiveView size={SIZE} ref={interactiveViewRef}>
      {data.nodes.map(node => {
        return (
          <View
            style={{
              transform: [
                {translateX: node.position!.x},
                {translateY: node.position!.y},
              ],

              height: NODE_SIZE,
              width: NODE_SIZE,
              backgroundColor: 'red',
            }}>
            <Text>{node.name}</Text>
          </View>
        );
      })}
    </InteractiveView>
  );
};

export default App;
