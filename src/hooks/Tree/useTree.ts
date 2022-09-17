import {PersonNode} from '../../models/TreeViewModel/index';
import {useState} from 'react';
import {TreeViewModel} from '../../models';
import {Line} from '../../types';

export const useTree = () => {
  const tree = new TreeViewModel();

  const [nodes, setNodes] = useState<PersonNode[]>([]);
  const [lines, setLines] = useState<Line[]>([]);

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
      const newNodes = filterNewNodes(nodes, distributedNodes);
      const newLines = buildLinesFrom(node, newNodes);
      console.log({newLines});
      setLines(lines => [...lines, ...newLines]);
      return [...nodes, ...newNodes];
    });
  };

  const filterNewNodes = (
    nodes: PersonNode[],
    distributedNodes: PersonNode[],
  ) => {
    return distributedNodes.filter(({id}) => !nodes.some(n => n.id === id));
  };

  const buildLinesFrom = (fromNode: PersonNode, toNodes: PersonNode[]) => {
    return toNodes.map(newNode => ({
      from: fromNode.position!,
      to: newNode.position!,
    }));
  };

  return {
    data: {nodes, lines},
    distributeNodesAndLines,
    setFocusedNode,
    setMainNode,
  };
};
