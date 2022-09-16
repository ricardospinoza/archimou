import {PersonNode} from './../../models/TreeViewModel/index';

const mockData: PersonNode[] = [
  {
    id: '1',
    name: 'Filho',
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
    ],
  },
  {
    id: '2',
    name: 'Pai',
    relations: [],
  },
  {
    id: '3',
    name: 'Mae',
    relations: [],
  },
  {
    id: '4',
    name: 'Fulano',
    relations: [],
  },
  {
    id: '5',
    name: 'Ciclano',
    relations: [],
  },
  {
    id: '5',
    name: 'Beltrano',
    relations: [],
  },
];

export const getUserTree = (nodeId: string): Promise<PersonNode[]> => {
  return new Promise(resolve => {
    resolve(mockData);
  });
};
