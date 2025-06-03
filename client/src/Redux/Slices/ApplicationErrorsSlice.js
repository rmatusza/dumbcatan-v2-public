import { createSlice } from "@reduxjs/toolkit";

const applicationErrorsSlice = createSlice(
  {
    name: 'applicationErrors',
    initialState: {
      message: null,
      status: null,
      context: null,
    },
    reducers: {
      setApplicationError(state, action) {
        state.message = action.payload.message
        state.status = action.payload.status
        state.context = action.payload.context
      }
    }
  }
);

export const applicationErrorsActions = applicationErrorsSlice.actions;
export default applicationErrorsSlice;