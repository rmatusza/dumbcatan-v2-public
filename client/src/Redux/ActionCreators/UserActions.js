import { authenticate, signin, signup, updateProfile } from "../../Functions/user";
import { executeAfterDelay, getToken, setToken } from "../../Functions/utility";
import { APP_CONTEXT, BACKGROUNDS, ENDPOINTS } from "../../Utils/data";
import { applicationAlertActions } from "../Slices/ApplicationAlertSlice";
import { metaDataActions } from "../Slices/MetaDataSlice";
import { userActions } from "../Slices/UserSlice";

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

      dispatch(applicationAlertActions.setApplicationAlert({
        message: error.message,
        type: 'failure',
        status: error.status,
        context: APP_CONTEXT.signin
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
      dispatch(applicationAlertActions.setApplicationAlert({
        message: error.message,
        type: 'failure',
        status: error.status,
        context: APP_CONTEXT.signin
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
      dispatch(applicationAlertActions.setApplicationAlert({
        message: error.message,
        type: 'failure',
        status: error.status,
        context: APP_CONTEXT.signup
      }));

      dispatch(metaDataActions.toggleLoading({value: false}));
    }
  }
}

export const updateUserProfile = (profileData, context) => {
  const MILLISECOND_DELAY = 3000;
  return async (dispatch) => {
    dispatch(
      metaDataActions.toggleLoading({value: true})
    );

    try {
      const token = getToken();
      const updatedUserProfile = await updateProfile(profileData, token);

      if(updatedUserProfile.jwt) {
        setToken(updatedUserProfile.jwt);
      }

      dispatch(userActions.updateUserProfile(updatedUserProfile));
      dispatch(metaDataActions.toggleLoading({value: false}));
      dispatch(applicationAlertActions.setApplicationAlert({message: "Update successful", context: context, type: 'success'}));
      executeAfterDelay(
        {
          delay: MILLISECOND_DELAY,
          callback: applicationAlertActions.clearApplicationAlert,
          dispatch
        }
      );
    }
    catch(error) {
      dispatch(metaDataActions.toggleLoading({value: false}));
      dispatch(applicationAlertActions.setApplicationAlert({
        message: error.message,
        type: 'failure',
        status: error.status,
        context: context
      }));
      executeAfterDelay(
        {
          delay: MILLISECOND_DELAY,
          callback: applicationAlertActions.clearApplicationAlert,
          dispatch
        }
      )

    }
  }
}