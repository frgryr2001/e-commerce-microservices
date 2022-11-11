import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";

import { persistor, store } from "./redux/store";
import { Provider } from "react-redux";

import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import "./sass/index.scss";
import "antd/dist/antd.css";
import { PersistGate } from "redux-persist/lib/integration/react";
import Layout from "./components/Layout";
import "react-toastify/dist/ReactToastify.css";
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
