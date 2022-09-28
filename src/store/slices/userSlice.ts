import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {PersonNode} from '../../models/TreeViewModel';

export interface UserState {
  user: PersonNode;
}

const initialState: UserState = {
  user: {},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser(state, {payload: user}) {
      state.user = user;
    },
    deleteUser(state) {
      state.user = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const {saveUser, deleteUser} = userSlice.actions;

export const userReducer = userSlice.reducer;
