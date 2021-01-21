import { configureStore } from "@reduxjs/toolkit";
import dataRetrieval from "./dataRetrieval/dataRetrieval";
import breadcrumbsSlice from "./breadcrumbs/breadcrumbsSlice";

export type RootState = ReturnType<typeof store.getState>;

const reducers = {
  dataRetrieval,
  breadcrumbsSlice,
};

export const store = configureStore({
  reducer: reducers,
});
