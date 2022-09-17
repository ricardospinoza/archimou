import {StyleProp, TextStyle, ViewStyle} from 'react-native';
import {ButtonText, ButtonContainer} from './styles';

interface BaseButton {
  label: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const BaseButton = ({label, onPress, textStyle, style}: BaseButton) => {
  return (
    <ButtonContainer onPress={onPress} style={style}>
      <ButtonText style={textStyle}>{label}</ButtonText>
    </ButtonContainer>
  );
};
