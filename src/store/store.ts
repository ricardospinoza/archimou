import { configureStore } from '@reduxjs/toolkit';
import { parentTypeReducer } from './slices/parentTypeSlice';
import { userReducer } from './slices/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    parentType: parentTypeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
