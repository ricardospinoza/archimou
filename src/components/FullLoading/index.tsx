import {ActivityIndicator, Modal} from 'react-native';

interface FullLoadingProps {
  show: boolean;
}

export const FullLoading = ({show}: FullLoadingProps) => {
  return (
    <Modal visible={show}>
      <ActivityIndicator size={150} style={{flex: 1}} />
    </Modal>
  );
};
