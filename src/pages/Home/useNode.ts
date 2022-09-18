import {getUserNode} from './../../service/Tree/index';
import {useIsFocused, useRoute} from '@react-navigation/native';
import {useState, useEffect} from 'react';

export const useNode = () => {
  const {
    params: {node: initialNode},
  } = useRoute();
  const [node, setNode] = useState(initialNode);

  const isFocused = useIsFocused();

  useEffect(() => {
    getUserNode(node.id).then(newNode => {
      setNode(newNode);
    });
  }, [isFocused]);

  return node;
};
