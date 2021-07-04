import ProductsTypes from "./types";

export const fetchProductsStart = (text) => {
  return {
    type: ProductsTypes.FETCH_PRODUCTS_START,
    payload: text,
  };
};

export const fetchProductsSuccess = (products) => {
  return {
    type: ProductsTypes.FETCH_PRODUCTS_SUCCES,
    payload: products,
  };
};

export const fetchProductsFailure = (errorMessage) => {
  return {
    type: ProductsTypes.FETCH_PRODUCTS_FAILURE,
    payload: errorMessage,
  };
};

// DETAIL

export const fetchProductDetailStart = (id) => {
  return {
    type: ProductsTypes.FETCH_PRODUCT_DETAIL_START,
    payload: id,
  };
};

export const fetchProductDetailSuccess = (products) => {
  return {
    type: ProductsTypes.FETCH_PRODUCT_DETAIL_SUCCESS,
    payload: products,
  };
};

export const fetchProductDetailFailure = (errorMessage) => {
  return {
    type: ProductsTypes.FETCH_PRODUCT_DETAIL_FAILURE,
    payload: errorMessage,
  };
};
