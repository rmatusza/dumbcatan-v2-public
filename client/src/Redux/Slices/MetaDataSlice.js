import { createSlice } from "@reduxjs/toolkit";

const metaDataSlice = createSlice(
  {
    name: 'metaData',
    initialState: {
      pageLoading: false,
      soundEnabled: true,
      background: ""
    },
    reducers: {
      toggleLoading(state, action) {
       state.pageLoading = action.payload.value;
      },
      toggleSound(state) {
        state.soundEnabled = !state.soundEnabled;
      },
      setBackground(state, action) {
        state.background = action.payload.background;
      },
      updateMetaData(state, action) {
        return { ...state, ...action.payload };
      },
    }
  }
);

export const metaDataActions = metaDataSlice.actions;
export default metaDataSlice;