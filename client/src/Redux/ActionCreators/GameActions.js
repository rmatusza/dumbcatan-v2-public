import { createGame, prepareGameInstance } from "../../Functions/game";
import { fetchPlayerData } from "../../Functions/player";
import { dispatchErrorAppAlert } from "../../Functions/utility";
import { APP_CONTEXT, BACKGROUND_PATHS, ENDPOINTS } from "../../Utils/constants";
import { gameActions } from "../Slices/GameSlice";
import { metaDataActions } from "../Slices/MetaDataSlice";
import { playerActions } from "../Slices/PlayerSlice";

export const createNewGame = (navigate, newGameData, token, owner, ownerId, color) => {
  return async (dispatch) => {
    dispatch(
      metaDataActions.toggleLoading({ value: true })
    );

    try {
      const requestData = { ...newGameData, owner, ownerId, color };

      const createGameResponse = await createGame(requestData, token);

      const initialGameSliceData = { ...newGameData, gameId: createGameResponse.gameId };
      const initialPlayerSliceData = createGameResponse.newPlayerData;

      dispatch(gameActions.initializeGameData(initialGameSliceData));
      dispatch(playerActions.initializePlayerData(initialPlayerSliceData));
      dispatch(metaDataActions.setBackground({background: BACKGROUND_PATHS.medTable}));

      navigate(`${ENDPOINTS.gameInstance}/${createGameResponse.gameId}`);
    }
    catch (error) {
      dispatchErrorAppAlert(dispatch, error, APP_CONTEXT.createGame, true);
    }
    finally {
      dispatch(metaDataActions.toggleLoading({ value: false }));
    }
  }
};

export const selectGame = (userId, gameId, gameData, token, navigate) => {
  return async (dispatch) => {
    dispatch(
      metaDataActions.toggleLoading({ value: true })
    );

    try {
      const playerData = await fetchPlayerData(gameId, token);

      prepareGameInstance(dispatch, gameActions.initializeGameData, playerActions.initializePlayerData, gameData, playerData);

      dispatch(metaDataActions.setBackground({background: BACKGROUND_PATHS.medTable}));

      navigate(`${ENDPOINTS.gameInstance}/${gameData.gameId}`);
    }
    catch (error) {
      dispatchErrorAppAlert(dispatch, error, APP_CONTEXT.games, true);
    }
    finally {
      dispatch(metaDataActions.toggleLoading({ value: false }));
    }
  }
};