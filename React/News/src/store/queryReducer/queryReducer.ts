import { TActionTypes, TInitialState } from "./query.type";

// Actions
const ACTION_LOADING = "ACTION_LOADING";
const ACTION_QUERY = "ACTION_QUERY";
const ACTION_QUERY_ERROR = "ACTION_QUERY_ERROR";
const ACTION_REMOVE_DATA = "ACTION_REMOVE_DATA";

// ActionsCreators
export const queryActionLoading = () => {
  return { type: ACTION_LOADING } as const;
};

export const queryAction = (data) => {
  return {
    type: ACTION_QUERY,
    payload: data.data,
  } as const;
};

export const queryActionError = (error) => {
  return {
    type: ACTION_QUERY_ERROR,
    payload: error,
  } as const;
};

export const deleteData = () => {
  return {
    type: ACTION_REMOVE_DATA,
  } as const;
};

// Reducers
export const queryReducer = (state: TInitialState = { loading: false }, action: TActionTypes) => {
  switch (action.type) {
    case ACTION_REMOVE_DATA:
      return state.data ? delete state.data : { ...state };

    case ACTION_LOADING:
      return { ...state, loading: true };

    case ACTION_QUERY:
      return {
        ...state,
        data: state.data ? { ...state.data, ...action.payload } : action.payload,
        loading: false,
      };

    case ACTION_QUERY_ERROR:
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
};
