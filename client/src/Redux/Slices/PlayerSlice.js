import { createSlice } from "@reduxjs/toolkit";

const initialState =
{
  resourceCards: [],
  playableDevCards: [],
  unplayableDevCards: [],
  startingNodes: [],
  armySize: 0,
  points: 0,
  color: null,
}

const playerSlice = createSlice(
  {
    name: 'player',
    initialState: initialState,
    reducers: {
      initializePlayerData(state, action) {
        return action.payload;
      },
      updatePlayerData(state, action) {
       return {...state, ...action.payload};
      },
      clearPlayerData() {
        return initialState;
      },
    }
  }
);

export const playerActions = playerSlice.actions;
export default playerSlice;