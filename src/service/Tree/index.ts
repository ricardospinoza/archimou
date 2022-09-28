import {PersonNode, Relation} from './../../models/TreeViewModel/index';
import firestore from '@react-native-firebase/firestore';

export const getUserTree = async (relations: Relation[]) => {
  const nodeTree = await Promise.all(
    relations.map(async ({id}) => {
      const node = await firestore().collection('People').doc(id).get();
      return node.data();
    }),
  );
  return nodeTree as PersonNode[];
};

export const getUserNode = async (nodeId: string) => {
  try {
    const userNode = await firestore().collection('People').doc(nodeId).get();

    if (!userNode.exists) {
      return;
    }

    return userNode.data();
  } catch (e) {
    console.log(e);
    return undefined;
  }
};

export const createUserNode = async (node: PersonNode) => {
  try {
    await firestore().collection('People').doc(node.id).set(node);
  } catch (e) {
    console.log(e);
  }
};

export const createFamiliar = async (node: PersonNode) => {
  try {
    await firestore().collection('People').doc(node.id).set(node);
  } catch (e) {
    console.log(e);
  }
};

export const addFamiliarToNode = async (
  node: PersonNode,
  newRelation: Relation,
) => {
  try {
    await firestore()
      .collection('People')
      .doc(node.id)
      .update({
        relations: [...node.relations, newRelation],
      });
  } catch (e) {
    console.log(e);
  }
};

export const replaceFamiliarNode = async (
  node: PersonNode,
  {
    tempId,
    realId,
  }: {
    tempId: string;
    realId: string;
  },
) => {
  try {
    const relations = [...node.relations];
    const relationIndex = relations.findIndex(({id}) => id === tempId);

    relations[relationIndex] = {
      ...relations[relationIndex],
      id: realId,
    };

    await firestore().collection('People').doc(node.id).update({
      relations,
    });
  } catch (e) {
    console.log(e);
  }
};

export const deleteTempNode = async (tempId: string) => {
  try {
    await firestore().collection('People').doc(tempId).delete();
  } catch (e) {}
};

export const removeNodeRelation = async (
  user: PersonNode,
  node: PersonNode,
) => {
  try {
    const userRelations = user.relations.filter(({id}) => id !== node.id);
    const nodeRelations = user.relations.filter(({id}) => id !== user.id);

    await firestore().collection('People').doc(user.id).update({
      relations: userRelations,
    });

    await firestore().collection('People').doc(node.id).update({
      relations: nodeRelations,
    });
  } catch (e) {
    console.log(e);
  }
};
