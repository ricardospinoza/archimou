import {Container, Photo, PressableContainer} from './styles';
import defaultAvatar from '../../assets/default-avatar.png';
import {useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';

interface ProfilePictureInput {}

export const ProfilePictureInput = ({}: ProfilePictureInput) => {
  const [imageSource, setImageSource] = useState(defaultAvatar);

  const getImage = async () => {
    const {assets} = await launchImageLibrary({
      selectionLimit: 50,
      mediaType: 'photo',
    });
    const {uri = ''} = assets?.[0];
    setImageSource({uri});
  };

  return (
    <Container colors={[]}>
      <PressableContainer onPress={getImage}>
        <Photo source={imageSource} />
      </PressableContainer>
    </Container>
  );
};
