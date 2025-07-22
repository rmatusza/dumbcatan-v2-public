import Cookies from 'js-cookie';
import { metaDataActions } from '../Redux/Slices/MetaDataSlice';
import { REQUEST_FIELDS, STRUCTURE_TYPES, APP_ALERT_TYPE, APP_CONTEXT } from '../Utils/constants';
import { MUSIC_TRACKS, nodeToRoadMap, nodeToTileMap, rowTileCount } from '../Utils/mappings';
import { AppError } from '../Utils/AppError';
import { applicationAlertActions } from '../Redux/Slices/ApplicationAlertSlice';
import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  DICE_ID_HEIGHT,
  DICE_ID_WIDTH,
  FINE_TUNE_X,
  FINE_TUNE_Y,
  TILE_HEIGHT,
  TILE_WIDTH,
  X_FRACTION_OF_BOARD_WIDTH,
  X_PADDING,
  Y_FRACTION_OF_BOARD_HEIGHT,
  y_PADDING
} from '../Utils/settings';

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
    if (key !== 'userId' && dataObj[key] !== REQUEST_FIELDS.none) {
      isNotEmpty = true;
    }
  });
  return isNotEmpty;
}

/// - executes a callback after a specified delay
/// - useful for implementing temporary notifications - notification is shown and then cleared after a delay
export const executeAfterDelay = (delay, callback, args = [], dispatch = null) => {
  setTimeout(() => {
    if (dispatch) {
      dispatch(callback(...args));
      return;
    }
    callback(...args);

  }, delay)
};

export const objectHasKeys = (obj) => {
  return Object.keys(obj).length > 0;
};

export const keyCountOf = (obj) => {
  return Object.keys(obj).length;
};

export const getFlattenedDesertIndex = (tiles) => {
  return tiles.flat().indexOf('desert');
};

/// - returns a random track
/// - ensures that if an excludedTrack is provided, it will not be selected from the tracklist
export const getRandomTrack = (tracksArr, excludedTrack = null) => {
  let tracklist;

  /// reminder: filter creates a copy
  tracklist = tracksArr.filter(track => track !== excludedTrack);
  const randomTrackIdx = generateRandomNumber(tracklist.length);

  return tracklist[randomTrackIdx];
};

/// - sets one or more tracks of an associated theme to be played
/// -> either a selected track can be passed in or a random one will be chosen
/// allows for selectively disabling one or more themes
export const createMultipleMusicObjects = (themeNames = [], enabled = [], selectedTracks = []) => {
  const themes = {};

  themeNames.forEach((themeName, i) => {
    if (!themeName) {
      return
    }

    const themeData = {};

    if (enabled[i] && !selectedTracks[i]) {
      themeData.track = getRandomTrack(MUSIC_TRACKS[themeName]);
    }
    else {
      themeData.track = selectedTracks[i] ? selectedTracks[i] : "";
    }
    themeData.enabled = enabled[i] ? enabled[i] : false;
    themes[themeName] = themeData;
  })

  return themes;
};

/// - sets a single track of an associated theme to be played
/// -> either a selected track can be passed in or a random one will be chosen
/// - allows for selectively disabling a single theme
export const createMusicObject = (themeName = null, enabled = true, selectedTrack = null) => {
  const themes = {};
  const themeData = {};

  if (enabled && !selectedTrack) {
    themeData.track = getRandomTrack(MUSIC_TRACKS[themeName]);
  }
  else {
    themeData.track = selectedTrack;
  }

  themeData.enabled = enabled;

  themes[themeName] = themeData;

  return themes;
};

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
};

export const handleTrackEnd = (themeName, metaData, dispatch) => {
  const currTrack = metaData.music[themeName].track;
  const [nextTrack, loopTracklist] = getNextTrack(themeName, currTrack, metaData.playedTracks);

  const musicObject = createMusicObject(themeName, true, nextTrack);

  if (loopTracklist) {
    dispatch(metaDataActions.loopTracklist({ tracklist: MUSIC_TRACKS[themeName], musicObject, nextTrack }));
    return
  }

  dispatch(metaDataActions.updateMusic(musicObject));
};

