import {useRoute} from '@react-navigation/native';
import {useState} from 'react';
import {FamiliarTypes} from '../../models/TreeViewModel';
import {
  SelectButton,
  SelectText,
  Container,
  ContinueButton,
  ContinueText,
  Options,
} from './styles';

export const AddFamiliar = () => {
  const [familiarType, setFamiliarType] = useState<FamiliarTypes>();

  const {
    params: {node},
  } = useRoute();

  const handleSelectFamiliarType = (familiarType: FamiliarTypes) => () => {
    setFamiliarType(familiarType);
  };

  const handleContinue = () => {};

  return (
    <Container>
      <Options>
        <SelectButton
          onPress={handleSelectFamiliarType('Parent')}
          selected={familiarType === 'Parent'}>
          <SelectText>Pai/Mãe de {node.name}</SelectText>
        </SelectButton>
        <SelectButton
          onPress={handleSelectFamiliarType('Children')}
          selected={familiarType === 'Children'}>
          <SelectText>Filho/Filha de {node.name}</SelectText>
        </SelectButton>
        <SelectButton
          onPress={handleSelectFamiliarType('Sibling')}
          selected={familiarType === 'Sibling'}>
          <SelectText>Irmão/Irmã de {node.name}</SelectText>
        </SelectButton>
        <SelectButton
          onPress={handleSelectFamiliarType('Partner')}
          selected={familiarType === 'Partner'}>
          <SelectText>Parceiro(a) de {node.name}</SelectText>
        </SelectButton>
      </Options>

      <ContinueButton onPress={handleContinue}>
        <ContinueText>Continuar</ContinueText>
      </ContinueButton>
    </Container>
  );
};
