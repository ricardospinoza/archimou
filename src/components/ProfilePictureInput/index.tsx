import {Container, Photo, PressableContainer} from './styles';
import defaultAvatar from '../../assets/default-avatar.png';
import {useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

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
    try {
      const {assets} = await launchImageLibrary({
        selectionLimit: 50,
        mediaType: 'photo',
        includeBase64: true,
      });

      if (!assets?.length) return;

      const {uri = '', base64, fileName} = assets[0];

      await storage().ref(`images/${fileName}`).putString(base64!, 'base64');
      const url = await storage().ref(`images/${fileName}`).getDownloadURL();
      setImageSource({uri});
      onChangePhoto(url);
    } catch ({error}) {
      console.log({error});
    }
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
