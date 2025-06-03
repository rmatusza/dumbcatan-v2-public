import { AppError } from "../Utils/AppError";

/// Functions that operate on user data 

export const authenticate = async (token) => {
  let res;
  try {
    res = await fetch("http://localhost:8080/api/auth/authenticate", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }
  catch(e) {
    throw new AppError('Unexpected server error occurred', 500);
  }

  let responseData;

  try {
    responseData = await res.json();
  } catch (e) {
    // Handle case where response is not JSON (e.g., server crash, 500)
    throw new AppError('Unexpected server error occurred', 500);
  }

  if (!res.ok) {
    if(responseData && (responseData.message === "Invalid JWT token" || responseData.message === "JWT expired")) {
      throw new AppError("An error was encountered when attempting to sign you in. Please try again.", 500);
    } 
    
    throw new AppError(responseData?.message || 'Authentication failed', responseData?.status || 500);
  }

  return responseData;
};

export const signin = async (credentials) => {
  let res;
  try {
    res = await fetch("http://localhost:8080/api/auth/signin", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials)
    });
  }
  catch(e) {
    throw new AppError('Unexpected server error occurred', 500);
  }

  let responseData;

  try {
    responseData = await res.json();
  } catch (e) {
    throw new AppError('Unexpected server error occurred', 500);
  }

  if (!res.ok) {
    throw new AppError(responseData?.message || 'Sign in failed', responseData?.status || 500);
  }

  return responseData;
};

export const signup = async (credentials) => {
  let res;
  try {
    res = await fetch("http://localhost:8080/api/auth/signup", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials)
    });
  }
  catch(e) {
    throw new AppError('Unexpected server error occurred', 500);
  }

 let responseData;

  try {
    responseData = await res.json();
  } catch (e) {
    throw new AppError('Unexpected server error occurred', 500);
  }

  if (!res.ok) {
    throw new AppError(responseData?.message || 'Sign up failed', responseData?.status || 500);
  }
  
  return responseData;
};

export const updateProfile = async (profileData, token) => {
  let res;
  try {
    res = await fetch("http://localhost:8080/api/user/update-profile", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(profileData )
    });
  }
  catch(e) {
    throw new AppError('Unexpected server error occurred', 500);
  }

 let responseData;

  try {
    responseData = await res.json();
  } catch (e) {
    throw new AppError('Unexpected server error occurred', 500);
  }

  if (!res.ok) {
    throw new AppError(responseData?.message || 'Profile update failed', responseData?.status || 500);
  }
  return responseData;
}