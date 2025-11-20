import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dispatchErrorAppAlert, generateRandomNumber, getToken, spliceArray } from "../Functions/utility";
import { deleteGame, prepareGameInstance } from "../Functions/game";
import { TILE_PATHS, tileIdentities, CUSTOM_STYLES as S, APP_CONTEXT, BACKGROUND_PATHS, APP_ALERT_TYPE, ENDPOINTS } from "../Utils/constants";
import { fetchActiveGames } from "../Functions/game";
import { applicationAlertActions } from "../Redux/Slices/ApplicationAlertSlice";
import { gameActions } from "../Redux/Slices/GameSlice";
import { playerActions } from "../Redux/Slices/PlayerSlice";
import { fetchPlayerData } from "../Functions/player";
import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import Confirmation from "../UI/Confirmation";

const Games = () => {
  const [gameData, setGameData] = useState(null);
  const [gameTiles, setGameTiles] = useState(null);
  const [confirmationModalActive, setConfirmationModalActive] = useState(false);
  const [selectedGameId, setSelectedGameId] = useState(null);
  const [selectedGameTileIdx, setSelectedGameTileIdx] = useState(null);
  const [focusedTileIdx, setFocusedTileIdx] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const activeGamesData = await fetchActiveGames(userData.userId, getToken());

        let initialGameTiles = [];
        for (let i = 0; i < activeGamesData?.length; i++) {
          initialGameTiles.push(TILE_PATHS[tileIdentities[generateRandomNumber(tileIdentities.length - 1)]]);
        }

        setGameTiles(initialGameTiles);
        setGameData(activeGamesData);
      }
      catch (error) {
        dispatchErrorAppAlert(dispatch, error, APP_CONTEXT.games, true);
      }
    }
    fetchData();
  }, []);

  const deleteButtonHandler = (gameId, idx) => {
    setSelectedGameId(gameId);
    setSelectedGameTileIdx(idx);
    setConfirmationModalActive(true);
  };

  const deleteGameHandler = async () => {
    setConfirmationModalActive(false);
    try {
      await deleteGame(selectedGameId, userData.userId, getToken());

      const updatedGameTiles = [...gameTiles];
      spliceArray('delete', updatedGameTiles, selectedGameTileIdx);

      setGameTiles(updatedGameTiles);
      setGameData(gameData => gameData.filter(game => game.gameId !== selectedGameId));
    }
    catch (error) {
      dispatchErrorAppAlert(dispatch, error, APP_CONTEXT.games, true);
    }
  };

  const selectGameHandler = async (gameId) => {
    try {
      const playerData = await fetchPlayerData(userData.userId, gameId, getToken());
      const selectedGameData = gameData[focusedTileIdx];

      prepareGameInstance(dispatch, gameActions.initializeGameData, playerActions.initializePlayerData, selectedGameData, playerData);
      
      navigate(`${ENDPOINTS.gameInstance}/${selectedGameData.gameId}`);
    }
    catch (error) {
      dispatchErrorAppAlert(dispatch, error, APP_CONTEXT.games, true);
    }
  }

  const hoverHandler = (idx) => {
    setFocusedTileIdx(idx);
  };

  const clickHandler = (event, action, args) => {
    event.stopPropagation();
    
    if(action === 'delete') {
      deleteButtonHandler(...args);
    }
    if(action === 'select') {
      selectGameHandler(...args);
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
            <div key={game.gameId} className={`flex flex-col relative w-[400px] h-[400px] m-4 items-center justify-center cursor-pointer ${focusedTileIdx === i ? 'animate-float-scale' : ''}`} onMouseEnter={() => hoverHandler(i)} onClick={(event) => clickHandler(event, 'select', [game.gameId])}>
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
                <div className="w-full flex justify-center z-10 pt-10">
                  <Button type={'button'} name={'Delete'} callBack={clickHandler} args={['delete', [game.gameId, i]]} namedStyles={[S.button.redAndYellowButtonSingle, S.border.goldYellowBorder]} tailwindStyles="px-4 py-2 rounded w-40" overwriteBaseStyle={true} passEventObject={true}/>
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
          confirmationText={[`Are you sure you want to delete game ${selectedGameId}?`]}
        />
      }
    </div>
  )
}

export default Games;