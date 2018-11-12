import { fork, all } from "redux-saga/effects";
import { default as todoSaga } from "./modules/todo/sagas";

export default function* rootSaga() {
  yield all([fork(todoSaga.watchFetchTodos)]);
}
