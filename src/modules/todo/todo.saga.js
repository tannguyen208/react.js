import { put, delay, takeLatest } from "redux-saga/effects";
import * as actionTypes from "./todo.actionType";
import request from "../../utils/request";

function* fetchTodos() {
  try {
    const response = yield request("https://reqres.in/api/users");
    delay(2000);

    yield put({
      type: actionTypes.FETCH_TODOS_SUCCESS,
      status: "success",
      payload: response.data
    });
  } catch (error) {
    console.log("TCL: function*fetchTodos -> error", error);
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
