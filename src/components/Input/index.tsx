import {MaskInputProps} from 'react-native-mask-input';
import {icons} from '../../assets/icons';
import {Icon} from '../Icon';
import {TextInput, InputContainer} from './styles';

interface InputProps extends MaskInputProps {
  value: string;
  placeholder: string;
  onChangeText: (value: string) => void;
  iconName: keyof typeof icons;
}

export const Input = ({
  value,
  onChangeText,
  iconName,
  placeholder,
  ...rest
}: InputProps) => {
  return (
    <InputContainer>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={'#9f83b6'}
        {...rest}
      />
      <Icon name={iconName} color={'white'} size={35} />
    </InputContainer>
  );
};
