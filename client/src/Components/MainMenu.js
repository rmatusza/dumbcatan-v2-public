import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BACKGROUNDS, ENDPOINTS } from '../Utils/data';
import { metaDataActions } from '../Redux/Slices/MetaDataSlice';
import { useLocation } from 'react-router-dom';
import Modal from "../UI/Modal";
import Profile from "./Profile";
import CreateGame from "./CreateGame";

const MainMenu = ({ userRole, setMainMenuOpen }) => {
  const metaData = useSelector(state => state.metaData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [profileModalActive, setProfileModalActive] = useState(false);
  const [createGameModalActive, setCreateGameModalActive] = useState(false);


  const handleMenuSelection = (e) => {
    switch (e.target.getAttribute("data-id")) {
      case 'home':
        setMainMenuOpen(false);
        navigate(ENDPOINTS.home);
        break;
      case 'profile':
        setMainMenuOpen(false);
        setProfileModalActive(true);
        break;
      case 'createGame':
        setMainMenuOpen(false);
        setCreateGameModalActive(true);
        break;
      case 'yourGames':
        setMainMenuOpen(false);
        navigate(ENDPOINTS.yourGames);
        break;
      case 'yourInvites':
        setMainMenuOpen(false);
        navigate(ENDPOINTS.yourInvites);
        break;
      case 'sound':
        dispatch(metaDataActions.toggleSound())
        break;
      case 'about':
        setMainMenuOpen(false);
        navigate(ENDPOINTS.about);
        break;
      default:
        break;
    }
  }

  return (
    <>
      <div className="p-4 font-yatra text-lg">
        <ul onClick={handleMenuSelection}>
          {
            location.pathname !== ENDPOINTS.home
            &&
            <li data-id="home" className="cursor-pointer hover:underline m-5">Home</li>
          }
          <li data-id="profile" className="cursor-pointer hover:underline m-5">Profile</li>
          <li data-id="createGame" className="cursor-pointer hover:underline m-5">Create Game</li>
          <li data-id="yourGames" className="cursor-pointer hover:underline m-5">Your Games</li>
          <li data-id="yourInvites" className="cursor-pointer hover:underline m-5">Your Invites</li>
          <li data-id="rules" className="cursor-pointer hover:underline m-5"><a href="https://www.catan.com/sites/default/files/2021-06/catan_base_rules_2020_200707.pdf" target="_blank" rel="noopener noreferrer">Official Rules</a></li>
          <li data-id="sound" className="cursor-pointer hover:underline m-5">{metaData.soundEnabled ? 'Disable' : 'Enable'} sound</li>
          <li data-id="about" className="cursor-pointer hover:underline m-5">About This App</li>
          {
            userRole === 'admin'
            &&
            <li className="cursor-pointer hover:underline m-5">Debug Menu</li>
          }
        </ul>
      </div>
      {
        profileModalActive
        &&
        <Modal background={BACKGROUNDS.stone}>
          <Profile setProfileModalActive={setProfileModalActive}/>
        </Modal>
      }
      {
        createGameModalActive
        &&
        <Modal styles={"bg-parchment"} background={BACKGROUNDS.stone}>
          <CreateGame setCreateGameModalActive={setCreateGameModalActive}/>
        </Modal>
      }
    </>
  )
}

export default MainMenu;