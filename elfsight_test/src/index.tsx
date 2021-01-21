import React from "react";
import ReactDOM from "react-dom";
import "./index.sass";
import reportWebVitals from "./reportWebVitals";
import { createBrowserHistory } from "history";
import { Router } from "react-router";
import { store } from "./store";
import { Provider } from "react-redux";
import App from "./App";

const history = createBrowserHistory();
const Index: React.FC = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  );
};

ReactDOM.render(<Index />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
