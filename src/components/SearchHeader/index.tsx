import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {Icon} from '../Icon';
import {BackButton, Header, SearchInput} from './styles';

interface SearchHeaderProps {
  onChangeSearchTerm: (searchTerm: string) => void;
}

export const SearchHeader = ({onChangeSearchTerm}: SearchHeaderProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const navigation = useNavigation();

  const back = () => {
    navigation.goBack();
  };

  const handleChangeText = (value: string) => {
    setSearchTerm(value);
    onChangeSearchTerm(value);
  };

  return (
    <Header>
      <BackButton onPress={back}>
        <Icon name="arrowBack" size={30} color="" />
      </BackButton>
      <SearchInput
        iconName="searchPurple"
        value={searchTerm}
        onChangeText={handleChangeText}
      />
    </Header>
  );
};
