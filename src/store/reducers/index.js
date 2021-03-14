// import { createStore as reduxCreateStore } from 'redux'
import { combineReducers } from "redux";
import searchResult from "./storeReducer";

export default combineReducers({ searchResult  });
