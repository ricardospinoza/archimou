import {Dimensions} from 'react-native';
import styled from 'styled-components/native';
import {BaseButton} from '../../components';

const {height} = Dimensions.get('window');

export const Container = styled.KeyboardAvoidingView`
  height: ${height * 0.9}px;
  align-items: center;
  background-color: white;
`;

export const Form = styled.View`
  height: 25%;
  width: 100%;
  align-items: center;
  justify-content: space-around;
  margin-top: 40px;
`;

export const Footer = styled.View`
  align-items: center;
`;

export const Continue = styled(BaseButton)`
  position: absolute;
  bottom: 5px;
`;
