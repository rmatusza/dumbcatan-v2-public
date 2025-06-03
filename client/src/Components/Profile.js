import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AVATARS, REQUEST_FIELDS, CUSTOM_STYLES } from "../Utils/data";
import { userActions } from "../Redux/Slices/UserSlice";
import { updateUserProfile } from "../Redux/ActionCreators/UserActions";
import Button from "../UI/Button";
import EditAvatar from "./EditAvatar";
import EditCredentials from "./EditCredentials";
import Cookies from "js-cookie";

const Profile = ({ setProfileModalActive }) => {
  const userData = useSelector(state => state.userData);
  const [view, setView] = useState('main');
  const dispatch = useDispatch();
  const S = CUSTOM_STYLES;

  const viewHandler = (selectedView) => {
    setView(selectedView);
  };

  const updateProfileHandler = async (profileData) => {
    const updatedProfileData = {
      userID: userData.userID,
      avatarURL: profileData?.avatarURL || REQUEST_FIELDS.none,
      username: profileData?.username || REQUEST_FIELDS.none,
      password: profileData?.password || REQUEST_FIELDS.none,
    }
    dispatch(updateUserProfile(updatedProfileData));
  };

  return (
    <div className="flex flex-col h-full">
      {
        view === 'main'
        &&
        <>
          <div className="flex flex-row justify-around items-center w-full m-5">
            <p className={`${S.modalTextYellow} underline`}>Avatar:</p>
            <img className="w-[150px] h-[150px]" src={AVATARS[userData.avatarURL]} />
          </div>
          <div className="flex flex-row justify-around items-center w-full m-5">
            <p className={`${S.modalTextYellow} underline`}>Username:</p>
            <div className="w-[150px] flex justify-center">
              <p className={S.modalTextYellow}>{userData.username}</p>
            </div>
          </div>
          <div className={`flex flex-row justify-between gap-4 mt-auto pb-5`}>
            <div className="flex-1">
              <Button name={"Close"} callBack={setProfileModalActive} args={[false]} namedStyles={[S.redAndYellowButtonSingle, S.goldYellowBorder]} namedStyleAsAddOn={true} />
            </div>
            <div className="flex-1">
              <Button name={"Change Avatar"} callBack={viewHandler} args={['avatar']} namedStyles={[S.classicCatanButtonSingle, S.lightRedBorder]} namedStyleAsAddOn={true}/>
            </div>
            <div className="flex-1">
              <Button name={"Change Credentials"} callBack={viewHandler} args={['credentials']} namedStyles={[S.classicCatanButtonSingle, S.lightRedBorder]} namedStyleAsAddOn={true}/>
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