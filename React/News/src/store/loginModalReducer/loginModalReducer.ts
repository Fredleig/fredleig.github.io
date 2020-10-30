import { TActionTypes } from "./loginModal.type";

// Actions
const ACTION_LOGIN_MODAL = "ACTION_LOGIN_MODAL";

// ActionsCreators
export const loginModalAction = (value: boolean) => {
  return {
    type: ACTION_LOGIN_MODAL,
    payload: value,
  } as const;
};

// Reducers
export const loginModalReducer = (state = { isOpenLoginModal: false }, action: TActionTypes) => {
  if (action.type === ACTION_LOGIN_MODAL) {
    return { ...state, isOpenLoginModal: action.payload };
  }
  return state;
};
