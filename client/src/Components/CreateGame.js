import { useState } from "react";
import { ENDPOINTS, CUSTOM_STYLES as S, APP_CONTEXT, BACKGROUND_PATHS, APP_ALERT_TYPE } from "../Utils/constants";
import { createNewGameData } from "../Functions/game";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { executeAfterDelay, getCurrentContext, getToken } from "../Functions/utility";
import { createNewGame } from "../Redux/ActionCreators/GameActions";
import { useLocation } from "react-router-dom";
import ColorPicker from "../UI/ColorPicker";
import Button from "../UI/Button";
import PopupMessage from "../UI/PopupMessage";

const CreateGame = ({ setCreateGameModalActive }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const userData = useSelector(state => state.userData);
  const appAlert = useSelector(state => state.applicationAlert);
  const [selectedColor, setSelectedColor] = useState(null);
  const [noColorSelected, setNoColorSelected] = useState(false);

  const createGameHandler = () => {
    if (!selectedColor) {
      setNoColorSelected(true);
      executeAfterDelay(2000, setNoColorSelected, [false]);
      return;
    }
    dispatch(createNewGame(navigate, createNewGameData(), getToken(), userData.username, userData.userId, selectedColor));
    setCreateGameModalActive(false);
  }

  return (
    <div className="flex flex-col h-full">
      <p className={`${S.text.modalTextYellow} text-center ${noColorSelected ? 'animate-shake' : ''}`}>Select Your Color</p>

      <ColorPicker selectedColor={selectedColor} setSelectedColor={setSelectedColor}/>

      <div className="flex flex-row justify-between gap-4 mt-auto pb-5">
        <Button name={"Close"} callBack={setCreateGameModalActive} args={[false]} namedStyles={[S.button.redAndYellowButtonSingle, S.border.goldYellowBorder]} />
        <Button name={"Create Game"} callBack={createGameHandler} namedStyles={[S.button.classicCatanButtonSingle, S.border.lightRedBorder]} />
      </div>

    </div>
  )
}

export default CreateGame;