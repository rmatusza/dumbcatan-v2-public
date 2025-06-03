import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slices/UserSlice";
import metaDataSlice from "./Slices/MetaDataSlice";
import applicationErrorsSlice from "./Slices/ApplicationErrorsSlice";

const Store = configureStore(
  {
    reducer: {
      userData: userSlice.reducer,
      metaData: metaDataSlice.reducer,
      applicationErrors: applicationErrorsSlice.reducer,
    }
  }
);

export default Store;