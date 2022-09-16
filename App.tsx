import {ElementRef, useEffect, useRef, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Person} from './src/components';
import {InteractiveView} from './src/components/InteractiveView';
import {HALF_SIZE, NODE_CENTER, NODE_SIZE, SIZE} from './src/constants';
import {useTree} from './src/hooks';
import {PersonNode} from './src/models/TreeViewModel';
import {Position} from './src/types';

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
  const [nodeActionsPressed, setShowNodeActions] = useState<PersonNode | null>(
    null,
  );

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

  return (
    <InteractiveView
      size={SIZE}
      ref={interactiveViewRef}
      onMove={() => {
        setShowNodeActions(null);
      }}>
      {data.nodes.map(node => {
        console.log('INSIDE MAP: ', {node});
        return (
          <Person
            key={node.id}
            value={node}
            onLongPress={() => setShowNodeActions(node)}
          />
        );
      })}

      {!!nodeActionsPressed && (
        <TouchableOpacity
          style={{
            transform: [
              {translateY: nodeActionsPressed.position!.y},
              {translateX: nodeActionsPressed.position!.x},
            ],
            height: NODE_SIZE,
            width: NODE_SIZE,
            backgroundColor: 'blue',
            zIndex: 15,
          }}
          onPress={() => {
            console.log('touch');
          }}
          onLongPress={() => {
            console.log('LONG PRESS');
          }}>
          <Text>Options</Text>
        </TouchableOpacity>
      )}
    </InteractiveView>
  );
};

export default App;