const calculateFirstTilePosition = (boardStartX, boardStartY) => {
  const HALF_TILE_WIDTH = TILE_WIDTH * 0.5;

  const xCoord = ((BOARD_WIDTH * X_FRACTION_OF_BOARD_WIDTH) - HALF_TILE_WIDTH) + boardStartX + FINE_TUNE_X;
  const yCoord = (BOARD_HEIGHT * Y_FRACTION_OF_BOARD_HEIGHT) + boardStartY + FINE_TUNE_Y;

  return [xCoord, yCoord];
};

const calculateNexTilePosition_SameRow = (firstTileCoords, columnNum) => {
  const firstXCoord = firstTileCoords[0];
  const firstYCoord = firstTileCoords[1];

  const newXCoord = firstXCoord + ((TILE_WIDTH + X_PADDING) * columnNum);

  return [newXCoord, firstYCoord];
};

const calculateNexTilePosition_NewRowFirstHalf = (firstTilePrevRowCoords) => {
  const HALF_TILE_WIDTH = TILE_WIDTH * 0.5;
  const THREE_QUARTERS_TILE_HEIGHT = TILE_HEIGHT * 0.75;

  const firstXPrevRowCoord = firstTilePrevRowCoords[0];
  const firstYPrevRowCoord = firstTilePrevRowCoords[1];

  const newXCoord = firstXPrevRowCoord - HALF_TILE_WIDTH;
  const newYCoord = firstYPrevRowCoord + y_PADDING + THREE_QUARTERS_TILE_HEIGHT;

  return [newXCoord, newYCoord];
};

const calculateNexTilePosition_NewRowSecondHalf = (firstTilePrevRowCoords) => {
  const HALF_TILE_WIDTH = TILE_WIDTH * 0.5;
  const THREE_QUARTERS_TILE_HEIGHT = TILE_HEIGHT * 0.75;

  const firstXPrevRowCoord = firstTilePrevRowCoords[0];
  const firstYPrevRowCoord = firstTilePrevRowCoords[1];

  const newXCoord = firstXPrevRowCoord + HALF_TILE_WIDTH;
  const newYCoord = firstYPrevRowCoord + y_PADDING + THREE_QUARTERS_TILE_HEIGHT;

  return [newXCoord, newYCoord];
};

const getCoords_FirstTilePrevRow = (tileGrid, currRow) => {
  const prevRowTiles = tileGrid[currRow - 1];
  const firstTilePrevRow = prevRowTiles[0];
  return [firstTilePrevRow.x, firstTilePrevRow.y];
};

const addTile = (tileName, coords, tileRow) => {
  tileRow.push({
    tileName,
    x: coords[0],
    y: coords[1],
  })

  return tileRow;
};

export const calculateTilePositions = (tileGrid, boardStartX, boardStartY) => {
  const secondHalfRowNumberStart = 3;

  const tilesWithPositionData = [];

  tileGrid.forEach((row, rowNum) => {
    let tileRowWithPositionData = [];
    row.forEach((tileName, columnNum) => {
      let coords;
      if (rowNum === 0 && columnNum === 0) {
        coords = calculateFirstTilePosition(boardStartX, boardStartY);
      }
      else if ((rowNum > 0 && rowNum < secondHalfRowNumberStart) && columnNum === 0) {
        const coordsFirstTilePrevRow = getCoords_FirstTilePrevRow(tilesWithPositionData, rowNum);
        coords = calculateNexTilePosition_NewRowFirstHalf(coordsFirstTilePrevRow);
      }
      else if ((rowNum > 0 && rowNum >= secondHalfRowNumberStart) && columnNum === 0) {
        const coordsFirstTilePrevRow = getCoords_FirstTilePrevRow(tilesWithPositionData, rowNum, true);
        coords = calculateNexTilePosition_NewRowSecondHalf(coordsFirstTilePrevRow);
      }
      else {
        const firstTile = tileRowWithPositionData[0];
        coords = calculateNexTilePosition_SameRow([firstTile?.x, firstTile?.y], columnNum);
      }
      tileRowWithPositionData = addTile(tileName, coords, tileRowWithPositionData);
    });
    tilesWithPositionData.push(tileRowWithPositionData);
  });

  return tilesWithPositionData;
};

