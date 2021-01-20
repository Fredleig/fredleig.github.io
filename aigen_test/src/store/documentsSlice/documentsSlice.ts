import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TParamDocs } from "../../containers/Searsh/Searsh";
import { ajax } from "../../utils/Ajax";

type TInitialState = {
  data: never[];
  error?: any;
};

export const getDocuments = createAsyncThunk(
  "documents/users",
  async (arg: { url: string; params: TParamDocs }) => {
    const data = await ajax.get("documents", { params: arg.params });
    return data.data;
  }
);

const initialState: TInitialState = {
  data: [],
  error: undefined,
};

const documents = createSlice({
  name: "documents",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDocuments.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default documents.reducer;
