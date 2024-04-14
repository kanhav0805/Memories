import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { reducers } from "./reducers";
import App from "./App";

//for creating redux store
const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <GoogleOAuthProvider
      clientId={
        "862149369080-fmqf137s96q26beu0ovmunv638t9em1e.apps.googleusercontent.com"
      }
    >
      <App />
    </GoogleOAuthProvider>
  </Provider>,
  document.getElementById("root")
);
