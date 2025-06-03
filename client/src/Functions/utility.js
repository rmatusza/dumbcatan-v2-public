import Cookies from 'js-cookie';
import { REQUEST_FIELDS } from '../Utils/data';

export const generateRandomNumber = (max = 1, offset = 0) => {
  return (Math.round(Math.random() * max)) + offset;
};

export const generateBoolean = (odds) => {
  return Math.random() <= (odds);
};

export const calculateObjectValueSum = (obj) => {
  return Object.values(obj).reduce((accumulator, current) => accumulator + current, 0);
};

export const getElementIdx = (arr, searchedElement) => {
  for (let i = 0; i < arr.length; i++) {
    let currElement = arr[i];

    if (currElement === searchedElement) {
      return i;
    }
  }

  return -1;
};

export const spliceArray = (mode, array, index, newElement = null) => {
  if (mode === 'delete') {
    array.splice(index, 1);
  }
  else if (mode === 'insert') {
    array.splice(index, 0, newElement);
  }
  else if (mode === 'replace') {
    array.splice(index, 1, newElement);
  }
};

export const getToken = () => {
  return Cookies.get('jwt');
};

export const deleteToken = () => {
  Cookies.remove('jwt');
}

export const setToken = (token) => {
  Cookies.set('jwt', token, {
    expires: 1,
    secure: false,
    sameSite: "Lax",
    path: '/'
  })
};

export const ensureUpdateDataNonEmpty = (dataObj) => {
  let isNotEmpty = false;
  Object.keys(dataObj).forEach(key => {
    if(key !== 'userID' && dataObj[key] !== REQUEST_FIELDS.none) {
      isNotEmpty = true;
    }
  });
  return isNotEmpty;
}