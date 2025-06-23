import { useState } from "react";
import { ENDPOINTS, CUSTOM_STYLES as S } from "../Utils/constants";
import { createNewGameData } from "../Functions/game";
import { useDispatch } from "react-redux";
import { gameSliceActions } from "../Redux/Slices/GameSlice";
import { useNavigate } from "react-router-dom";
import ColorPicker from "../UI/ColorPicker";
import Button from "../UI/Button";
import { executeAfterDelay } from "../Functions/utility";

const CreateGame = ({ setCreateGameModalActive }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedColor, setSelectedColor] = useState(null);
  const [noColorSelected, setNoColorSelected] = useState(false);

  const createGameHandler = () => {
    if (!selectedColor) {
      setNoColorSelected(true);
      executeAfterDelay({
        delay: 2000,
        callback: setNoColorSelected,
        args: [false]
      });
      return;
    }

    const newGameData = createNewGameData();
    dispatch(gameSliceActions.initializeGameData(newGameData));
    navigate(`${ENDPOINTS.gameInstance}/1`);
    setCreateGameModalActive(false);
  }

  return (
    <div className="flex flex-col h-full">
      <p className={`${S.text.modalTextYellow} text-center ${noColorSelected ? 'animate-shake' : ''}`}>Select Your Color</p>

      <ColorPicker selectedColor={selectedColor} setSelectedColor={setSelectedColor}/>

      <div className="flex flex-row justify-between gap-4 mt-auto pb-5">
        <Button name={"Close"} callBack={setCreateGameModalActive} args={[false]} namedStyles={[S.button.redAndYellowButtonSingle, S.border.goldYellowBorder]} namedStyleAsAddOn={true} />
        <Button name={"Create Game"} callBack={createGameHandler} args={[false]} namedStyles={[S.button.classicCatanButtonSingle, S.border.lightRedBorder]} namedStyleAsAddOn={true} />
      </div>

    </div>
  )
}

export default CreateGame;