import { useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from "./Functions/utility";
import { authenticateJwt } from "./Redux/ActionCreators/UserActions";
import { ENDPOINTS } from "./Utils/data";
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
    <div className="w-screen h-screen bg-cover bg-center flex flex-col" style={{backgroundImage: `url(${metaData.background})`}}>

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
