import {RootState} from './../../store/store';
import {useSelector} from 'react-redux';

export const useParentType = () => {
  const parentType = useSelector((state: RootState) => state.parentType.parentType);
  return parentType;
};
