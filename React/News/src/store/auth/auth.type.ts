import { loginAction, logoutAction } from "./authReducer";

export type TActionTypes = ReturnType<typeof loginAction> | ReturnType<typeof logoutAction>;
