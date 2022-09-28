import {RootState} from './../../store/store';
import {useSelector} from 'react-redux';

export const useUser = () => {
  const user = useSelector((state: RootState) => state.user.user);
  return user;
};