export const calculateNodePositions = (tileGrid) => {
  const xRadius = TILE_WIDTH / 2;
  const yRadius = TILE_HEIGHT / 2;
  const angleIncrement = Math.PI / 3;

  const nodeCoords = {};

  const flattenedTileGrid = tileGrid.flat();

  nodeToTileMap.forEach((nodeGroup, groupIdx) => {
    let tile = flattenedTileGrid[groupIdx];
    if (!tile) return; /// added this line to avoid crash when refreshing on game instance page
    let xCenter = tile.x + (xRadius);
    let yCenter = tile.y + (yRadius);


    for (let i = 0; i < nodeGroup.length; i++) {
      let fineTuneX = 0;
      if (i === 1 || i === 2) {
        fineTuneX = 10
      }
      if (i === 4 || i === 5) {
        fineTuneX = -10
      }
      const node = nodeGroup[i];
      const angle = -Math.PI / 2 + i * angleIncrement;
      let x = (xCenter + xRadius * Math.cos(angle)) + fineTuneX;
      let y = yCenter + yRadius * Math.sin(angle);

      if (nodeCoords[node]) {
        const existingNode = nodeCoords[node];

        const avgX = (existingNode.x + x) / 2;
        const avgY = (existingNode.y + y) / 2;

        x = avgX;
        y = avgY
      }
      nodeCoords[node] = {
        x,
        y
      }
    }
  });

  return nodeCoords;
};

export const calculateRoadPositions = (nodePositions) => {
  const positionedRoads = {};

  for (const [startNode, endNodeMap] of Object.entries(nodeToRoadMap)) {
    if (!nodePositions[startNode]) return; /// added this line to avoid crash when refreshing on game instance page
    for (const [endNode, roadNumber] of Object.entries(endNodeMap)) {
      positionedRoads[roadNumber] =
      {
        'startNode': startNode,
        'endNode': endNode,
        'x1': nodePositions[startNode].x,
        'y1': nodePositions[startNode].y,
        'x2': nodePositions[endNode].x,
        'y2': nodePositions[endNode].y,
      }
    }
  }
  return positionedRoads;
};

export const calculateDiceIdPositions = (positionedTiles, diceIds) => {
  const positionedDiceIds = [];
  let diceIdRow = [];
  const diceIdSet = new Set();

  for (let row = 0; row < positionedTiles.length; row++) {
    let tileRow = positionedTiles[row];
    diceIdRow = [];

    for (let column = 0; column < tileRow.length; column++) {
      let tile = tileRow[column];
      let x = tile.x + (TILE_WIDTH / 2) - (DICE_ID_WIDTH / 2);
      let y = tile.y + (TILE_HEIGHT / 2) - (DICE_ID_HEIGHT / 2);

      let isVariantA;
      if(diceIdSet.has(diceIds[row][column])) {
        isVariantA = false;
      }
      else {
        isVariantA = true;
        diceIdSet.add(diceIds[row][column]);
      }

      diceIdRow.push({
        id: diceIds[row][column],
        idVariant: diceIds[row][column] + `${isVariantA ? '-a' : '-b'}`,
        x,
        y,
      });

    }
    positionedDiceIds.push(diceIdRow);
  }
  return positionedDiceIds;
};

export const calculatePortPositions = (boardX, boardY) => {
  // TODO: create this function
  return null;
};

