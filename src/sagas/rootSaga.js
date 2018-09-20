import { call, all, fork } from "redux-saga/effects";
import {
  watchFetchProducts,
  watchCreateProduct,
  watchUpdateProduct,
  watchdeleteProduct
} from "./ProductsSaga";

export default function* rootSaga() {
  // yield call(watchFetchProducts);
  yield [
    fork(watchFetchProducts),
    fork(watchCreateProduct),
    fork(watchUpdateProduct),
    fork(watchdeleteProduct)
  ];
}
