import { useState } from "react";
import { AVATARS, CUSTOM_STYLES } from "../Utils/data";
import { useSelector } from "react-redux";
import { ERROR_CONTEXTS } from "../Utils/data";
import Button from "../UI/Button";

const EditAvatar = ({ S, currentAvatar, viewHandler, setProfileModalActive, updateProfileHandler }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [error, setError] = useState(null);
  const appError = useSelector(state => state.applicationErrors);

  const selectionHandler = (avatar) => {
    setSelectedAvatar(avatar);
  }

  const updateAvatarHandler = () => {
    if (!selectedAvatar) {
      setError("Select an avatar");
      return;
    }

    updateProfileHandler(
      {
        avatarURL: selectedAvatar
      }
    );
  }

  return (
    <>
      {
        appError.context === ERROR_CONTEXTS.profile
        &&
        <div className='rounded-xl bg-cream/60 mb-5'>
          <p className={`${S.largeErrorMessage} text-center`}>{appError.message}</p>
        </div>
      }
      {
        error
        &&
        <div className='rounded-xl bg-cream/60 mb-5'>
          <p className={`${S.largeErrorMessage} text-center`}> {error} </p>
        </div>
      }
      <div className="flex flex-row flex-wrap gap-4 justify-center my-4">
        {
          Object.keys(AVATARS).map((avatar, idx) => {
            if (avatar !== currentAvatar) {
              return (
                <div className={`inline-block rounded-full p-1 transition-all duration-200 cursor-pointer ${selectedAvatar === avatar ? "bg-goldYellow" : "bg-transparent"}`}>
                  <img key={idx} className="h-[150px] w-[150px] m-0 p-0" src={AVATARS[avatar]} onClick={() => selectionHandler(avatar)} />
                </div>
              )
            }
          })
        }
      </div>
      <div className="flex flex-row justify-between gap-4 mt-auto pb-5">
        <Button name={"Close"} callBack={setProfileModalActive} args={[false]} namedStyles={[S.redAndYellowButtonSingle, S.goldYellowBorder]} namedStyleAsAddOn={true} />
        <Button name={"Back"} callBack={viewHandler} args={['main']} namedStyles={[S.classicCatanButtonSingle, S.lightRedBorder]} namedStyleAsAddOn={true} />
        <Button name={"Change Avatar"} callBack={updateAvatarHandler} namedStyles={[S.classicCatanButtonSingle, S.lightRedBorder]} namedStyleAsAddOn={true} />
      </div>
    </>
  )
}

export default EditAvatar;  