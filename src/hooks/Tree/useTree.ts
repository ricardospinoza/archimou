import {PersonNode} from '../../models/TreeViewModel/index';
import {useState} from 'react';
import {TreeViewModel} from '../../models';

export const useTree = () => {
  const tree = new TreeViewModel();

  const [nodes, setNodes] = useState<PersonNode[]>([]);
  const [lines, setLines] = useState([]);

  const setFocusedNode = (focusedNode: PersonNode) => {
    setNodes([focusedNode]);
    distributeNodesAndLines(focusedNode);
  };

  const distributeNodesAndLines = async (node: PersonNode) => {
    const distributedNodes = await tree.putFamiliarNodesByFocusedNode(node);
    setNodes(nodes => [...nodes, ...distributedNodes]);
  };

  return {data: {nodes, lines}, distributeNodesAndLines, setFocusedNode};
};
