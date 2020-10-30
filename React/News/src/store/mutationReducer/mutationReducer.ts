import { TActionTypes } from "./mutation.type";
// Actions
const ACTION_LOADING_MUTATION = "ACTION_LOADING_MUTATION";
const ACTION_MUTATION = "ACTION_MUTATION";
const ACTION_MUTATION_ERROR = "ACTION_MUTATION_ERROR";

// ActionsCreators
export const mutationActionLoading = () => {
  return { type: ACTION_LOADING_MUTATION } as const;
};

export const mutationAction = (data: any) => {
  return {
    type: ACTION_MUTATION,
    payload: data.data,
  } as const;
};

export const mutationActionError = (error: any) => {
  return {
    type: ACTION_MUTATION_ERROR,
    payload: error,
  } as const;
};

// Reducers
export const mutationReducer = (
  state = { loading: false, submitting: false },
  action: TActionTypes
) => {
  switch (action.type) {
    case ACTION_LOADING_MUTATION:
      return { ...state, loading: true, submitting: true };

    case ACTION_MUTATION:
      return { ...state, dataMutation: action.payload, loading: false, submitting: false };

    case ACTION_MUTATION_ERROR:
      return { ...state, error: action.payload, loading: false, submitting: false };

    default:
      return state;
  }
};
