import ProductsTypes from "./types";

const initialState = {
  author: {
    name: "Matheus",
    lastname: "Lima",
  },
  categories: [],
  items: [],
  isFetching: false,
  errorMessage: undefined,
  productDetail: {
    author: {
      name: "Matheus",
      lastname: "Lima",
    },
    item: {
      id: "",
      title: "",
      price: {
        currency: "",
        amount: 0,
        decimals: 0,
      },
      picture: "",
      condition: "",
      free_shipping: true,
      sold_quantity: 500,
      description: "",
    },
  },
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ProductsTypes.FETCH_PRODUCTS_START:
      return {
        ...state,
        isFetching: true,
      };

    case ProductsTypes.FETCH_PRODUCTS_SUCCES:
      return {
        ...state,
        isFetching: false,
        ...action.payload,
      };

    case ProductsTypes.FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };

    case ProductsTypes.FETCH_PRODUCT_DETAIL_START:
      return {
        ...state,
        isFetching: true,
      };

    case ProductsTypes.FETCH_PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        isFetching: false,
        productDetail: action.payload,
      };

    case ProductsTypes.FETCH_PRODUCT_DETAIL_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default productsReducer;
