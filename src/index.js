import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import RouterApp from "router/RouterApp";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import store from "store/index";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterApp />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
