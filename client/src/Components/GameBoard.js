import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BOARD_BORDER_PATH, TILE_PATHS, BACKGROUND_PATHS } from "../Utils/constants";
import { rowTileCount } from "../Utils/mappings";
import { BOARD_HEIGHT, BOARD_WIDTH, TILE_HEIGHT, TILE_WIDTH } from "../Utils/settings";
import { constructBuilding, constructRoad } from "../Functions/game";
import { calculateNodePositions, calculateRoadPositions, calculateTilePositions, drawNode, drawRoad } from "../Functions/utility";
import { gameSliceActions } from "../Redux/Slices/GameSlice";

const GameBoard = () => {
  const imageRef = useRef(null);
  const dispatch = useDispatch();
  const [boardCoords, setBoardCoords] = useState([null, null]);
  const
    {
      tileOrder,
      diceIdOrder,
      portOrder,
      positionedTiles,
      positionedNodes,
      positionedRoads,
      nodeData,
      roadData,
      constructRoadEnabled,
      constructBuildingEnabled,
    } = useSelector(state => state.gameData);

  useEffect(() => {
    if (imageRef.current) {
      setBoardCoords([imageRef.current.offsetLeft, imageRef.current.offsetTop]);
    }
  }, []);

  useEffect(() => {
    if (boardCoords[0] !== null && tileOrder && nodeData) {

      const positionedTiles = calculateTilePositions(tileOrder, boardCoords[0], boardCoords[1]);
      const positionedNodes = calculateNodePositions(positionedTiles);
      const positionedRoads = calculateRoadPositions(positionedNodes);

      dispatch(gameSliceActions.setPositionData({
        positionedNodes,
        positionedTiles,
        positionedRoads,
      }));
    }
  }, [boardCoords, tileOrder, nodeData])

  // const handleRoadPlacement = (node) => {
  //   if (nodes.length === 2) {
  //     setNodes([]);
  //   };

  //   const nodesCpy = [...nodes];
  //   nodesCpy.push(node);

  //   if (nodes.length === 1) {
  //     setNodes([]);
  //     constructRoad(nodesCpy);
  //   };

  //   setNodes(nodesCpy);
  // }

  // const nodeClickHandler = (node) => {
  //   if (constructRoadEnabled) {
  //     handleRoadPlacement(node)
  //   };

  //   if (constructBuildingEnabled) {
  //     constructBuilding(node);
  //   };
  // }

  return (
    <>
      <div
        className="relative mx-auto"
        style={{
          width: `${BOARD_WIDTH}px`,
          height: `${BOARD_HEIGHT}px`,
        }}
      >
        <img
          src={BOARD_BORDER_PATH}
          alt="board-border"
          ref={imageRef}
          style={{
            width: `${BOARD_WIDTH}px`,
            height: `${BOARD_HEIGHT}px`,
            display: 'block',
            zIndex: 1,
          }}
        />

        {
          positionedTiles
          &&
          positionedTiles.flat().map((tile, i) => (
            <img
              key={i}
              src={TILE_PATHS[tile.tileName]}
              style={{
                position: 'absolute',
                left: tile.x,
                top: tile.y,
                width: TILE_WIDTH,
                height: TILE_HEIGHT,
                zIndex: 1,
              }}
            />
          ))
        }

        <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none">
          {
            roadData && positionedRoads
            &&
            Object.keys(positionedRoads).map((road, index) => drawRoad(road, roadData, positionedRoads))
          }
          {
            nodeData && positionedNodes
            &&
            Object.keys(positionedNodes).map((node, index) => drawNode(node, nodeData, positionedNodes))
          }
        </svg>
      </div>
    </>
  )
}

export default GameBoard;