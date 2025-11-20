import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createGameIcons, dispatchErrorAppAlert, generateRandomNumber, getToken, spliceArray } from "../Functions/utility";
import { deleteGame, prepareGameInstance, fetchActiveGames } from "../Functions/game";
import { TILE_PATHS, TILE_IDENTITIES, CUSTOM_STYLES as S, APP_CONTEXT, BACKGROUND_PATHS, APP_ALERT_TYPE, ENDPOINTS } from "../Utils/constants";
import { gameActions } from "../Redux/Slices/GameSlice";
import { playerActions } from "../Redux/Slices/PlayerSlice";
import { selectGame } from "../Redux/ActionCreators/GameActions";
import { metaDataActions } from "../Redux/Slices/MetaDataSlice";
import { useWebsocket } from "../Context/WebsocketProvider";
import { SendInvite } from "../Components/SendInvite";
import { applicationAlertActions } from "../Redux/Slices/ApplicationAlertSlice";
import Button from "../UI/Button";
import Confirmation from "../UI/Confirmation";
import Modal from "../UI/Modal";

const Games = () => {
  const [gameData, setGameData] = useState(null);
  const [gameTiles, setGameTiles] = useState(null);
  const [confirmationModalActive, setConfirmationModalActive] = useState(false);
  const [inviteModalActive, setInviteModalActive] = useState(false);
  const [focusedTileIdx, setFocusedTileIdx] = useState(0);
  const [animationPaused, setAnimationPaused] = useState(false);
  const { connected, send, subscribe, client } = useWebsocket();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userData);
  
  useEffect(() => {
    const fetchData = async () => {
      dispatch(
        metaDataActions.toggleLoading({ value: true })
      );
      try {
        const activeGamesData = await fetchActiveGames(getToken());

        const gameIcons = createGameIcons(activeGamesData, TILE_PATHS, TILE_IDENTITIES);

        setGameTiles(gameIcons);
        setGameData(activeGamesData);
      }
      catch (error) {
        dispatchErrorAppAlert(dispatch, error, APP_CONTEXT.games, true);
      }
      finally {
        dispatch(
          metaDataActions.toggleLoading({ value: false })
        );
      }
    }
    fetchData();
  }, []);

  const deleteButtonHandler = () => {
    setConfirmationModalActive(true);
  };

  const deleteGameHandler = async () => {
    const gameIdToDelete = gameData[focusedTileIdx].gameId;
    setConfirmationModalActive(false);
    dispatch(
      metaDataActions.toggleLoading({ value: true })
    );
    
    try {
      await deleteGame(gameIdToDelete, getToken());

      const updatedGameTiles = [...gameTiles];
      spliceArray('delete', updatedGameTiles, focusedTileIdx);

      setGameTiles(updatedGameTiles);
      setGameData(gameData => gameData.filter(game => game.gameId !== gameIdToDelete));
      setFocusedTileIdx(0);
    }
    catch (error) {
      dispatchErrorAppAlert(dispatch, error, APP_CONTEXT.games, true);
    }
    finally {
      dispatch(
        metaDataActions.toggleLoading({ value: true })
      );
    }
  };

  const selectGameHandler = async () => {
    const selectedGameData = gameData[focusedTileIdx];
    await dispatch(selectGame(userData.userId, selectedGameData.gameId, selectedGameData, getToken(), navigate));
  }

  const hoverHandler = (idx) => {
    setFocusedTileIdx(idx);
  };

  const clickHandler = (event, action) => {
    event.stopPropagation();

    if (action === 'delete') {
      deleteButtonHandler();
    }
    else if (action === 'select') {
      selectGameHandler();
    }
    else if (action === 'invite') {
      setAnimationPaused(true);
      setInviteModalActive(true);
    }
  };

  return (
    <div className="bg-[rgba(43,26,9,0.7)] backdrop-blur-md shadow-lg p-20 w-screen h-screen flex justify-around">
      {
        gameData
        &&
        gameData.map((game, i) => {
          let isOwner = game.owner === userData.username;
          return (
            <div key={game.gameId} className={`flex flex-col relative w-[400px] h-[400px] m-4 items-center justify-center cursor-pointer ${focusedTileIdx === i && !animationPaused ? 'animate-float-scale' : ''}`} onMouseEnter={() => hoverHandler(i)} onClick={event => clickHandler(event, 'select')}>
              <img
                src={gameTiles[i]}
                alt="tile"
                className="absolute top-0 left-0 w-full h-full z-0"
              />

              <div className="w-50 h-50 z-10 text-black text-center p-2 flex flex-col justify-between font-yatra bg-cream/60 backdrop-blur-md rounded">

                <p className="text-3xl">Game ID: {game.gameId}</p>
                <p className="text-lg">Owner: {game.owner}</p>
                <p className="text-lg pb-5">
                  Players:{" "}
                  {game.playerList.map((player, i) => (
                    <span key={i}>{player}{i < game.playerList.length - 1 ? ", " : ""}</span>
                  ))}
                </p>

                <div>
                  <p>Last Edited: 2025-07-20</p>
                </div>
              </div>
              {
                isOwner
                &&
                <div className="w-full flex flex-col items-center z-10 pt-10">
                  <Button type={'button'} name={'Invite Player'} callBack={clickHandler} args={['invite']} namedStyles={[S.button.classicCatanButtonSingle, S.border.lightRedBorder]} tailwindStyles="px-4 py-2 rounded w-40 mb-[5px]" overwriteBaseStyle={true} passEventObject={true} />
                  <Button type={'button'} name={'Delete'} callBack={clickHandler} args={['delete']} namedStyles={[S.button.redAndYellowButtonSingle, S.border.goldYellowBorder]} tailwindStyles="px-4 py-2 rounded w-40" overwriteBaseStyle={true} passEventObject={true} />
                </div>
              }
            </div>
          )
        })
      }
      {
        gameData && gameData.length === 0
        &&
        <p className="text-5xl text-center font-yatra text-white">No Active Games</p>
      }
      {
        confirmationModalActive
        &&
        <Confirmation
          background={BACKGROUND_PATHS.stone}
          confirmationButtonName={"Delete Game"}
          confirmationCallback={deleteGameHandler}
          cancelCallback={() => setConfirmationModalActive(false)}
          confirmationText={[`Are you sure you want to delete game ${gameData[focusedTileIdx].gameId}?`]}
        />
      }
      {
        inviteModalActive
        &&
        <Modal background={BACKGROUND_PATHS.stone}>
          <SendInvite closeModal={() => {setInviteModalActive(false); setAnimationPaused(false); dispatch(applicationAlertActions.clearApplicationAlert())}} gameId={gameData[focusedTileIdx].gameId}/>
        </Modal>
      }
    </div>
  )
}

export default Games;