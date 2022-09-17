import MaskInput from 'react-native-mask-input';
import styled from 'styled-components/native';

export const InputContainer = styled.View`
  width: 90%;
  height: 60px;
  border: 2px solid #8c59b5;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 4px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TextInput = styled(MaskInput)`
  color: #8c59b5;
  font-size: 20px;
`;
