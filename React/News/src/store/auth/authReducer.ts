import { TActionTypes } from "./auth.type";

// Actions
export const ACTION_LOGIN = "ACTION_LOGIN";
export const ACTION_LOGOUT = "ACTION_LOGOUT";

// ActionsCreators
export const loginAction = (value: { token: string }) => {
  return {
    type: ACTION_LOGIN,
    payload: value,
  } as const;
};

export const logoutAction = () => {
  return {
    type: ACTION_LOGOUT,
  } as const;
};

// Reducers
export const authReducer = (state = { access: false }, action: TActionTypes) => {
  switch (action.type) {
    case ACTION_LOGIN:
      return { ...state, access: true };
    case ACTION_LOGOUT:
      return { ...state, access: false };
    default:
      return state;
  }
};
