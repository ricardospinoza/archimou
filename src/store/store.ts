import {userReducer} from './slices/userSlice';
import {parentTypeReducer} from './slices/parentTypeSlice';
import {configureStore} from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    user: userReducer,
    parentType: parentTypeReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
