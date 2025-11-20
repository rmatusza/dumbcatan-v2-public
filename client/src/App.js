import { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { dispatchErrorAppAlert, getToken, handleTrackEnd } from "./Functions/utility";
import { authenticateJwt } from "./Redux/ActionCreators/UserActions";
import { ENDPOINTS, BACKGROUND_PATHS } from "./Utils/constants";
import { applicationAlertActions } from "./Redux/Slices/ApplicationAlertSlice";
import { WebsocketProvider } from "./Context/WebsocketProvider";
import Banner from "./Components/Banner";
import About from "./Pages/About";
import Authentication from "./Pages/Authentication";
import GameInstance from "./Pages/GameInstance";
import Games from "./Pages/Games";
import Home from "./Pages/Home";
import Invites from "./Pages/Invites";
import ReactAudioPlayer from 'react-audio-player';
import PopupMessage from "./UI/PopupMessage";
import './App.css';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(state => state.userData);
  const metaData = useSelector(state => state.metaData);
  const appAlert = useSelector(state => state.applicationAlert);

  useEffect(() => {
    const token = getToken();

    if (token && token !== 'undefined') {
      dispatch(authenticateJwt(token, navigate));
    }
    else {
      navigate(ENDPOINTS.authentication);
    }

  }, []);

  // const handleKeyDown = (e) => {
  //   if(e.key === '`') {
  //     handleTrackEnd(THEME_NAMES.homeTheme);
  //   }
  // }

  // useEffect(() => {
  //   window.addEventListener('keydown', handleKeyDown);

  //   return () => window.removeEventListener('keydown', handleKeyDown)
  // }, [metaData])

  // NOTE: backgroundSize and position in style object are redundant i believe - already handled in class name
  return (
    <div
      className={`relative w-screen overflow-auto flex flex-col ${
        metaData.background === BACKGROUND_PATHS.medTable ? 'bg-no-repeat min-h-screen' : 'bg-cover bg-center h-screen'
      }`}
      style={{
        backgroundImage: `url(${metaData.background})`,
        ...(metaData.background === BACKGROUND_PATHS.medTable
          ? {
              backgroundSize: 'cover',      // single image, no tiling
              backgroundPosition: 'center', // or 'top center'
              // backgroundAttachment: 'scroll', // default; keep it scrolling with content
            }
          : {}),
      }}
    >
      {
        metaData.musicEnabled
        &&
        Object.keys(metaData.music).map((themeName, i) => {
          const track = metaData.music[themeName].track;
          const themeEnabled = metaData.music[themeName].enabled;

          if(track && themeEnabled) {
            return (
              <div key={i} style={{ visibility: 'hidden', height: 0 }}>
                <ReactAudioPlayer 
                  key={themeName} 
                  src={track} 
                  autoPlay={true} 
                  controls
                  onEnded={() => handleTrackEnd(themeName, metaData, dispatch)}
                />
              </div>
            )
          }
        })
      }

      {
        appAlert.message && appAlert.alertAsPopup
        &&
        <PopupMessage background={BACKGROUND_PATHS.stone} lines={typeof appAlert.message === 'string' ? [appAlert.message] : appAlert.message} closePopup={() => dispatch(applicationAlertActions.clearApplicationAlert())}/>
      }

      {
        userData.authenticated
        &&
        <Banner />
      }

      <WebsocketProvider token={getToken()} username={userData.username}>

        <Routes>

          <Route path={ENDPOINTS.authentication}
            element=
            {
              <Authentication />
            }
          />

          <Route path={ENDPOINTS.home}
            element=
            {
              <Home />
            }
          />

          <Route path={ENDPOINTS.yourGames}
            element=
            {
              <Games />
            }
          />

          <Route path={`${ENDPOINTS.gameInstance}/:id`}
            element=
            {
              <GameInstance />
            }
          />

          <Route path={ENDPOINTS.yourInvites}
            element=
            {
              <Invites />
            }
          />

          <Route path={ENDPOINTS.about}
            element=
            {
              <About />
            }
          />

          <Route path="/*"
            element=
            {
              <Navigate to={ENDPOINTS.authentication} />
            }
          />

        </Routes>

      </WebsocketProvider>
    </div>
  );
}

export default App;
