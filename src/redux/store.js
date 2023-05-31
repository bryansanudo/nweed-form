import { configureStore, combineReducers } from "@reduxjs/toolkit";
import publicationReducer from "@/redux/slice/publicationSlice";

const rootReducer = combineReducers({
  publication: publicationReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
