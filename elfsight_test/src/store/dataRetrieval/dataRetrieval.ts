import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import Ajax from "../../utils/Ajax";
import { setDynamicNames } from "../breadcrumbs/breadcrumbsSlice";
import { ENamesRoute } from "../../utils/routes";

type TInitialState = {
  data: never[];
  album?: never;
  user?: never;
  loading: boolean;
  error?: string;
};

const dataRetrievalName = "dataRetrieval";

export const getUsers = createAsyncThunk(
  `${dataRetrievalName}/users`,
  async (arg: undefined = undefined, thunkAPI) => {
    try {
      return await Ajax.GET("users");
    } catch (err) {
      return thunkAPI.rejectWithValue(err.toString());
    }
  }
);

export const getAlbums = createAsyncThunk(
  `${dataRetrievalName}/albums`,
  async (userId: string, thunkAPI) => {
    try {
      const [albums, user] = await Promise.all([
        Ajax.GET(`users/${userId}/albums`),
        Ajax.GET(`users/${userId}`),
      ]);

      for (let index = 0; index < albums.length; index++) {
        const photos = await Ajax.GET(`albums/${albums[index].id}/photos`);
        albums[index].count = photos.length;
        albums[index].image = photos[0].thumbnailUrl;
      }

      await thunkAPI.dispatch(
        setDynamicNames([
          {
            name: ENamesRoute.userName,
            value: user?.username,
          },
        ])
      );
      return { albums, user };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.toString());
    }
  }
);

export const getPhotos = createAsyncThunk(
  `${dataRetrievalName}/photos`,
  async (params: { userId: string; albumId: string }, thunkAPI) => {
    try {
      const [photos, user, album] = await Promise.all([
        Ajax.GET(`albums/${params.albumId}/photos`),
        Ajax.GET(`users/${params.userId}`),
        Ajax.GET(`albums/${params.albumId}`),
      ]);

      await thunkAPI.dispatch(
        setDynamicNames([
          { name: ENamesRoute.albumName, value: album?.title },
          {
            name: ENamesRoute.userName,
            value: user?.username,
          },
        ])
      );
      return { photos, user, album };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.toString());
    }
  }
);

const initialState: TInitialState = {
  data: [],
  album: undefined,
  user: undefined,
  loading: false,
  error: undefined,
};

const dataRetrieval = createSlice({
  name: dataRetrievalName,
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.fulfilled, (state, action) => {
        state.album = undefined;
        state.user = undefined;
        state.error = undefined;
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getUsers.pending, (state) => {
        state.data = [];
        state.loading = true;
      })
      .addCase(getUsers.rejected, (state, action: PayloadAction<any>) => {
        state.album = undefined;
        state.user = undefined;
        state.data = [];
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAlbums.fulfilled, (state, action) => {
        state.album = undefined;
        state.user = action.payload.user;
        state.data = action.payload.albums;
        state.loading = false;
        state.error = undefined;
      })
      .addCase(getAlbums.pending, (state) => {
        state.data = [];
        state.loading = true;
      })
      .addCase(getAlbums.rejected, (state, action: PayloadAction<any>) => {
        state.album = undefined;
        state.user = undefined;
        state.data = [];
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getPhotos.fulfilled, (state, action) => {
        state.album = action.payload.album;
        state.user = action.payload.user;
        state.data = action.payload.photos;
        state.loading = false;
        state.error = undefined;
      })
      .addCase(getPhotos.pending, (state) => {
        state.data = [];
        state.loading = true;
      })
      .addCase(getPhotos.rejected, (state, action: PayloadAction<any>) => {
        state.album = undefined;
        state.user = undefined;
        state.data = [];
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dataRetrieval.reducer;
