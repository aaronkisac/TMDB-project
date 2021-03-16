import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import RouterApp from "router/RouterApp";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import store from "store/index";
import { SnackbarProvider } from "notistack";

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider>
      <Provider store={store}>
        <RouterApp />
      </Provider>
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
