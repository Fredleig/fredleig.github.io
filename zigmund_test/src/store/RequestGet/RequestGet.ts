import { TActionTypes, TInitialState } from "./RequestGet.types";
import { AxiosRequestConfig } from "axios";

const ACTION_LOADING = "ACTION_LOADING";
const ACTION_GET_SUCCESS = "ACTION_GET_SUCCESS";
const ACTION_GET_ERROR = "ACTION_GET_ERROR";
export const ACTION_GET_REQUEST = "ACTION_GET_REQUEST";

export const actionLoading = () => ({
 type: ACTION_LOADING
} as const);

export const actionGetSuccess = (data: any) => ({
 type: ACTION_GET_SUCCESS,
 payload: data
} as const);

export const actionGetError = (error: any) => ({
 type: ACTION_GET_ERROR,
 payload: error
} as const);

export const actionGetRequest = (params: { url: string, config?: AxiosRequestConfig }) => ({
  type: ACTION_GET_REQUEST,
  payload: params
} as const)

export const getRequestReducer = (state: TInitialState = { loading: false }, action: TActionTypes) => {
  switch (action.type) {
    case ACTION_LOADING:
      return {...state, loading: true};
    case ACTION_GET_SUCCESS:
      delete state.error
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case ACTION_GET_ERROR:
      delete state.data
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}
