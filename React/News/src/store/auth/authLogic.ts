import { createLogic } from "redux-logic";
import { ACTION_LOGIN, ACTION_LOGOUT } from "./authReducer";

const onLogin = createLogic<any, { token: string }>({
  type: ACTION_LOGIN,
  process: function ({ getState, action }, dispatch, done) {
    localStorage.setItem("token", action.payload.token);
    window.location.reload();
    done();
  },
});

const onLogout = createLogic<any>({
  type: ACTION_LOGOUT,
  process({ getState, action }, dispatch, done) {
    localStorage.removeItem("token");
    window.location.reload();
    // console.log(getState().router.location.pathname);
    done();
  },
});

export default [onLogin, onLogout];
