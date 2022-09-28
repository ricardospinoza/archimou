import {useNavigation, useRoute} from '@react-navigation/native';
import {useState} from 'react';
import {useUser} from '../../hooks';
import {FamiliarTypes} from '../../models/TreeViewModel';
import {Container, Options, Continue, Option} from './styles';

export const AddFamiliar = () => {
  const [relationType, setRelationType] = useState<FamiliarTypes>();

  const navigation = useNavigation();

  const node = useUser();

  const handleSelectFamiliarType = (familiarType: FamiliarTypes) => () => {
    setRelationType(familiarType);
  };

  const handleContinue = () => {
    //TODO: think a way to find if it's already on platform for just add, otherwise keep moving to register
    navigation.navigate('FamiliarRegister', {
      node,
      relationType,
    });
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
