import { put, call, takeEvery, takeLatest, fork } from "redux-saga/effects";
import * as actionTypes from "../actions/actionTypes";
import { API } from "../helpers/api";

export function* fetchProducts(action) {
  try {
    const products = yield call(fetch(API + "products"), );
  } catch (error) {
    yield put({ type: actionTypes.ERROR, message: error.message });
  }
}
