import { put, takeLatest } from "redux-saga/effects";
import * as actionTypes from "../actions/actionTypes";
import { Api } from "./Api";

/**
|--------------------------------------------------
| fetch
|--------------------------------------------------
*/
function* fetchProducts() {
  try {
    const receivedProducts = yield Api.getProductsFromApi();
    yield put({
      type: actionTypes.PRODUCT_FETCHs_SUCCESS,
      receivedProducts
    });
  } catch (error) {
    yield put({
      type: actionTypes.PRODUCT_FETCHs_ERROR,
      error
    });
  }
}

export function* watchFetchProducts() {
  yield takeLatest(actionTypes.PRODUCT_FETCHs, fetchProducts);
}

/**
|--------------------------------------------------
| add new product
|--------------------------------------------------
*/
function* createProduct(action) {
  try {
    const result = yield Api.createProductFromApi(action.newProduct);

    if (result) {
      yield put({ type: actionTypes.PRODUCT_FETCHs, sort: "desc" });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* watchCreateProduct() {
  yield takeLatest(actionTypes.PRODUCT_CREATE, createProduct);
}

/**
|--------------------------------------------------
| update product
|--------------------------------------------------
*/
function* updateProduct(action) {
  try {
    const result = yield Api.updateProductFromApi(action.updateProduct);
    if (result) {
      yield put({
        type: actionTypes.PRODUCT_UPDATE_SUCCESS,
        updateProduct: action.updateProduct
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* watchUpdateProduct() {
  yield takeLatest(actionTypes.PRODUCT_UPDATE, updateProduct);
}

/**
|--------------------------------------------------
| delete product
|--------------------------------------------------
*/
function* deleteProduct(action) {
  try {
    const result = yield Api.deleteProductFromApi(action.deleteProduct);
    if (result) {
      yield put({
        type: actionTypes.PRODUCT_DELETE_SUCCESS,
        deleteProduct: action.deleteProduct
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* watchdeleteProduct() {
  yield takeLatest(actionTypes.PRODUCT_DELETE, deleteProduct);
}
