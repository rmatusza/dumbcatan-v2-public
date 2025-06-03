import { useState } from "react";
import { useSelector } from "react-redux";
import Signin from "../Components/Signin";
import Signup from "../Components/Signup";
import GlassCard from "../UI/GlassCard";

const Authentication = () => {
  const [displaySignin, setDisplaySignin] = useState(true);
  const [displaySignup, setDisplaySignup] = useState(false);
  const metaData = useSelector(state => state.metaData);
  const axeSpinner = require.context("../../public/Media/Images/Other");

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
          src="/Media/Video/catan.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      </div>

      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <GlassCard styles={"w-[800px] min-h-[400px] flex flex-col bg-cream/60 backdrop-blur-md rounded-lg shadow-lg p-8"}>
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
            <img className="w-full h-full" src={axeSpinner('./axe_spinner.png')} />
          </div>
        }
      </div>
    </>
  )
}

export default Authentication;