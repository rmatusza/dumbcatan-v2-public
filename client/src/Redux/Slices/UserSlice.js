import { createSlice } from "@reduxjs/toolkit";

const initialState =
{
  username: null,
  userID: null,
  role: null,
  avatarURL: null,
  activeGames: null,
  authenticated: false,
}

const userSlice = createSlice(
  {
    name: 'user',
    initialState: initialState,
    reducers: {
      
      setUserData(state, action) {
        const newState = action.payload;
        newState.authenticated = true;
        return newState;
      },
      updateUserProfile(state, action) {
        let newUsername = action.payload.username;
        let newAvatar = action.payload.avatarURL;
        
        state.username = newUsername || state.username;
        state.avatarURL = newAvatar || state.avatarURL
      },
      clearUserData() {
        return initialState;
      },
    }
  }
);

export const userActions = userSlice.actions;
export default userSlice;