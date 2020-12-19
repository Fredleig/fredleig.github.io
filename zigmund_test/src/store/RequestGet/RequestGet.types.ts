import { actionGetError, actionGetSuccess, actionLoading } from "./RequestGet";

export type TInitialState = {
  loading: boolean;
  data?: any;
  error?: any;
};

export type TActionTypes =
    | ReturnType<typeof actionLoading>
    | ReturnType<typeof actionGetSuccess>
    | ReturnType<typeof actionGetError>
