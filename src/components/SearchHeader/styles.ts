import styled from 'styled-components/native';
import {Input} from '../Input';

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 20px 10px;
`;

export const SearchInput = styled(Input).attrs(() => ({
  iconSize: 25,
  inputStyle: {
    fontSize: 16,
    padding: 0,
  },
}))`
  height: 40px;
  padding: 0 10px;
`;

export const BackButton = styled.TouchableOpacity`
  flex: 1;
`;
