import { useSelector, useDispatch } from "react-redux";
import { metaDataActions } from "../Redux/Slices/MetaDataSlice";
import { BACKGROUND_PATHS } from "../Utils/constants";
import { BOARD_WIDTH, BOARD_HEIGHT } from "../Utils/settings";
import { CUSTOM_STYLES as S } from "../Utils/constants";
import GameBoard from "../Components/GameBoard";
import Modal from "../UI/Modal";
import Button from "../UI/Button";

const GameInstance = () => {
  const metaData = useSelector(state => state.metaData);
  const dispatch = useDispatch();

  const disableMessage = () => {
    dispatch(metaDataActions.setGameInstancePageMessageAlreadyDisplayed(true));
  };

  return (
    <div className="overflow-auto w-full h-screen">
      <div
        className="relative mx-auto w-full"
        style={{
          backgroundImage: `url('${BACKGROUND_PATHS.medTable}')`,
          backgroundRepeat: 'repeat',
          backgroundSize: '1000px 1000px',
          backgroundPosition: 'top left',
          paddingTop: '20px',
          paddingBottom: '20px'
        }}
      >
        <GameBoard />
      </div>

      {
        !metaData.gameInstancePageMessageAlreadyDisplayed
        &&
        <Modal background={BACKGROUND_PATHS.stone}>
          <div className="flex flex-col h-full">
            <div className='rounded-xl bg-black/50 mb-5'>
              <p className={`${S.text.headingTextYellow} text-center`}>At the moment create game only generates a randomized game board with hover effects over the nodes and the roads that will in the future be clickable during the game.</p>
              <br></br>
              <p className={`${S.text.headingTextYellow} text-center`}>Currently however, the game is not yet playable... but please check back soon as I am regularly adding new features!</p>
            </div>
            <div className="mt-auto">
              <Button type={"Close"} name={"Close"} callBack={disableMessage} namedStyles={[S.button.redAndYellowButtonSingle, S.border.goldYellowBorder]} namedStyleAsAddOn={true} />
            </div>
          </div>
        </Modal>
      }
    </div>
  )
}

export default GameInstance;