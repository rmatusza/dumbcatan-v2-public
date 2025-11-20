import { REQUEST_TYPES } from "../Utils/constants"
import { sendHttpRequest } from "./utility"

export const fetchPlayerData = async (gameId, token) => {
  return await sendHttpRequest(REQUEST_TYPES.get, `/player/data-for-game/${gameId}`, token);
} 