import { useEffect } from "react";
import ReactAudioPlayer from 'react-audio-player';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import './App.css';
import Banner from "./Components/Banner";
import { getToken, handleTrackEnd } from "./Functions/utility";
import About from "./Pages/About";
import Authentication from "./Pages/Authentication";
import GameInstance from "./Pages/GameInstance";
import Games from "./Pages/Games";
import Home from "./Pages/Home";
import Invites from "./Pages/Invites";
import { authenticateJwt } from "./Redux/ActionCreators/UserActions";
import { ENDPOINTS } from "./Utils/constants";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(state => state.userData);
  const metaData = useSelector(state => state.metaData);

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

  return (
    <div className="w-screen h-screen bg-cover bg-center flex flex-col" style={{ backgroundImage: `url(${metaData.background})` }}>

      {
        metaData.musicEnabled
        &&
        Object.keys(metaData.music).map((themeName, i) => {
          const track = metaData.music[themeName].track;
          const themeEnabled = metaData.music[themeName].enabled;

          if(track && themeEnabled) {
            return (
              <div style={{ visibility: 'hidden', height: 0 }}>
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
        userData.authenticated
        &&
        <Banner />
      }

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
    </div>
  );
}

export default App;
