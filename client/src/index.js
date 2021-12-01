import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createStore, applyMiddleware } from "redux";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import reducers from "./reducer";
import thunk from "redux-thunk";
import axios from "axios";

let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
let store = createStoreWithMiddleware(reducers);

setInterval(() => {
  if (localStorage.getItem("session_id")) {
    var config = {
      method: 'post',
      url: 'http://localhost:8080/refresh',
      headers: { 
        'Authorization': 'Bearer ' + localStorage.getItem("session_id_refresh")
      }
    };
    
    axios(config)
    .then(function (response) {
      localStorage.setItem("session_id", response.data.token)
      localStorage.setItem("session_id_refresh", response.data.refresh)
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}, 30000);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
