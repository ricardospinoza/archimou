import {Icon} from './../Icon/index';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  width: 95%;
  align-items: center;
  justify-content: space-between;
  background-color: #8c59b5;
  margin: 0 auto;
  margin-bottom: 10px;
  border-radius: 8px;
  height: 60px;
  padding: 0 10px;
`;
export const Center = styled.View`
  height: 80px;
  width: 80px;
  border-radius: 40px;
  border: 10px solid white;
  background-color: #8c59b5;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
`;

export const TreeIcon = styled(Icon)`
  background-color: #8c59b5;
`;
