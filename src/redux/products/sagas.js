import { takeLatest, call, put, all } from "redux-saga/effects";

import * as services from "../../utils/services";
import {
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchProductDetailSuccess,
  fetchProductDetailFailure,
} from "./actions";
import ProductsTypes from "./types";

export function* fetchProductsAsync(action) {
  try {
    let response = yield call(services.getProducts, action.payload);
    if (!action.payload) {
      response.data.items = [];
    }
    yield put(fetchProductsSuccess(response.data));
  } catch (error) {
    yield put(fetchProductsFailure(error.message));
  }
}

export function* fetchProductDetailAsync(action) {
  console.log("fetchProductDetailAsyncaction", action);
  try {
    let response = yield call(services.getProductById, action.payload);
    console.log("fetchProductDetailAsyncresponse", response);
    yield put(fetchProductDetailSuccess(response.data));
  } catch (error) {
    console.log("fetchProductDetailAsyncresponseerror", error);
    yield put(fetchProductDetailFailure(error.message));
  }
}

export function* fetchProductsStart() {
  yield takeLatest(ProductsTypes.FETCH_PRODUCTS_START, fetchProductsAsync);
  yield takeLatest(
    ProductsTypes.FETCH_PRODUCT_DETAIL_START,
    fetchProductDetailAsync
  );
}

export function* productsSagas() {
  yield all([call(fetchProductsStart)]);
}
