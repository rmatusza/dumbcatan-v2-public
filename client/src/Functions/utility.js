import { REQUEST_FIELDS, MUSIC_SOURCES, MUSIC_TRACKS } from '../Utils/data';
import Cookies from 'js-cookie';
import cloneDeep from 'lodash/cloneDeep';

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
    /// expires in 1 day
    expires: 1,
    /// indicates whether you are using http (false) or https (true)
    secure: false,
    /// front and back end are on different domains so "none" allows cookie to be used in a cross-origin manner which is what our design strategy relies on
    /// NOTE: not allowed to use the combination of secure: false and sameSite: none - browser won't allow it
    /// so have to use sameSite: Lax instead
    sameSite: "Lax",
    /// cookie is available everywhere in app
    path: '/'
  })
};

export const ensureUpdateDataNonEmpty = (dataObj) => {
  let isNotEmpty = false;
  Object.keys(dataObj).forEach(key => {
    if (key !== 'userID' && dataObj[key] !== REQUEST_FIELDS.none) {
      isNotEmpty = true;
    }
  });
  return isNotEmpty;
}

/// - executes a callback after a specified delay
/// - useful for implementing temporary notifications - notification is shown and then cleared after a delay
export const executeAfterDelay = ({ delay, callback, args = [], dispatch = null }) => {
  setTimeout(() => {
    if (dispatch) {
      dispatch(callback(...args));
      return;
    }
    callback(...args);

  }, delay)
}

export const objectHasKeys = (obj) => {
  return Object.keys(obj).length > 0;
}

export const keyCountOf = (obj) => {
  return Object.keys(obj).length;
}

/// - returns a random track
/// - ensures that if an excludedTrack is provided, it will not be selected from the tracklist
export const getRandomTrack = (tracksArr, excludedTrack = null) => {
  let tracklist;

  /// reminder: filter creates a copy
  tracklist = tracksArr.filter(track => track !== excludedTrack);
  const randomTrackIdx = generateRandomNumber(tracklist.length);

  return tracklist[randomTrackIdx];
}

/// - sets one or more tracks of an associated theme to be played
/// -> either a selected track can be passed in or a random one will be chosen
/// allows for selectively disabling one or more themes
export const configureGroupMusicSettings = (themeNames = [], enabled = [], selectedTracks = []) => {
  const settingsObject = {};

  themeNames.forEach((themeName, i) => {
    if (!themeName) {
      return
    }

    const configuration = {};

    if (enabled[i] && !selectedTracks[i]) {
      configuration.track = getRandomTrack(MUSIC_TRACKS[themeName]);
    }
    else {
      configuration.track = selectedTracks[i] ? selectedTracks[i] : "";
    }
    configuration.enabled = enabled[i] ? enabled[i] : false;
    settingsObject[themeName] = configuration;
  })

  return settingsObject;
}

/// - sets a single track of an associated theme to be played
/// -> either a selected track can be passed in or a random one will be chosen
/// - allows for selectively disabling a single theme
export const configureMusicSettings = (themeName = null, enabled = false, selectedTrack = null) => {
  const settingsObject = {};
  const configuration = {};

  if (enabled && !selectedTrack) {
    configuration.track = getRandomTrack(MUSIC_TRACKS[themeName]);
  }
  else {
    configuration.track = selectedTrack;
  }

  configuration.enabled = enabled;

  settingsObject[themeName] = configuration;

  return settingsObject;
}

/// - selects a new track when the previous one has ended, and also returns a notification stating whether or not the tracklist 
///   needs to be looped - this is true when all tracks in a tracklist have been played
/// - when all tracks in a tracklist have been played, a new random track is selected from the tracklist - excluding the one that just finished playing 
export const getNextTrack = (themeName, currentTrack, playedTracks) => {
  const tracklist = MUSIC_TRACKS[themeName];
  let loopTracklist = false;

  if (tracklist.length === 1) {
    return tracklist[1];
  }

  for (let i = 0; i < tracklist.length; i++) {
    let track = tracklist[i];
    if (!playedTracks.includes(track)) {
      return [track, loopTracklist];
    }
  }

  loopTracklist = true;
  const newTrack = getRandomTrack(tracklist, currentTrack);

  return [newTrack, loopTracklist];
}

export const handleTrackEnd = (themeName, metaData, metaDataActions, dispatch) => {
  const currTrack = metaData.musicSettings[themeName].track;
  const [nextTrack, loopTracklist] = getNextTrack(themeName, currTrack, metaData.playedTracks);

  const reconfiguredMusicSettings = configureMusicSettings(themeName, true, nextTrack);

  if (loopTracklist) {
    dispatch(metaDataActions.loopTracklist({ tracklist: MUSIC_TRACKS[themeName], reconfiguredMusicSettings, nextTrack }));
    return
  }

  dispatch(metaDataActions.updateMusicSettings(reconfiguredMusicSettings));
}