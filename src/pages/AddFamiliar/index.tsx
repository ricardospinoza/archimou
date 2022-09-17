import {
  SelectButton,
  SelectText,
  Container,
  ContinueButton,
  ContinueText,
  Options,
} from './styles';

export const AddFamiliar = () => {
  return (
    <Container>
      <Options>
        <SelectButton>
          <SelectText>Pai/Mãe de Fulano</SelectText>
        </SelectButton>
        <SelectButton>
          <SelectText>Filho/Filha de Fulano</SelectText>
        </SelectButton>
        <SelectButton>
          <SelectText>Irmão/Irmã de Fulano</SelectText>
        </SelectButton>
        <SelectButton>
          <SelectText>Parceiro de Fulano</SelectText>
        </SelectButton>
      </Options>

      <ContinueButton>
        <ContinueText>Continuar</ContinueText>
      </ContinueButton>
    </Container>
  );
};
