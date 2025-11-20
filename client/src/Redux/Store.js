import { configureStore } from "@reduxjs/toolkit";
import applicationAlertSlice from "./Slices/ApplicationAlertSlice";
import gameSlice from "./Slices/GameSlice";
import metaDataSlice from "./Slices/MetaDataSlice";
import PlayerSlice from "./Slices/PlayerSlice";
import userSlice from "./Slices/UserSlice";

const Store = configureStore(
  {
    reducer: {
      userData: userSlice.reducer,
      gameData: gameSlice.reducer,
      metaData: metaDataSlice.reducer,
      applicationAlert: applicationAlertSlice.reducer,
      playerData: PlayerSlice.reducer,
    }
  }
);

export default Store;