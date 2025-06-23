import { configureStore } from "@reduxjs/toolkit";
import applicationAlertSlice from "./Slices/ApplicationAlertSlice";
import metaDataSlice from "./Slices/MetaDataSlice";
import userSlice from "./Slices/UserSlice";
import gameSlice from "./Slices/GameSlice";

const Store = configureStore(
  {
    reducer: {
      userData: userSlice.reducer,
      gameData: gameSlice.reducer,
      metaData: metaDataSlice.reducer,
      applicationAlert: applicationAlertSlice.reducer,
    }
  }
);

export default Store;