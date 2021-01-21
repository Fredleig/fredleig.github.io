import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ENamesRoute } from "../../utils/routes";

export type TBreadcrumbsInitialState = {
  dynamicNames: {
    [K in ENamesRoute]?: string;
  };
};

const initialState: TBreadcrumbsInitialState = {
  dynamicNames: {},
};

const breadcrumbsSlice = createSlice({
  name: "breadcrumbsSlice",
  initialState: initialState,
  reducers: {
    setDynamicNames(
      state,
      action: PayloadAction<{ name: ENamesRoute; value: string }[]>
    ) {
      state.dynamicNames = {};
      action.payload.forEach(
        (item) => (state.dynamicNames[item.name] = item.value)
      );
    },
  },
});

export const { setDynamicNames } = breadcrumbsSlice.actions;
export default breadcrumbsSlice.reducer;
