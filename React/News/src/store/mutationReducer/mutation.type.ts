import { mutationAction, mutationActionError, mutationActionLoading } from "./mutationReducer";

export type TActionTypes =
  | ReturnType<typeof mutationActionLoading>
  | ReturnType<typeof mutationAction>
  | ReturnType<typeof mutationActionError>;