export const drawNode = (node, nodeData, positionedNodes) => {
  let nodeStyle;

  if (nodeData[node]?.color) {
    if (nodeData[node].structure === STRUCTURE_TYPES.settlement) {
      nodeStyle =
        <g key={node} className="group hover:stroke-black">
          <circle
            cx={positionedNodes[node].x}
            cy={positionedNodes[node].y}
            r={18}
            fill="none"
            strokeWidth={4}
            style={{ pointerEvents: 'all', cursor: 'pointer' }}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          />
          <circle
            id={`NODE-${node}`}
            cx={positionedNodes[node].x}
            cy={positionedNodes[node].y}
            r={17}
            fill={nodeData[node].color}
            stroke='black'
            strokeWidth={1}
            style={{ pointerEvents: 'all', cursor: 'pointer' }}
          />
        </g>
    }
    else {
      nodeStyle =
        <g key={node} className="group hover:stroke-black">
          <rect
            x={positionedNodes[node].x - 10}
            y={positionedNodes[node].y - 10}
            width="30"
            height="30"
            fill="none"
            strokeWidth={4}
            style={{ pointerEvents: 'all', cursor: 'pointer' }}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          />
          <rect
            x={positionedNodes[node].x - 10}
            y={positionedNodes[node].y - 10}
            width="30"
            height="30"
            fill={nodeData[node].color}
            stroke="black"
            strokeWidth={1}
            strokeWidth="2"
          />
        </g>
    }
  }
  else {
    nodeStyle =
      <g key={node} className="group hover:stroke-black">
        <circle
          cx={positionedNodes[node].x}
          cy={positionedNodes[node].y}
          r={16}
          fill="none"
          strokeWidth={4}
          style={{ pointerEvents: 'all', cursor: 'pointer' }}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </g>
  }

  return (
    nodeStyle
  )
};

export const drawRoad = (roadNumber, roadData, positionedRoads) => {
  let roadPositionInfo = positionedRoads[roadNumber];
  if (roadData[roadNumber]) {
    return (
      <g key={roadNumber} className="group hover:stroke-black">
        <line
          id={`ROAD-${roadNumber}-${roadPositionInfo.startNode}-${roadPositionInfo.endNode}`}
          x1={roadPositionInfo.x1}
          y1={roadPositionInfo.y1}
          x2={roadPositionInfo.x2}
          y2={roadPositionInfo.y2}
          strokeWidth={12}
          style={{ pointerEvents: 'all', cursor: 'pointer' }}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        />
        <line
          x1={roadPositionInfo.x1}
          y1={roadPositionInfo.y1}
          x2={roadPositionInfo.x2}
          y2={roadPositionInfo.y2}
          strokeWidth={10}
          stroke={roadData[roadNumber]}
          style={{ pointerEvents: 'all', cursor: 'pointer' }}
        />
      </g>
    )
  }
  return (
    <g key={roadNumber} className="group hover:stroke-black">
      <line
        id={`ROAD-${roadNumber}-${roadPositionInfo.startNode}-${roadPositionInfo.endNode}`}
        x1={roadPositionInfo.x1}
        y1={roadPositionInfo.y1}
        x2={roadPositionInfo.x2}
        y2={roadPositionInfo.y2}
        fill="none"
        strokeWidth={12}
        style={{ pointerEvents: 'all', cursor: 'pointer' }}
        className="opacity-0 group-hover:opacity-100 transition-opacity"
      />
    </g>
  )
};

const appendStyle = (customStyle, style) => {
  customStyle += customStyle.trim().length > 0 ? " " + style : style
  return customStyle;
};

export const buildClassName = (baseStyle, customStyle, namedStyles, overwriteBaseStyle) => {

  if (namedStyles.length > 0) {
    namedStyles.forEach(style => {
      customStyle = appendStyle(customStyle, style);
    })
  }

  if (!overwriteBaseStyle) {
    customStyle = appendStyle(customStyle, baseStyle);
  }

  return customStyle;
};

export const sendHttpRequest = async (requestType, endpoint, token, requestData = null) => {
  let res;
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
  try {
    res = await fetch(`http://localhost:8080/api${endpoint}`, {
      method: requestType,
      headers,
      body: requestData ? JSON.stringify(requestData) : null
    });
  }
  catch (e) {
    throw new AppError('Unexpected server error occurred', 500);
  }

  let responseData;
  try {
    responseData = await res.json();
  } catch (e) {
    // Handle case where response is not JSON (e.g., server crash, 500)
    throw new AppError('Unexpected error occurred', 500);
  }

  if (!res.ok) {
    throw new AppError(responseData?.message || 'Unexpected error occurred', responseData?.status || 500);
  }

  return responseData;
};

export const dispatchErrorAppAlert = (dispatch, error, context, alertAsPopup) => {
  dispatch(applicationAlertActions.setApplicationAlert({
    type: APP_ALERT_TYPE.failure,
    message: error.message,
    status: error.status,
    context,
    alertAsPopup
  }));
}