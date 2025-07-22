import { createGameRequest } from "../../Functions/game";
import { ENDPOINTS, APP_CONTEXT } from "../../Utils/constants";
import { metaDataActions } from "../Slices/MetaDataSlice";
import { playerActions } from "../Slices/PlayerSlice";
import { gameActions } from "../Slices/GameSlice";
import { applicationAlertActions } from "../Slices/ApplicationAlertSlice";

export const createNewGame = (dispatch, navigate, newGameData, token, owner, ownerId, color) => {
  return async (dispatch) => {
    dispatch(
      metaDataActions.toggleLoading({ value: true })
    );

    try {
      const requestData = {...newGameData, owner, ownerId, color};
      
      const createGameResponse = await createGameRequest(requestData, token);
      
      const initialGameSliceData = {...newGameData, gameId: createGameResponse.gameId};
      const initialPlayerSliceData = createGameResponse.newPlayerData;

      dispatch(gameActions.initializeGameData(initialGameSliceData));
      dispatch(playerActions.initializePlayerData(initialPlayerSliceData));

      navigate(`${ENDPOINTS.gameInstance}/${createGameResponse.gameId}`);
    }
    catch (error) {
      dispatch(applicationAlertActions.setApplicationAlert({
        message: error.message,
        type: 'failure',
        status: error.status,
        context: APP_CONTEXT.createGame,
        alertAsPopup: true
      }))
    }
    finally {
      dispatch(metaDataActions.toggleLoading({ value: false }));
    }
  }
}