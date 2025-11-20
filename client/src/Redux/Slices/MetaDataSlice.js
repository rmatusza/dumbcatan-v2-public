import { createSlice } from "@reduxjs/toolkit";
import { BACKGROUND_PATHS } from "../../Utils/constants";

const initialState =
{
  pageLoading: false,
  musicEnabled: false,
  soundEffectsEnabled: false,
  playedTracks: [],
  music: {},
  background: BACKGROUND_PATHS.none,
  gameInstancePageMessageAlreadyDisplayed: false
}

const metaDataSlice = createSlice(
  {
    name: 'metaData',
    initialState,
    reducers: {
      toggleLoading(state, action) {
        state.pageLoading = action.payload.value;
      },
      toggleMusic(state) {
        state.musicEnabled = !state.musicEnabled;
      },
      toggleSoundEffects(state) {
        state.soundEffectsEnabled = !state.soundEffectsEnabled;
      },
      setBackground(state, action) {
        state.background = action.payload.background;
      },
      updatePlayedTracks(state, action) {
        action.payload.tracks.forEach(track => {
          if(!state.playedTracks.includes(track)){
            state.playedTracks.push(track);
          }
        })
      },
      loopTracklist(state, action) {
        const {tracklist, musicObject, nextTrack} = action.payload;

        // removing every track from the tracklist that is being looped from playedTracks array, and then adding the new current track to playedTracks
        const resetTracks = state.playedTracks.filter(track => !tracklist.includes(track)).push(nextTrack);

        state.playedTracks = resetTracks;
        state.music = {...state.music, ...musicObject}
      },
      updateMusic(state, action) {
        const musicObject = action.payload;
        const themes = Object.keys(musicObject);
        let updatedTracks = [...state.playedTracks];

        themes.forEach(theme => {
          let track = musicObject[theme].track;

          if(!updatedTracks.includes(track)){
            updatedTracks.push(track);
          }
        });

        state.music = {...state.music, ...musicObject};
        state.playedTracks = updatedTracks;
      },
      clearPlayedTracks(state) {
        state.playedTracks = [];
      },
      resetMetadata(state) {
        return initialState;
      },
      updateMetaData(state, action) {
        return { ...state, ...action.payload };
      },
      setGameInstancePageMessageAlreadyDisplayed(state, action) {
        state.gameInstancePageMessageAlreadyDisplayed = true;
      }
    }
  }
);

export const metaDataActions = metaDataSlice.actions;
export default metaDataSlice;