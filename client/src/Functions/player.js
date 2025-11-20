import { REQUEST_TYPES } from "../Utils/constants"
import { sendHttpRequest } from "./utility"

export const fetchPlayerData = async (userId, gameId, token) => {
  return await sendHttpRequest(REQUEST_TYPES.get, `/player?userId=${userId}&gameId=${gameId}`, token);
} 