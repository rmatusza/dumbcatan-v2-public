import 
{ 
  spliceArray, 
  getElementIdx,
  generateBoolean,
  generateRandomNumber  
} from "./utility";
import 
{ 
  tileIdentities,
  devCardIdentities,
  ports,
} from "../Utils/constants";
import 
{ 
  tileCounts, 
  devCardCounts,
  rowTileCount,
  diceIdCount,
  portToNodeMap,
  portCount,
  nodeToRoadMap,
} from "../Utils/mappings";
import { nodeData, roadData } from "../Utils/templates";


export const shuffleTiles = () => {
  const DESERT_TILE_ODDS = 1 / 12;

  let tileCountsCpy = { ...tileCounts };
  let tileTypesCpy = [...tileIdentities];

  let shuffledTiles = [];
  let rowArr = [];

  let currRow = 1;

  let desertTileInserted = false;

  let desertTileCoordinates = [];

  while (tileTypesCpy.length > 0) {

    if (!desertTileInserted && rowArr.length === 1 && currRow === 5) {
      let idx = generateRandomNumber(1, 1);
      spliceArray('insert', rowArr, idx, 'desert');
      desertTileCoordinates.push(currRow - 1, idx);
      desertTileInserted = true;

      if (idx === 2) {
        const LAST_TILE = tileTypesCpy.pop();
        spliceArray('insert', rowArr, 1, LAST_TILE);
        shuffledTiles.push(rowArr);
        break;
      }
    }

    let tileArrIdx = generateRandomNumber(tileTypesCpy.length - 1);
    let tileName = tileTypesCpy[tileArrIdx];

    tileCountsCpy[tileName] -= 1;

    if (tileCountsCpy[tileName] === 0) {
      spliceArray('delete', tileTypesCpy, tileArrIdx);
    }

    rowArr.push(tileName);

    if (rowArr.length !== rowTileCount[currRow]) {
      if (!desertTileInserted && generateBoolean(DESERT_TILE_ODDS)) {
        rowArr.push('desert');
        desertTileCoordinates.push(currRow - 1, rowArr.length - 1);
        desertTileInserted = true;

      }
    }

    if (rowArr.length === rowTileCount[currRow]) {
      shuffledTiles.push(rowArr);
      currRow++;
      rowArr = [];
    }

  }

  return [shuffledTiles, desertTileCoordinates];
};

export const shuffleDiceIds = (desertTileCoordinates) => {
  let diceIdCountCpy = { ...diceIdCount };
  let diceRollIdentities = [2, 3, 4, 5, 6, 8, 9, 10, 11, 12];

  let shuffledDiceIds = [];
  let rowArr = [];

  let currRow = 1;

  let desertTileHandled = false;

  while (diceRollIdentities.length > 0 || !desertTileHandled) {

    if (!desertTileHandled && ((currRow - 1) === desertTileCoordinates[0] && (rowArr.length) === desertTileCoordinates[1])) {
      rowArr.push(null);
      if (rowArr.length === rowTileCount[currRow]) {
        shuffledDiceIds.push(rowArr);
        rowArr = [];
        currRow++;
      }
      desertTileHandled = true;
      continue;
    }

    let diceRollIdx = 0;

    if (diceRollIdentities.length > 1) {
      diceRollIdx = generateRandomNumber(diceRollIdentities.length - 1);
    }

    let diceValue = diceRollIdentities[diceRollIdx];
    diceIdCountCpy[diceValue] -= 1;

    if (diceIdCountCpy[diceValue] === 0) {
      spliceArray('delete', diceRollIdentities, diceRollIdx);
    }

    rowArr.push(diceValue);

    if (rowArr.length === rowTileCount[currRow]) {
      shuffledDiceIds.push(rowArr);
      rowArr = [];
      currRow++;
    }
  }

  return shuffledDiceIds;
};

