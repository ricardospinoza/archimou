import {createSlice} from '@reduxjs/toolkit';
import {FamiliarTypes} from '../../models/TreeViewModel';

export interface ParentTypeState {
  parentType?: FamiliarTypes;
}


const initialState: ParentTypeState = {
    parentType: undefined,
  };
  
  export const parentTypeSlice = createSlice({
    name: 'parentType',
    initialState,
    reducers: {
      saveParentType(state, {payload: parentType}) {
        state.parentType = parentType;
      },
      deleteParentType(state) {
        state.parentType = undefined;
      },
    },
  });
  
  // Action creators are generated for each case reducer function
  export const {saveParentType, deleteParentType} = parentTypeSlice.actions;
  
  export const parentTypeReducer = parentTypeSlice.reducer;
  