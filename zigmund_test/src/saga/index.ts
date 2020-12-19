import { all } from "redux-saga/effects";
import watcherLoadData from "./RequestGet/RequestGet";

export default function* watchers() {
  yield all([watcherLoadData()])
}
