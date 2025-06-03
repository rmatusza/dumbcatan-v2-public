import { setToken, getToken } from "../../Functions/utility";
import { authenticate, signin, signup, updateProfile } from "../../Functions/user"
import { metaDataActions } from "../Slices/MetaDataSlice"
import { userActions } from "../Slices/UserSlice"
import { applicationErrorsActions } from "../Slices/ApplicationErrorsSlice"
import { ENDPOINTS, ERROR_CONTEXTS, BACKGROUNDS } from "../../Utils/data";

/// Action Creator Thunks that work with UserSlice data

export const authenticateJwt = (token, navigate) => {
  return async(dispatch) => {
    dispatch(
      metaDataActions.toggleLoading({value: true})
    );

    try {

      const userData = await authenticate(token);

      dispatch(userActions.setUserData({
        username: userData.username,
        userID: userData.userID,
        role: userData.role,
        avatarURL: userData.avatarURL,
        activeGames: userData.activeGames,
        authenticated: true,
      }));

      dispatch(metaDataActions.updateMetaData({
        pageLoading: false,
        background: BACKGROUNDS.home
      }));

      navigate(ENDPOINTS.home);
    }
    catch(error) {

      dispatch(applicationErrorsActions.setApplicationError({
        message: error.message,
        status: error.status,
        context: ERROR_CONTEXTS.signin
      }))

      dispatch(metaDataActions.toggleLoading({value: false}));
    }
  }
};

export const signinUser = (credentials, navigate) => {
  return async(dispatch) => {
    dispatch(
      metaDataActions.toggleLoading({value: true})
    );

    try {

      const responseData = await signin(credentials);

      const userData = responseData.userData;
      const token = responseData.token;

      setToken(token);

      dispatch(userActions.setUserData({
        username: userData.username,
        userID: userData.userID,
        role: userData.role,
        avatarURL: userData.avatarURL,
        activeGames: userData.activeGames,
        authenticated: true,
      }));

      dispatch(metaDataActions.updateMetaData({
        pageLoading: false,
        background: BACKGROUNDS.home
      }));

      navigate(ENDPOINTS.home);
    }
    catch(error) {
      dispatch(applicationErrorsActions.setApplicationError({
        message: error.message,
        status: error.status,
        context: ERROR_CONTEXTS.signin
      }))

      dispatch(metaDataActions.toggleLoading({value: false}));
    }
  }
}

export const signupUser = (credentials, navigate) => {
  return async(dispatch) => {
    dispatch(
      metaDataActions.toggleLoading({value: true})
    );

    try {

      const responseData = await signup(credentials);

      const userData = responseData.userData;
      const token = responseData.token;

      setToken(token);

      dispatch(userActions.setUserData({
        username: userData.username,
        userID: userData.userID,
        role: userData.role,
        avatarURL: userData.avatarURL,
        activeGames: userData.activeGames,
        authenticated: true,
      }));

      dispatch(metaDataActions.updateMetaData({
        pageLoading: false,
        background: BACKGROUNDS.home
      }));

      navigate(ENDPOINTS.home);
    }
    catch(error) {
      dispatch(applicationErrorsActions.setApplicationError({
        message: error.message,
        status: error.status,
        context: ERROR_CONTEXTS.signup
      }));

      dispatch(metaDataActions.toggleLoading({value: false}));
    }
  }
}

export const updateUserProfile = (profileData) => {
  return async (dispatch) => {
    dispatch(
      metaDataActions.toggleLoading({value: true})
    );

    try {

      const token = getToken();
      const updatedUserProfile = await updateProfile(profileData, token);

      dispatch(userActions.updateUserProfile(updatedUserProfile ));

      dispatch(metaDataActions.toggleLoading({value: false}));
    }
    catch(error) {
      dispatch(applicationErrorsActions.setApplicationError({
        message: error.message,
        status: error.status,
        context: ERROR_CONTEXTS.profile
      }));

      dispatch(metaDataActions.toggleLoading({value: false}));
    }
  }
}