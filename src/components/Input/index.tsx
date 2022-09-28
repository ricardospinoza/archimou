import {StyleProp, TextStyle} from 'react-native';
import {MaskInputProps} from 'react-native-mask-input';
import {icons} from '../../assets/icons';
import {Icon} from '../Icon';
import {TextInput, InputContainer} from './styles';

interface InputProps extends MaskInputProps {
  value: string;
  placeholder: string;
  onChangeText: (value: string) => void;
  iconName: keyof typeof icons;
  iconSize?: number;
  inputStyle?: StyleProp<TextStyle>;
}

export const Input = ({
  value,
  onChangeText,
  iconName,
  placeholder,
  style,
  inputStyle,
  iconSize = 35,
  ...rest
}: InputProps) => {
  return (
    <InputContainer style={style}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={'#9f83b6'}
        style={inputStyle}
        {...rest}
      />
      <Icon name={iconName} color={'white'} size={iconSize} />
    </InputContainer>
  );
};
