import { createSlice } from "@reduxjs/toolkit";

const initialState =
{
  message: null,
  status: null,
  type: null,
  context: null,
}

const applicationAlertSlice = createSlice(
  {
    name: 'applicationAlert',
    initialState: initialState,
    reducers: {
      setApplicationAlert(state, action) {
        state.message = action.payload.message
        state.status = action.payload.status
        state.type = action.payload.type
        state.context = action.payload.context
      },
      clearApplicationAlert(state) {
        return initialState;
      }
    }
  }
);

export const applicationAlertActions = applicationAlertSlice.actions;
export default applicationAlertSlice;