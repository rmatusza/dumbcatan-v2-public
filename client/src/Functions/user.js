import { REQUEST_TYPES } from "src/Utils/constants";
import { AppError } from "../Utils/AppError";
import { sendHttpRequest } from "./utility";

/// Functions that operate on user data 

export const authenticate = async (token) => {
  return await sendHttpRequest(REQUEST_TYPES.get, '/auth/authenticate', token);
};

export const signin = async (credentials) => {
  return await sendHttpRequest(REQUEST_TYPES.post, '/auth/signin', null, credentials);
};

export const signup = async (credentials) => {
  return await sendHttpRequest(REQUEST_TYPES.post, '/auth/signup', null, credentials);
};

export const updateProfile = async (userId, profileData, token) => {
  return await sendHttpRequest(REQUEST_TYPES.put, `/user/${userId}`, token, profileData);
};