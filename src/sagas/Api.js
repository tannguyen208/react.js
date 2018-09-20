import { call } from "redux-saga/effects";
const api_fetch_products = "http://localhost:3001/products";
const api_fetch_product = "http://localhost:3001/products/";
const api_create_product = "http://localhost:3001/products/create";
const api_update_product = "http://localhost:3001/products/update/";
const api_delete_product = "http://localhost:3001/products/delete/";

function* getProductsFromApi() {
  const res = yield call(fetch, api_fetch_products);
  const resJSON = yield call([res, res.json]);

  return resJSON.status === 200 ? resJSON.data : [];
}

function* createProductFromApi(newProduct) {
  const res = yield call(fetch, api_create_product, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: newProduct.name,
      price: newProduct.price,
      author: newProduct.author
    })
  });

  const resJSON = yield call([res, res.json]);

  return yield resJSON.status === 200; // true or false
}

function* updateProductFromApi(updateProduct) {
  const res = yield call(fetch, api_update_product + updateProduct._id, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: updateProduct.name,
      price: updateProduct.price,
      author: updateProduct.author
    })
  });

  const resJSON = yield call([res, res.json]);

  return yield resJSON.status === 200; // true or false
}

function* deleteProductFromApi(deleteProduct) {
  const res = yield call(fetch, api_delete_product + deleteProduct._id, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });

  const resJSON = yield call([res, res.json]);

  return yield resJSON.status === 200; // true or false
}

export const Api = {
  getProductsFromApi,
  createProductFromApi,
  updateProductFromApi,
  deleteProductFromApi
};
