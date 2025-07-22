import { useState } from "react";
import { useSelector } from "react-redux";
import { ELEMENT_PATHS, BACKGROUND_PATHS } from "../Utils/constants";
import Signin from "../Components/Signin";
import Signup from "../Components/Signup";
import GlassCard from "../UI/GlassCard";

const Authentication = () => {
  const [displaySignin, setDisplaySignin] = useState(true);
  const [displaySignup, setDisplaySignup] = useState(false);
  const metaData = useSelector(state => state.metaData);

  const switchFormDisplay = (form) => {
    if (form === 'signup') {
      setDisplaySignin(false);
      setDisplaySignup(true);
      return;
    }

    setDisplaySignin(true);
    setDisplaySignup(false);
  }

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full z-[-1] overflow-hidden">
        <video
          className="w-full h-full object-cover"
          src={BACKGROUND_PATHS.authentication}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      </div>

      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <GlassCard>
          {
            displaySignin
            &&
            <>
              <Signin />
              <div className="mt-8">
                <p className="text-center text-lg text-black-500">Don't have an account yet? <a className="cursor-pointer hover:underline text-blue-600 font-bold" onClick={() => switchFormDisplay('signup')}>sign up here</a></p>
              </div>
            </>
          }
          {
            displaySignup
            &&
            <>
              <Signup />
              <div className="mt-8">
                <p className="text-center text-lg text-black-500">Already have an account? <a className="cursor-pointer hover:underline text-blue-600 font-bold" onClick={() => switchFormDisplay('signin')}>sign in here</a></p>
              </div>
            </>
          }
        </GlassCard>
        {
          metaData.pageLoading
          &&
          <div className="animate-spin w-20 h-25">
            <img className="w-full h-full" src={ELEMENT_PATHS.axeSpinner} />
          </div>
        }
      </div>
    </>
  )
}

export default Authentication;