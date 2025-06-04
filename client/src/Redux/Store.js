import { configureStore } from "@reduxjs/toolkit";
import applicationAlertSlice from "./Slices/ApplicationAlertSlice";
import metaDataSlice from "./Slices/MetaDataSlice";
import userSlice from "./Slices/UserSlice";

const Store = configureStore(
  {
    reducer: {
      userData: userSlice.reducer,
      metaData: metaDataSlice.reducer,
      applicationAlert: applicationAlertSlice.reducer,
    }
  }
);

export default Store;