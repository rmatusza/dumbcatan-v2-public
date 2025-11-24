import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TILE_PATHS, TILE_IDENTITIES, CUSTOM_STYLES as S, APP_CONTEXT, BACKGROUND_PATHS, APP_ALERT_TYPE, ENDPOINTS } from "../Utils/constants";
import { createGameIcons } from "../Functions/utility";
import Button from "../UI/Button";

const GameIcons = ({ games, buttons, context, animationPaused = false, clickHandler, focusedTileIdx, setFocusedTileIdx }) => {
  const userData = useSelector(state => state.userData);
  const [gameTiles, setGameTiles] = useState(null);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  useEffect(() => {
    if(!initialLoadComplete){
      const gameIcons = createGameIcons(games, TILE_PATHS, TILE_IDENTITIES);
      setGameTiles(gameIcons);
      setFocusedTileIdx(0);
      setInitialLoadComplete(true);
    }
  }, [games]);

  const hoverHandler = (idx) => {
    setFocusedTileIdx(idx);
  };

  return (
    gameTiles ? 
    games.map((game, i) => {
      let isOwner = game.owner === userData.username;
      return (
        <div key={game.gameId} className={`flex flex-col relative w-[400px] h-[400px] m-4 items-center justify-center cursor-pointer ${focusedTileIdx === i && !animationPaused ? 'animate-float-scale' : ''}`} onMouseEnter={() => hoverHandler(i)} onClick={event => clickHandler(event, 'select', game)}>
          <img
            src={gameTiles[i]}
            alt="tile"
            className="absolute top-0 left-0 w-full h-full z-0"
          />

          <div className="w-50 h-50 z-10 text-black text-center p-2 flex flex-col justify-between font-yatra bg-cream/60 backdrop-blur-md rounded">

            <p className="text-3xl">Game ID: {game.gameId}</p>
            <p className="text-lg">Owner: {game.owner}</p>
            <p className="text-lg pb-5">
              Players:{" "}
              {game.playerList.map((player, i) => (
                <span key={i}>{player}{i < game.playerList.length - 1 ? ", " : ""}</span>
              ))}
            </p>

            <div>
              <p>Last Edited: 2025-07-20</p>
            </div>
          </div>
          {
            (isOwner || context === APP_CONTEXT.invites)
            &&
            <div className="w-full flex flex-col items-center z-10 pt-10">
              <Button type={'button'} callBack={clickHandler} {...buttons.a} />
              <Button type={'button'} callBack={clickHandler} {...buttons.b} />
            </div>
          }
        </div>
      )
    })
    :
    <></>
  )
}

export default GameIcons;