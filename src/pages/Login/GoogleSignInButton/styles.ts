import styled from 'styled-components/native';
import {Icon} from '../../../components';

export const Container = styled.TouchableOpacity`
  background: #fafafc;
  border: 1px solid #8c59b5;
  border-radius: 5px;
  flex-direction: row;
  height: 50px;
  width: 300px;
`;

export const TextContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  font-size: 15px;
  color: #666666;
`;

export const IconContainer = styled.View`
  width: 50px;
  align-items: center;
  justify-content: center;
  border-right-width: 1px;
  border-right-color: #8c59b5;
`;

export const GoogleIcon = styled(Icon).attrs(() => ({
  name: 'google',
  color: '',
  size: 25,
}))``;
