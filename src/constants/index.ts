import {Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');
export const NODE_SIZE = 100;
export const NODE_CENTER = {
  x: NODE_SIZE / 2,
  y: NODE_SIZE / 2,
};
export const SIZE = height * 10;
export const HALF_SIZE = SIZE / 2;

export const DATE_MASK = [
  /\d/,
  /\d/,
  '/',
  /\d/,
  /\d/,
  '/',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];
