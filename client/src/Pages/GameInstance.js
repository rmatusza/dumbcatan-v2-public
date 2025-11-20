import { useSelector, useDispatch } from "react-redux";
import { metaDataActions } from "../Redux/Slices/MetaDataSlice";
import { BACKGROUND_PATHS } from "../Utils/constants";
import { BOARD_WIDTH, BOARD_HEIGHT } from "../Utils/settings";
import { CUSTOM_STYLES as S, GAME_INSTANCE_PAGE_POPUP_LINES } from "../Utils/constants";
import GameBoard from "../Components/GameBoard";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import PopupMessage from "../UI/PopupMessage";

const GameInstance = () => {
  const metaData = useSelector(state => state.metaData);
  // const playerData = useSelector(state => state.playerData);
  // const gameData = useSelector(state => state.gameData);
  const dispatch = useDispatch();

  // console.log(playerData)
  // console.log(gameData)

  const disableMessage = () => {
    dispatch(metaDataActions.setGameInstancePageMessageAlreadyDisplayed(true));
  };

  return (
    <div className="relative mx-auto w-full py-5">
      <GameBoard />
      {
        !metaData.gameInstancePageMessageAlreadyDisplayed
        &&
        <PopupMessage background={BACKGROUND_PATHS.stone} lines={GAME_INSTANCE_PAGE_POPUP_LINES} closePopup={disableMessage} />
      }
    </div>
  )
}

export default GameInstance;