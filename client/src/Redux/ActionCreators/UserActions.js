import { authenticate, signin, signup, updateProfile } from "../../Functions/user";
import { createMusicObject, executeAfterDelay, getToken, setToken } from "../../Functions/utility";
import { APP_CONTEXT, BACKGROUND_PATHS, ENDPOINTS, THEME_NAMES } from "../../Utils/constants";
import { applicationAlertActions } from "../Slices/ApplicationAlertSlice";
import { metaDataActions } from "../Slices/MetaDataSlice";
import { userActions } from "../Slices/UserSlice";

/// Action Creator Thunks that work with UserSlice data

export const authenticateJwt = (token, navigate) => {
  return async (dispatch) => {
    dispatch(
      metaDataActions.toggleLoading({ value: true })
    );

    try {

      const userData = await authenticate(token);

      dispatch(userActions.setUserData({
        username: userData.username,
        userId: userData.userId,
        role: userData.role,
        avatarURL: userData.avatarURL,
        activeGames: userData.activeGames,
        authenticated: true,
      }));

      const music = createMusicObject(THEME_NAMES.homeTheme, true);
      const track = music[THEME_NAMES.homeTheme].track;

      dispatch(metaDataActions.updateMetaData({
        pageLoading: false,
        background: BACKGROUND_PATHS.home,
        musicEnabled: true,
        music,
        playedTracks: [track]
      }));

      navigate(ENDPOINTS.home);
    }
    catch (error) {

      dispatch(applicationAlertActions.setApplicationAlert({
        message: error.message,
        type: 'failure',
        status: error.status,
        context: APP_CONTEXT.signin
      }))

      dispatch(metaDataActions.toggleLoading({ value: false }));
    }
  }
};

export const signinUser = (credentials, navigate) => {
  return async (dispatch) => {
    dispatch(
      metaDataActions.toggleLoading({ value: true })
    );

    try {
      const {username, userId, role, avatarURL, activeGames, jwt} = await signin(credentials);
      
      setToken(jwt);

      dispatch(userActions.setUserData({
        username,
        userId,
        role,
        avatarURL,
        activeGames,
        authenticated: true,
      }));

      const music = createMusicObject(THEME_NAMES.homeTheme);
      const track = music[THEME_NAMES.homeTheme].track;

      dispatch(metaDataActions.updateMetaData({
        pageLoading: false,
        background: BACKGROUND_PATHS.home,
        musicEnabled: true,
        music,
        playedTracks: [track]
      }));

      navigate(ENDPOINTS.home);
    }
    catch (error) {
      dispatch(applicationAlertActions.setApplicationAlert({
        type: 'failure',
        message: error.message,
        status: error.status,
        context: APP_CONTEXT.signin
      }));

      dispatch(metaDataActions.toggleLoading({ value: false }));
    }
  }
}

export const signupUser = (credentials, navigate) => {
  return async (dispatch) => {
    dispatch(
      metaDataActions.toggleLoading({ value: true })
    );

    try {

      const {username, userId, role, avatarURL, activeGames, jwt} = await signup(credentials);
      setToken(jwt);

      dispatch(userActions.setUserData({
        username,
        userId,
        role,
        avatarURL,
        activeGames,
        authenticated: true,
      }));

      const music = createMusicObject(THEME_NAMES.homeTheme, true);
      const track = music[THEME_NAMES.homeTheme].track;

      dispatch(metaDataActions.updateMetaData({
        pageLoading: false,
        background: BACKGROUND_PATHS.home,
        musicEnabled: true,
        music,
        playedTracks: [track]
      }));

      navigate(ENDPOINTS.home);
    }
    catch (error) {
      dispatch(applicationAlertActions.setApplicationAlert({
        type: 'failure',
        message: error.message,
        status: error.status,
        context: APP_CONTEXT.signup
      }));

      dispatch(metaDataActions.toggleLoading({ value: false }));
    }
  }
}

export const updateUserProfile = (userId, profileData, context) => {
  const MILLISECOND_DELAY = 3000;
  return async (dispatch) => {
    dispatch(
      metaDataActions.toggleLoading({ value: true })
    );

    try {
      const token = getToken();
      const updatedUserProfile = await updateProfile(userId, profileData, token);

      if (updatedUserProfile.jwt) {
        setToken(updatedUserProfile.jwt);
      }

      dispatch(userActions.updateUserProfile(updatedUserProfile));
      dispatch(metaDataActions.toggleLoading({ value: false }));
      dispatch(applicationAlertActions.setApplicationAlert({ message: "Update successful", context: context, type: 'success' }));
      executeAfterDelay(MILLISECOND_DELAY, applicationAlertActions.clearApplicationAlert, [], dispatch);
    }
    catch (error) {
      dispatch(metaDataActions.toggleLoading({ value: false }));
      dispatch(applicationAlertActions.setApplicationAlert({
        message: error.message,
        type: 'failure',
        status: error.status,
        context: context
      }));
     executeAfterDelay(MILLISECOND_DELAY, applicationAlertActions.clearApplicationAlert, [], dispatch);
    }
  }
}