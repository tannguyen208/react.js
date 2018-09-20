import * as actionTypes from "./actionTypes";

/**
|--------------------------------------------------
| ACTIONS
|--------------------------------------------------
*/
export const fetchProductsAction = sort => ({
  type: actionTypes.PRODUCT_FETCHs,
  sort
});

export const createProductAction = newProduct => ({
  type: actionTypes.PRODUCT_CREATE,
  newProduct
});

export const updateProductdAction = updateProduct => ({
  type: actionTypes.PRODUCT_UPDATE,
  updateProduct
});

export const deleteProductdAction = deleteProduct => ({
  type: actionTypes.PRODUCT_DELETE,
  deleteProduct
});

/**
|--------------------------------------------------
| SUCCESS OR ERROR
|--------------------------------------------------
*/
export const fetchSuccessAction = receivedProducts => ({
  type: actionTypes.PRODUCT_FETCHs_SUCCESS,
  receivedProducts
});

export const fetchFailedAction = error => ({
  type: actionTypes.PRODUCT_FETCHs_ERROR,
  error
});

export const updateProductSuccessAction = updateProduct => ({
  type: actionTypes.PRODUCT_UPDATE_SUCCESS,
  updateProduct
});

export const deleteProductSuccessAction = deleteProduct => ({
  type: actionTypes.PRODUCT_DELETE_SUCCESS,
  deleteProduct
});
