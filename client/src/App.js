import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { configureMusicSettings, getNextTrack, getToken, handleTrackEnd } from "./Functions/utility";
import { authenticateJwt } from "./Redux/ActionCreators/UserActions";
import { ENDPOINTS, THEME_NAMES, MUSIC_TRACKS } from "./Utils/data";
import { metaDataActions } from "./Redux/Slices/MetaDataSlice";
import ReactAudioPlayer from 'react-audio-player';
import Authentication from "./Pages/Authentication";
import Home from "./Pages/Home";
import Games from "./Pages/Games";
import Invites from "./Pages/Invites";
import About from "./Pages/About";
import Banner from "./Components/Banner";
import './App.css';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(state => state.userData);
  const metaData = useSelector(state => state.metaData);

  useEffect(() => {

    const token = getToken();

    if (token) {
      dispatch(authenticateJwt(token, navigate));
    }
    else {
      navigate(ENDPOINTS.authentication);
    }

  }, []);

  return (
    <div className="w-screen h-screen bg-cover bg-center flex flex-col" style={{ backgroundImage: `url(${metaData.background})` }}>

      {
        metaData.musicEnabled
        &&
        Object.keys(metaData.musicSettings).map((themeName, i) => {
          const source = metaData.musicSettings[themeName].track;
          const themeEnabled = metaData.musicSettings[themeName].enabled;

          if(source && themeEnabled) {
            return (
              <div style={{ visibility: 'hidden', height: 0 }}>
                <ReactAudioPlayer 
                  key={themeName} 
                  src={source} 
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
