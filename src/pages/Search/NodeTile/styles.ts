import styled from 'styled-components/native';
import {BaseButton, ProfilePictureInput} from '../../../components';

export const Container = styled.View`
  background-color: #faf4ff;
  border-radius: 8px;
  border: 1px solid #8c59b5;
  margin: 10px;
  padding: 5px 10px;
  flex-direction: row;
  align-items: center;
`;

export const Photo = styled(ProfilePictureInput).attrs(() => ({
  size: 80,
}))``;

export const InfoSection = styled.View`
  flex: 1;
  justify-content: center;
  margin-left: 20px;
`;

export const Name = styled.Text`
  font-weight: bold;
  font-size: 20px;
  color: #8c59b5;
`;
export const Parents = styled.Text`
  font-size: 16px;
  color: #8c59b5;
`;

export const ConnectButton = styled(BaseButton).attrs(() => ({
  padding: 0,
  textStyle: {
    fontSize: 16,
  },
}))`
  padding: 0;
  height: 30px;
`;
