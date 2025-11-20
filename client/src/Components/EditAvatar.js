import { useState } from "react";
import { useSelector } from "react-redux";
import Button from "../UI/Button";
import { APP_ALERT_TYPE, APP_CONTEXT, AVATAR_PATHS } from "../Utils/constants";

const EditAvatar = ({ S, currentAvatar, viewHandler, setProfileModalActive, updateProfileHandler }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [error, setError] = useState(null);
  const appAlert = useSelector(state => state.applicationAlert);

  const selectionHandler = (avatar) => {
    setSelectedAvatar(avatar);
  }

  const updateAvatarHandler = () => {
    if (!selectedAvatar) {
      setError("Select an avatar");
      return;
    }

    if(error) {
      setError(null);
    }

    updateProfileHandler(
      {
        avatarURL: selectedAvatar
      }
    );

    setSelectedAvatar(null);
  }

  return (
    <>
      {
        appAlert.context === APP_CONTEXT.editAvatar
        &&
        <div className='rounded-xl bg-cream/60 mb-5'>
          <p className={`${appAlert.type === APP_ALERT_TYPE.success ? S.text.largeSuccessMessage : S.text.largeErrorMessage} text-center`}>{appAlert.message}</p>
        </div>
      }
      {
        error
        &&
        <div className='rounded-xl bg-cream/60 mb-5'>
          <p className={`${S.text.largeErrorMessage} text-center`}> {error} </p>
        </div>
      }
      <div className="flex flex-row flex-wrap gap-4 justify-center my-4">
        {
          Object.keys(AVATAR_PATHS).map((avatar, idx) => {
            if (avatar !== currentAvatar) {
              return (
                <div className={`inline-block rounded-full p-1 transition-all duration-200 cursor-pointer ${selectedAvatar === avatar ? "bg-goldYellow" : "bg-transparent"}`}>
                  <img key={idx} className="h-[150px] w-[150px] m-0 p-0" src={AVATAR_PATHS[avatar]} onClick={() => selectionHandler(avatar)} />
                </div>
              )
            }
          })
        }
      </div>
      <div className="flex flex-row justify-between gap-4 mt-auto pb-5">
        <Button name={"Close"} callBack={setProfileModalActive} args={[false]} namedStyles={[S.button.redAndYellowButtonSingle, S.border.goldYellowBorder]} />
        <Button name={"Back"} callBack={viewHandler} args={['main']} namedStyles={[S.button.classicCatanButtonSingle, S.border.lightRedBorder]} />
        <Button name={"Change Avatar"} callBack={updateAvatarHandler} namedStyles={[S.button.classicCatanButtonSingle, S.border.lightRedBorder]} />
      </div>
    </>
  )
}

export default EditAvatar;  