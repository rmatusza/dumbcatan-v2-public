import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BOARD_BORDER_PATH, TILE_PATHS, BACKGROUND_PATHS, DICE_ID_PATHS } from "../Utils/constants";
import { rowTileCount } from "../Utils/mappings";
import { BOARD_HEIGHT, BOARD_WIDTH, DICE_ID_HEIGHT, DICE_ID_WIDTH, TILE_HEIGHT, TILE_WIDTH } from "../Utils/settings";
import { constructBuilding, constructRoad } from "../Functions/game";
import { calculateDiceIdPositions, calculateNodePositions, calculatePortPositions, calculateRoadPositions, calculateTilePositions, drawNode, drawRoad, getFlattenedDesertIndex } from "../Functions/utility";
import { gameActions } from "../Redux/Slices/GameSlice";

const GameBoard = () => {
  const imageRef = useRef(null);
  const dispatch = useDispatch();
  const [boardCoords, setBoardCoords] = useState([]);
  const [flattenedDesertIndex, setFlattenedDesertIndex] = useState(-1);
  const
    {
      tileOrder,
      diceIdOrder,
      portOrder,
      positionedTiles,
      positionedNodes,
      positionedRoads,
      positionedDiceIds,
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
    if (boardCoords.length > 0 && tileOrder) {

      const positionedTiles = calculateTilePositions(tileOrder, boardCoords[0], boardCoords[1]);
      const positionedNodes = calculateNodePositions(positionedTiles);
      const positionedRoads = calculateRoadPositions(positionedNodes);
      const positionedDiceIds = calculateDiceIdPositions(positionedTiles, diceIdOrder);
      // const positionedPorts = calculatePortPositions(boardCoords[0], boardCoords[1]); - FOR THE TIME BEING, NOT RANDOMIZING PORTS
      setFlattenedDesertIndex(getFlattenedDesertIndex(tileOrder));

      dispatch(gameActions.setPositionData({
        positionedNodes,
        positionedTiles,
        positionedRoads,
        positionedDiceIds,
      }));
    }
  }, [boardCoords, tileOrder]);

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
          width: BOARD_WIDTH,
          height: BOARD_HEIGHT,
        }}
      >
        <img
          src={BOARD_BORDER_PATH}
          alt="board-border"
          ref={imageRef}
          style={{
            width: BOARD_WIDTH,
            height: BOARD_HEIGHT,
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
        {
          positionedDiceIds
          &&
          positionedDiceIds.flat().map((diceId, i) => {
            if(i !== flattenedDesertIndex) {
              return (
                <img
                  key={i}
                  data-id={diceId.idVariant}
                  src={DICE_ID_PATHS[diceId.id]}
                  style={{
                    position: 'absolute',
                    left: diceId.x,
                    top: diceId.y,
                    width: DICE_ID_WIDTH,
                    height: DICE_ID_HEIGHT,
                    zIndex: 2
                  }}
                />
              )
            }
          })
        }

        <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none">
          {
            roadData && positionedRoads
            &&
            Object.keys(positionedRoads).map((roadNumber, index) => drawRoad(roadNumber, roadData, positionedRoads))
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