import { combineReducers } from "redux";
import storeData from "./reducer";

import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";

export default createStore(
  combineReducers({ storeData }),
  applyMiddleware(thunkMiddleware)
);
