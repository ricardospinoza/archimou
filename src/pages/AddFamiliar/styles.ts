import {TouchableOpacity} from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const SelectButton = styled.TouchableOpacity`
  width: 90%;
  height: 60px;
  border: 4px solid #8c59b5;
  border-radius: 8px;
  margin: 10px 0;
  justify-content: center;
  padding: 10px;
`;
export const SelectText = styled.Text`
  font-size: 24px;
  color: #8c59b5;
`;
export const ContinueButton = styled.TouchableOpacity`
  width: 90%;
  height: 60px;
  border: 4px solid #8c59b5;
  background-color: #8c59b5;
  border-radius: 8px;
  margin: 10px 0;
  justify-content: center;
  padding: 10px;
  align-items: center;
`;
export const ContinueText = styled.Text`
  font-size: 24px;
  color: white;
`;

export const Options = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
`;
