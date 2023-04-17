import styled from 'styled-components/native';
import {ProfilePicture} from '../../pages/Profile/styles';
import {BaseButton} from '../BaseButton';
import {ProfilePictureInput} from '../ProfilePictureInput';

export const Container = styled.View`
  flex: 1;
  background-color: rgba(255, 255, 255, 0.6);
  align-items: center;
  justify-content: center;
`;

export const Card = styled.View`
  height: 50%;
  width: 70%;
  background-color: #ffffff;
  border: 1px solid #8c59b5;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  padding: 20px 10px;
`;

export const InviteText = styled.Text`
  flex: 1;
  padding: 10px 0;
  font-size: 20px;
  text-align: center;
  color: #000000;
`;

export const Button = styled(BaseButton).attrs(() => ({
  textStyle: {
    fontSize: 20,
  },
}))`
  width: 80px;
  height: 40px;
  padding: 0;
`;

export const ProfilePhoto = styled(ProfilePictureInput).attrs(() => ({
  size: 100,
}))``;

export const InviteActions = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
`;
