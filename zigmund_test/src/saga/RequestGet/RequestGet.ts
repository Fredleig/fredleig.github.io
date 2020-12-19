import { call, put, debounce } from "redux-saga/effects";
import {
  ACTION_GET_REQUEST,
  actionGetError, actionGetRequest,
  actionGetSuccess,
  actionLoading
} from "../../store/RequestGet/RequestGet";
import { API } from "../../utils/API";

type TAction = ReturnType<typeof actionGetRequest>

function loadData(params: TAction["payload"]) {
  return API.get(params.url, params.config)
}

function* workerLoadData(action: TAction) {
  try {
    yield put(actionLoading())
    const { data } = yield call(loadData, action.payload)
    yield put(actionGetSuccess(data))
  } catch (error) {
    yield put(actionGetError(error.response))
  }
}

export default function* watcherLoadData() {
  yield debounce(500, ACTION_GET_REQUEST, workerLoadData)
}
