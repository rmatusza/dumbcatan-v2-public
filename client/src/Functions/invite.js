import { REQUEST_TYPES } from "../Utils/constants";
import { getToken, sendHttpRequest } from "./utility";

export async function acceptInvite(inviteId, color){
    await sendHttpRequest(REQUEST_TYPES.post, `/invite/${inviteId}/accept?playerColor=${color}`, getToken());
}

export async function declineInvite(inviteId){
    await sendHttpRequest(REQUEST_TYPES.delete, `/invite/${inviteId}/decline`, getToken());
}

export async function fetchInvite(gameId) {
    return await sendHttpRequest(REQUEST_TYPES.get, `/invite/for/game/${gameId}`, getToken());
}

export async function fetchAllInvites(){
    return await sendHttpRequest(REQUEST_TYPES.get, `/invite/me/all`, getToken());
}