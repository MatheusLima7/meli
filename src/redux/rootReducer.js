import { combineReducers } from "redux";

import productsReducer from "./products/reducer";

const rootReducer = combineReducers({
  products: productsReducer,
});

export default rootReducer;
