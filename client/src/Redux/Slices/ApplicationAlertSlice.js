import { createSlice } from "@reduxjs/toolkit";

const initialState =
{
  message: null,
  status: null,
  type: null,
  context: null,
  alertAsPopup: false
}

const applicationAlertSlice = createSlice(
  {
    name: 'applicationAlert',
    initialState: initialState,
    reducers: {
      setApplicationAlert(state, action) {
        return { ...state, ...action.payload };
      },
      clearApplicationAlert(state) {
        return initialState;
      }
    }
  }
);

export const applicationAlertActions = applicationAlertSlice.actions;
export default applicationAlertSlice;