import {TextInputBase} from 'react-native';
import {Icon} from '../Icon';
import {TextInput, InputContainer} from './styles';

interface InputProps {
  value: string;
  onChange: (value: string) => void;
}

export const Input = ({value, onChange}: InputProps) => {
  return (
    <InputContainer>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder="Nome*"
        placeholderTextColor={'#9f83b6'}
      />
      <Icon name="person" color={'white'} size={40} />
    </InputContainer>
  );
};
