import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BACKGROUND_PATHS, ENDPOINTS } from '../Utils/constants';
import { metaDataActions } from '../Redux/Slices/MetaDataSlice';
import { useLocation } from 'react-router-dom';
import { USE_TEST_DATA } from '../Utils/settings';
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
        dispatch(metaDataActions.setBackground({background: BACKGROUND_PATHS.home}));
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
        if(USE_TEST_DATA) {
          navigate("/game/1");
        }
        else {
          navigate(ENDPOINTS.yourGames);
        }
        break;
      case 'yourInvites':
        setMainMenuOpen(false);
        navigate(ENDPOINTS.yourInvites);
        break;
      case 'music':
        dispatch(metaDataActions.toggleMusic());
        break;
      case 'soundEffects':
        dispatch(metaDataActions.toggleSoundEffects());
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
          <li data-id="about" className="cursor-pointer hover:underline m-5">About This App</li>
          {
            location.pathname !== ENDPOINTS.home
            &&
            <li data-id="home" className="cursor-pointer hover:underline m-5">Home</li>
          }
          <li data-id="profile" className="cursor-pointer hover:underline m-5">Profile</li>
          <li data-id="createGame" className="cursor-pointer hover:underline m-5">Create Game</li>
          {
            location.pathname !== ENDPOINTS.yourGames
            &&
            <li data-id="yourGames" className="cursor-pointer hover:underline m-5">Your Games</li>
          }
          {
            location.pathname !== ENDPOINTS.yourInvites
            &&
            <li data-id="yourInvites" className="cursor-pointer hover:underline m-5">Your Invites</li>
          }
          <li data-id="rules" className="cursor-pointer hover:underline m-5"><a href="https://www.catan.com/sites/default/files/2021-06/catan_base_rules_2020_200707.pdf" target="_blank" rel="noopener noreferrer">Official Rules</a></li>
          <li data-id="music" className="cursor-pointer hover:underline m-5">{metaData.musicEnabled ? 'Disable' : 'Enable'} music</li>
          <li data-id="soundEffects" className="cursor-pointer hover:underline m-5">{metaData.soundEffectsEnabled ? 'Disable' : 'Enable'} sound effects</li>
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
        <Modal background={BACKGROUND_PATHS.stone}>
          <Profile setProfileModalActive={setProfileModalActive}/>
        </Modal>
      }
      {
        createGameModalActive
        &&
        <Modal background={BACKGROUND_PATHS.stone}>
          <CreateGame setCreateGameModalActive={setCreateGameModalActive}/>
        </Modal>
      }
    </>
  )
}

export default MainMenu;