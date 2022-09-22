import {Container, Photo, PressableContainer} from './styles';
import defaultAvatar from '../../assets/default-avatar.png';
import {useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {StyledProps} from 'styled-components';
import {ViewProps} from 'react-native';

interface ProfilePictureInput {
  photoUrl: string;
  onChangePhoto?: (photoUrl: string) => void;
  size?: number;
}

export const ProfilePictureInput = ({
  photoUrl,
  onChangePhoto,
  size,
}: ProfilePictureInput) => {
  const [imageSource, setImageSource] = useState(
    !!photoUrl ? {uri: photoUrl} : defaultAvatar,
  );

  const getImage = async () => {
    const {assets} = await launchImageLibrary({
      selectionLimit: 50,
      mediaType: 'photo',
    });
    const {uri = ''} = assets?.[0];
    setImageSource({uri});
    onChangePhoto(uri);
  };

  return (
    <Container colors={[]} size={size ?? 300}>
      <PressableContainer
        onPress={onChangePhoto ? getImage : () => {}}
        size={size ?? 300}>
        <Photo source={imageSource} size={size ?? 300} />
      </PressableContainer>
    </Container>
  );
};
