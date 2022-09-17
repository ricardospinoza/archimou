import {Container, Photo, PressableContainer} from './styles';
import defaultAvatar from '../../assets/default-avatar.png';
import {useState} from 'react';

interface ProfilePictureInput {}

export const ProfilePictureInput = ({}: ProfilePictureInput) => {
  const [imageSource, setImageSource] = useState(defaultAvatar);

  return (
    <Container colors={[]}>
      <PressableContainer>
        <Photo source={imageSource} />
      </PressableContainer>
    </Container>
  );
};
