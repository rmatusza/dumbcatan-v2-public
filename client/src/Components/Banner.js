import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../Redux/Slices/UserSlice";
import { metaDataActions } from "../Redux/Slices/MetaDataSlice";
import { deleteToken } from "../Functions/utility";
import { useNavigate } from "react-router-dom";
import { ENDPOINTS, AVATAR_PATHS, ELEMENT_PATHS } from "../Utils/constants";
import MainMenu from "./MainMenu";
import Drawer from "../UI/Drawer";

const Banner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mainMenuOpen, setMainMenuOpen] = useState(false);
  const userData = useSelector(state => state.userData);


  const menuHandler = () => {
    setMainMenuOpen(() => !mainMenuOpen);
  }

  const signoutHandler = () => {
    deleteToken();
    dispatch(userActions.clearUserData());
    dispatch(metaDataActions.resetMetadata());
    navigate(ENDPOINTS.authentication);
  }

  return (
    <>
      <div className="w-full flex justify-between bg-parchment/70 text-black font-yatra text-xl pt-0 pb-0 shadow-md border-b-4 border-t-4">
        <div className="flex flex-col items-center justify-center w-[100px] ml-5">
          <img className="w-35 h-35 cursor-pointer" src={AVATAR_PATHS[userData.avatarURL]} onClick={menuHandler} />
          <p>{userData.username}</p>
        </div>
        <div className="flex flex-col w-[1000px] p-0 m-0">
          <img className="h-[175px] m-0 p-0" src={ELEMENT_PATHS.bannerLogo} />
        </div>
        <div className="flex flex-col mt-auto m-5">
          <a className="cursor-pointer hover:underline text-2xl" onClick={signoutHandler}>Sign Out</a>
        </div>
      </div>
      <Drawer
        drawerOpen={mainMenuOpen}
        setDrawerOpen={setMainMenuOpen}
      >
        <MainMenu userRole={userData.role} setMainMenuOpen={setMainMenuOpen} />
      </Drawer>
    </>
  )
}

export default Banner;