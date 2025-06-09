import { createSlice } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";
import { BACKGROUNDS } from "../../Utils/data";

const initialState =
{
  pageLoading: false,
  musicEnabled: false,
  soundEffectsEnabled: false,
  playedTracks: [],
  musicSettings: {},
  background: BACKGROUNDS.authentication,
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
        const tracklist = action.payload.tracklist;
        const updatedMusicSettings = action.payload.updatedMusicSettings;
        const nextTrack = action.payload.nextTrack;

        const resetTracks = state.playedTracks.filter(track => !tracklist.includes(track)).push(nextTrack);

        state.playedTracks = resetTracks;
        state.musicSettings = {...state.musicSettings, ...updatedMusicSettings}
      },
      updateMusicSettings(state, action) {
        const updatedMusicSettings = action.payload;
        const themes = Object.keys(updatedMusicSettings);
        let updatedTracks = cloneDeep(state.playedTracks);

        themes.forEach(theme => {
          let track = updatedMusicSettings[theme].track;

          if(!updatedTracks.includes(track)){
            updatedTracks.push(track);
          }
        });

        state.musicSettings = {...state.musicSettings, ...updatedMusicSettings};
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
    }
  }
);

export const metaDataActions = metaDataSlice.actions;
export default metaDataSlice;