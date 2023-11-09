import { StackActions, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FamiliarTypes } from '../../models/TreeViewModel';
import { saveParentType } from '../../store/slices';
import { Container, Continue, Option, Options } from './styles';

interface AddFamiliarProps {
  route: any;
}

export const AddFamiliar = ({route}: AddFamiliarProps) => {
  const [relationType, setRelationType] = useState<FamiliarTypes>();

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const node = route.params?.node;
  const needResponse = route.params?.response;

  const handleSelectFamiliarType = (familiarType: FamiliarTypes) => () => {
    setRelationType(familiarType);
  };

  const handleContinue = () => {
    
    if (!!needResponse) {
      dispatch(saveParentType(relationType));
      navigation.dispatch(StackActions.pop());
    } else {
      //TODO: think a way to find if it's already on platform for just add, otherwise keep moving to register
      navigation.navigate('FamiliarRegister', {
        node,
        relationType,
      });
    }

  };

  return (
    <Container>
      <Options>
        <Option
          label={`Pai/Mãe de ${node.name}`}
          onPress={handleSelectFamiliarType('Parent')}
          selected={relationType === 'Parent'}
        />
        <Option
          label={`Filho/Filha de ${node.name}`}
          onPress={handleSelectFamiliarType('Children')}
          selected={relationType === 'Children'}
        />
        <Option
          label={`Irmão/Irmã de ${node.name}`}
          onPress={handleSelectFamiliarType('Sibling')}
          selected={relationType === 'Sibling'}
        />
        <Option
          label={`Parceiro(a) de ${node.name}`}
          onPress={handleSelectFamiliarType('Partner')}
          selected={relationType === 'Partner'}
        />
      </Options>

      <Continue label={'Continuar'} onPress={handleContinue} />
    </Container>
  );
};
