import {Dimensions} from 'react-native';
import styled from 'styled-components/native';
import {BaseButton, ProfilePictureInput} from '../../components';

const height = Dimensions.get('screen').height;

export const Container = styled.View`
  flex: 1;
  height: ${height};
  background-color: white;
  padding: 10px;
`;

export const Header = styled.View`
  flex-direction: row;
`;
export const Info = styled.View`
  justify-content: center;
`;
export const Name = styled.Text`
  margin-left: 10px;
  font-size: 24px;
  color: #8c59b5;
`;
export const Date = styled.Text`
  margin-left: 10px;
  font-size: 20px;
  color: #8c59b5;
`;
export const ProfilePicture = styled(ProfilePictureInput).attrs(() => ({
  size: 160,
}))``;

export const Content = styled.View`
  flex: 1;
`;

export const Description = styled.Text`
  border: 1px solid #8c59b5;
  border-radius: 8px;
  padding: 10px;
  font-size: 20px;
  margin-top: 40px;
  color: #8c59b5;
`;

export const Remove = styled(BaseButton)``;

export const Footer = styled.View`
  position: absolute;
  width: 100%;
  align-items: center;
  bottom: 0;
`;
