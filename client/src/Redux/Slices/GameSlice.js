import { createSlice } from "@reduxjs/toolkit";
import { nodeData, roadData } from "../../Utils/templates";
import {
  tileOrder,
  diceIdOrder,
  portOrder,
  tileData,
  devCards,
} from "../../Utils/testData";
import {
  USE_TEST_DATA,
  BOARD_WIDTH,
  BOARD_HEIGHT,
  TILE_WIDTH,
  TILE_HEIGHT,
} from '../../Utils/settings';

const initialState =
  USE_TEST_DATA ?
    {
      tileOrder,
      diceIdOrder,
      portOrder,
      tileData,
      nodeData,
      roadData,
      devCards,
      positionedTiles: [],
      positionedNodes: {},
      positionedRoads: {},
      constructRoadEnabled: false,
      constructBuildingEnabled: false,
      BOARD_WIDTH,
      BOARD_HEIGHT,
      TILE_WIDTH,
      TILE_HEIGHT,
    }
    :
    {
      // GENERATED ONCE THEN STATIC
      tileOrder: [],
      diceIdOrder: [],
      portOrder: [],
      devCards: [],
      // GENERATED EACH TIME GAME IS OPENED
      positionedTiles: [],
      positionedNodes: {},
      positionedRoads: {},
      // GENERATED ONCE THEN MODIFIED
      tileData: {},
      // COPY OF TEMPLATE THEN MODIFIED
      nodeData: {},
      roadData: {},
      constructRoadEnabled: false,
      constructBuildingEnabled: false,
      BOARD_WIDTH,
      BOARD_HEIGHT,
      TILE_WIDTH,
      TILE_HEIGHT,
    };

const gameSlice = createSlice(
  {
    name: 'game',
    initialState: initialState,
    reducers:
    {
      initializeGameData(state, action) {
        return action.payload;
      },
      clearGameData(state) {
        return initialState;
      },
      setTileData(state, action) {
        state.tileData = action.payload;
      },
      setNodeData(state, action) {
        state.nodeData = action.payload;
      },
      setRoadData(state, action) {
        state.roadData = action.payload;
      },
      setRoadConstructionIsEnabled(state, action) {
        state.constructRoadEnabled = action.payload.isEnabled;
      },
      setBuildingConstructionIsEnabled(state, action) {
        state.constructBuildingEnabled = action.payload.isEnabled;
      },
      setPositionData(state, action) {
        return { ...state, ...action.payload };
      },
    }
  }
);

export const gameSliceActions = gameSlice.actions;
export default gameSlice;