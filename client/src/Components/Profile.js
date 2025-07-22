import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../Redux/ActionCreators/UserActions";
import { APP_CONTEXT, AVATAR_PATHS, REQUEST_FIELDS, CUSTOM_STYLES as S } from "../Utils/constants";
import Button from "../UI/Button";
import EditAvatar from "./EditAvatar";
import EditCredentials from "./EditCredentials";

const Profile = ({ setProfileModalActive }) => {
  const userData = useSelector(state => state.userData);
  const [view, setView] = useState('main');
  const dispatch = useDispatch();

  const viewHandler = (selectedView) => {
    setView(selectedView);
  };

  const updateProfileHandler = async (profileData) => {
    const context = profileData?.avatarURL ? APP_CONTEXT.editAvatar : APP_CONTEXT.credentials
    const updatedProfileData = {
      avatarURL: profileData?.avatarURL || REQUEST_FIELDS.none,
      username: profileData?.username || REQUEST_FIELDS.none,
      password: profileData?.password || REQUEST_FIELDS.none,
    }
    dispatch(updateUserProfile(userData.userId, updatedProfileData, context));
  };

  return (
    <div className="flex flex-col h-full">
      {
        view === 'main'
        &&
        <>
          <div className="flex flex-row justify-around items-center w-full m-5">
            <p className={`${S.text.modalTextYellow} underline`}>Avatar:</p>
            <img className="w-[150px] h-[150px]" src={AVATAR_PATHS[userData.avatarURL]} />
          </div>
          <div className="flex flex-row justify-around items-center w-full m-5">
            <p className={`${S.text.modalTextYellow} underline`}>Username:</p>
            <div className="w-[150px] flex justify-center">
              <p className={S.text.modalTextYellow}>{userData.username}</p>
            </div>
          </div>
          <div className={`flex flex-row justify-between gap-4 mt-auto pb-5`}>
            <div className="flex-1">
              <Button name={"Close"} callBack={setProfileModalActive} args={[false]} namedStyles={[S.button.redAndYellowButtonSingle, S.border.goldYellowBorder]} />
            </div>
            <div className="flex-1">
              <Button name={"Change Avatar"} callBack={viewHandler} args={['avatar']} namedStyles={[S.button.classicCatanButtonSingle, S.border.lightRedBorder]} />
            </div>
            <div className="flex-1">
              <Button name={"Change Credentials"} callBack={viewHandler} args={['credentials']} namedStyles={[S.button.classicCatanButtonSingle, S.border.lightRedBorder]} />
            </div>
          </div>
        </>
      }
      {
        view === 'avatar'
        &&
        <EditAvatar S={S} currentAvatar={userData.avatarURL} viewHandler={viewHandler} setProfileModalActive={setProfileModalActive} updateProfileHandler={updateProfileHandler} />
      }
      {
        view === 'credentials'
        &&
        <EditCredentials S={S} viewHandler={viewHandler} setProfileModalActive={setProfileModalActive} updateProfileHandler={updateProfileHandler}/>
      }
    </div>
  )
}

export default Profile;