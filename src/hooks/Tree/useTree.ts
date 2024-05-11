import {PersonNode} from '../../models/TreeViewModel/index';
import {useState} from 'react';
import {TreeViewModel} from '../../models';
import {Line} from '../../types';

export const useTree = () => {
  const tree = new TreeViewModel();

  const [nodes, setNodes] = useState<PersonNode[]>([]);
  const [lines, setLines] = useState<Line[]>([]);

  const setMainNode = async (mainNode: PersonNode) => {
    setNodes([mainNode]);
    setLines([]);
    const distributedNodes = await tree.putFamiliarNodesByFocusedNode(mainNode);
    setNodes(() => {
      const newLines = buildLinesFrom(mainNode, distributedNodes);
      setLines(newLines);
      return [mainNode, ...distributedNodes];
    });
  };
  const setFocusedNode = async (focusedNode: PersonNode) => {
    await distributeNodesAndLines(focusedNode);
  };

  const distributeNodesAndLines = async (node: PersonNode) => {
    const distributedNodes = await tree.putFamiliarNodesByFocusedNode(node);

    const newNodes = filterNewNodes(nodes, distributedNodes);
    const newLines = buildLinesFrom(node, newNodes);

    if (isNotEmpty(newNodes)) {
      setNodes(ns => [...ns, ...newNodes]);
    }

    if (isNotEmpty(newLines)) {
      setLines(lines => [...lines, ...newLines]);
    }

  };

  function isNotEmpty(list: any[]) {
    return list.length !== 0;
  }

  const filterNewNodes = (
    allNodes: PersonNode[],
    distributedNodes: PersonNode[],
  ) => {
    return distributedNodes.filter(({id}) => !allNodes.some(n => n.id === id));
  };

  const buildLinesFrom = (fromNode: PersonNode, toNodes: PersonNode[]) => {
    return toNodes.map(newNode => ({
      id: `${fromNode.id}_${newNode.id}`,
      from: fromNode.position!,
      to: newNode.position!,
    }));
  };

  return {
    nodes,
    lines,
    distributeNodesAndLines,
    setFocusedNode,
    setMainNode,
  };
};
