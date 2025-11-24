import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createGameIcons, dispatchErrorAppAlert, generateRandomNumber, getToken, spliceArray } from "../Functions/utility";
import { deleteGame, prepareGameInstance, fetchActiveGames } from "../Functions/game";
import { TILE_PATHS, TILE_IDENTITIES, CUSTOM_STYLES as S, APP_CONTEXT, BACKGROUND_PATHS, APP_ALERT_TYPE, ENDPOINTS, QUICK_STYLES } from "../Utils/constants";
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
import GameIcons from "../Components/GameIcons";

const Games = () => {
  const [focusedTileIdx, setFocusedTileIdx] = useState(0);
  const [gameData, setGameData] = useState(null);
  const [confirmationModalActive, setConfirmationModalActive] = useState(false);
  const [inviteModalActive, setInviteModalActive] = useState(false);
  const [animationPaused, setAnimationPaused] = useState(false);
  const ws = useWebsocket();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userData);

  useEffect(() => {
    if (!ws || !userData?.username) return;

    const unsub = ws.subscribe(
      `/topic/invites/from/${userData.username}`,
      updatePlayerList
    );

    return () => {
      if (typeof unsub === "function") unsub();
    };
  }, [ws, userData.username]);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(
        metaDataActions.toggleLoading({ value: true })
      );
      try {
        const activeGamesData = await fetchActiveGames(getToken());
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

  const updatePlayerList = (msg) => {
    const gamesCpy = (() => [...gameData])();
    gamesCpy.forEach(g => {
      if(g.gameId === msg.gameId){
        g.playerList.push(msg.playerName);
      }
    });
    setGameData(gamesCpy);
  }

  const deleteButtonHandler = () => {
    setConfirmationModalActive(true);
  }

  const deleteGameHandler = async () => {
    const gameIdToDelete = gameData[focusedTileIdx].gameId;
    setConfirmationModalActive(false);
    dispatch(
      metaDataActions.toggleLoading({ value: true })
    );

    try {
      await deleteGame(gameIdToDelete, getToken());
      setGameData(gameData => gameData.filter(game => game.gameId !== gameIdToDelete));
    }
    catch (error) {
      dispatchErrorAppAlert(dispatch, error, APP_CONTEXT.games, true);
    }
    finally {
      dispatch(
        metaDataActions.toggleLoading({ value: true })
      );
      setAnimationPaused(false)
    }
  }

  const selectGameHandler = async () => {
    const selectedGameData = gameData[focusedTileIdx];
    await dispatch(selectGame(userData.userId, selectedGameData.gameId, selectedGameData, getToken(), navigate));
  }

  const clickHandler = (event, action) => {
    event.stopPropagation();

    if (action === 'delete') {
      setAnimationPaused(true);
      deleteButtonHandler();
    }
    else if (action === 'select') {
      setAnimationPaused(true);
      selectGameHandler();
    }
    else if (action === 'invite') {
      setAnimationPaused(true);
      setInviteModalActive(true);
    }
  }

  return (
    <div className="bg-[rgba(43,26,9,0.7)] backdrop-blur-md shadow-lg p-20 w-screen h-screen flex justify-around">
      {
        gameData
        &&
        <GameIcons
          games={gameData}
          clickHandler={clickHandler}
          context={APP_CONTEXT.games}
          animationPaused={animationPaused}
          setFocusedTileIdx={setFocusedTileIdx}
          focusedTileIdx={focusedTileIdx}
          buttons={{
            a: {
              name: 'Invite Player',
              args: ['invite'],
              ...QUICK_STYLES.yesButton
            },
            b: {
              name: 'Delete',
              args: ['delete'],
              ...QUICK_STYLES.noButton
            }
          }}
        />
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
          cancelCallback={() => {setConfirmationModalActive(false); setAnimationPaused(false)}}
          confirmationText={[`Are you sure you want to delete game ${gameData[focusedTileIdx].gameId}?`]}
        />
      }
      {
        inviteModalActive
        &&
        <Modal background={BACKGROUND_PATHS.stone}>
          <SendInvite closeModal={() => { setInviteModalActive(false); setAnimationPaused(false); dispatch(applicationAlertActions.clearApplicationAlert()) }} gameId={gameData[focusedTileIdx].gameId} />
        </Modal>
      }
    </div>
  )
}

export default Games;