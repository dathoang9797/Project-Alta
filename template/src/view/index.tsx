import React from "react";
import store, { persistor } from "@core/store/redux";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter as Router } from "react-router-dom";
import App from "./App";
import { PersistGate } from "redux-persist/integration/react";
// import 'package:unicons/unicons.dart';
ReactDOM.render(
  <Router>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </Router>,
  document.getElementById("root")
);
