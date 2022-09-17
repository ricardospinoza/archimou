import {PersonNode} from '../../models/TreeViewModel/index';
import {useState} from 'react';
import {TreeViewModel} from '../../models';

export const useTree = () => {
  const tree = new TreeViewModel();

  const [nodes, setNodes] = useState<PersonNode[]>([]);
  const [lines, setLines] = useState([]);

  const setMainNode = (mainNode: PersonNode) => {
    setNodes([mainNode]);
    setFocusedNode(mainNode);
  };
  const setFocusedNode = (focusedNode: PersonNode) => {
    distributeNodesAndLines(focusedNode);
  };

  const distributeNodesAndLines = async (node: PersonNode) => {
    const distributedNodes = await tree.putFamiliarNodesByFocusedNode(node);

    setNodes(nodes => {
      const newNodes = distributedNodes.filter(
        ({id}) => !nodes.some(n => n.id === id),
      );
      return [...nodes, ...newNodes];
    });
  };

  return {
    data: {nodes, lines},
    distributeNodesAndLines,
    setFocusedNode,
    setMainNode,
  };
};
