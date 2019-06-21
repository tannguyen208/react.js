import { fork, all } from "redux-saga/effects";

// tag:: sagas
import todoSaga from "../modules/todo/todo.saga";

export default function* combineSaga() {
  yield all([
    fork(todoSaga.watchFetchTodos)
  ]);
};
