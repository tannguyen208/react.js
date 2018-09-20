import { connect } from "react-redux";
import ProductsComponent from "../components/ProductsComponent";
import {
  fetchProductsAction,
  createProductAction,
  updateProductdAction,
  deleteProductdAction
} from "../actions/ProductsAction";

const mapStateToProps = state => {
  return {
    products: state.ProductsReducer
  };
};

const mapDispatchToProps = dispatch => ({
  onFetchProducts: () => {
    dispatch(fetchProductsAction());
  },
  onCreateProduct: newProduct => {
    dispatch(createProductAction(newProduct));
  },
  onUpdateProduct: updateProduct => {
    dispatch(updateProductdAction(updateProduct));
  },
  onDeleteProduct: deleteProduct => {
    dispatch(deleteProductdAction(deleteProduct));
  }
});

const ProductsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsComponent);

export default ProductsContainer;
