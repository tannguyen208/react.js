import * as actionTypes from "../actions/actionTypes";
const initialProducts = [];

export default (products = initialProducts, action) => {
  switch (action.type) {
    case actionTypes.PRODUCT_FETCHs_SUCCESS:
      return action.receivedProducts;

    case actionTypes.PRODUCT_FETCHs_ERROR:
      return [];

    case actionTypes.PRODUCT_UPDATE_SUCCESS:
      // console.log(products);
      return products.map(
        product =>
          product._id === action.updateProduct._id
            ? {
                ...product,
                name: action.updateProduct.name,
                price: action.updateProduct.price,
                author: action.updateProduct.author
              }
            : product
      );

    case actionTypes.PRODUCT_DELETE_SUCCESS:
      return products.filter(
        product => product._id !== action.deleteProduct._id
      );

    default:
      return products;
  }
};
