import { deleteData, queryAction, queryActionError, queryActionLoading } from "./queryReducer";

export type TInitialState = {
  loading: boolean;
  data?: any;
};

export type TActionTypes =
  | ReturnType<typeof queryActionLoading>
  | ReturnType<typeof queryAction>
  | ReturnType<typeof queryActionError>
  | ReturnType<typeof deleteData>;
