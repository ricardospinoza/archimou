import {TouchableOpacity} from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import {BaseButton} from '../../components';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

interface OptionProps {
  selected: boolean;
}

export const Option = styled(BaseButton).attrs(() => ({
  textStyle: {
    color: '#8c59b5',
  },
}))<OptionProps>`
  border: 4px solid #8c59b5;
  align-items: flex-start;
  background-color: ${({selected}) => (selected ? '#8c59b5' : 'white')};
  opacity: ${({selected}) => (selected ? 0.5 : 1)};
`;

export const Options = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const Continue = styled(BaseButton)``;