export const createTileData = (shuffledTiles, shuffledDiceIds) => {

  let tileData = {};
  const diceIdTally = new Set();
  let nodeIdx = 0;

  shuffledDiceIds.forEach((row, rowIdx) => {
    row.forEach((diceId, columnIdx) => {
      if (diceId === null) {
        nodeIdx++
      }
      else {
        if (diceIdTally.has(diceId)) {
          if (diceIdCount[diceId] !== 1) {
            let tileKey = diceId + "-b"

            tileData[tileKey] =
            {
              'resource': shuffledTiles[rowIdx][columnIdx],
              'robber': false,
              'nodeIndex': nodeIdx
            }
          }
        }
        else {
          diceIdTally.add(diceId);
          let tileKey = diceIdCount[diceId] !== 1 ? diceId + "-a" : diceId;

          tileData[tileKey] =
          {
            'resource': shuffledTiles[rowIdx][columnIdx],
            'robber': false,
            'nodeIndex': nodeIdx
          }
        }
        nodeIdx++;
      }

    });

  });

  return tileData;
};

export const shuffleDevCards = () => {
  let devCardIdentitiesCpy = [...devCardIdentities];
  const devCardCountsCpy = { ...devCardCounts };

  const shuffledDevCards = [];

  while (devCardIdentitiesCpy.length > 0) {
    let devCard;
    let devCardIdx = 0;

    if (devCardIdentitiesCpy.length === 1) {
      devCard = devCardIdentities[0];
    }
    else {
      let knightIdx = getElementIdx(devCardIdentitiesCpy, 'knight');

      if (knightIdx !== -1) {
        let chooseKnight = generateBoolean(1 / (2.5));
        chooseKnight ? devCardIdx = knightIdx : devCardIdx = generateRandomNumber(devCardIdentitiesCpy.length - 1);
        devCard = devCardIdentitiesCpy[devCardIdx];
      }
      else {
        devCardIdx = generateRandomNumber(devCardIdentitiesCpy.length - 1);
        devCard = devCardIdentitiesCpy[devCardIdx];
      }
    }

    devCardCountsCpy[devCard] -= 1;

    if (devCardCountsCpy[devCard] <= 0) {
      spliceArray('delete', devCardIdentitiesCpy, devCardIdx);
    }

    shuffledDevCards.push(devCard);
  }

  return shuffledDevCards;
};

export const shufflePorts = () => {
  let portsCpy = [...ports];
  const portCountCpy = { ...portCount };

  const shuffledPorts = [];

  for (let i = 0; i < 9; i++) {
    let port;
    let portIdx;

    if (portsCpy.length === 1) {
      portIdx = 0;
      port = portsCpy[0];
    }
    else {
      let allPortIdx = getElementIdx(portsCpy, 'all');

      if (allPortIdx !== -1) {
        let chooseAllPort = generateBoolean(1 / (2.5));
        chooseAllPort ? portIdx = allPortIdx : portIdx = generateRandomNumber(portsCpy.length - 1);
        port = portsCpy[portIdx];
      }
      else {
        portIdx = generateRandomNumber(portsCpy.length - 1);
        port = portsCpy[portIdx];
      }
    }

    portCountCpy[port] -= 1;

    if (portCountCpy[port] === 0) {
      spliceArray('delete', portsCpy, portIdx);
    }

    shuffledPorts.push(port);
  }

  return shuffledPorts;
};

export const constructRoad = (nodes) => {
  console.log('NODES: ' + nodes);
  const start = nodes[0];
  const end = nodes[1];

  console.log('PLACED ROAD #: ')
  console.log(nodeToRoadMap[start][end]);
}

export const constructBuilding = (node) => {
  console.log('CONSTRUCTING A BUILDING AT NODE: ' + node);
}

export const createNewGameData = () => {
  const [tileOrder, desertTileCoordinates] = shuffleTiles();
  const diceIdOrder = shuffleDiceIds(desertTileCoordinates);
  const devCards = shuffleDevCards();
  const tileData = createTileData(tileOrder, diceIdOrder);
  return {
    tileOrder,
    diceIdOrder,
    tileData,
    devCards,
    nodeData,
    roadData
  };
};

// export const initializeNodeToPortMap = (initializedPorts) => {

//   for (let i = 1; i < 10; i++) {
//     let linkedNodesArr = portToNodeMap[i];
//     let port = initializedPorts[i-1];
    
//     nodeToPortMap[linkedNodesArr[0]] = port;
//     nodeToPortMap[linkedNodesArr[1]] = port;

//   }
//   return nodeToPortMap;
// };