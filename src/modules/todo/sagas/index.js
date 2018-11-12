import { put, takeLatest } from "redux-saga/effects";
import * as actionTypes from "../actions/types";

function* fetchTodos() {
  try {
    const response = yield fetch("http://localhost:3001/todos");
    const responseBody = yield response.json();
    yield put({
      type: actionTypes.FETCH_TODOS_SUCCESS,
      status: "success",
      payload: responseBody
    });
  } catch (error) {
    yield put({
      type: actionTypes.FETCH_TODOS_FAILURE,
      status: "error",
      payload: error
    });
  }
}

function* watchFetchTodos() {
  yield takeLatest(actionTypes.FETCH_TODOS, fetchTodos);
}

export default { watchFetchTodos };
