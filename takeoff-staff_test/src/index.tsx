import React from "react";
import ReactDOM from "react-dom";
import "./index.sass";
import reportWebVitals from "./reportWebVitals";
import "antd/dist/antd.css";
import { createBrowserHistory } from "history";
import { Redirect, Route, Router, Switch } from "react-router";
import AuthorizationPage from "./containers/AutorizationPage/AuthorizationPage";
import { contacts, root } from "./utils/paths/paths";
import Contacts from "./containers/Contacts/Contacts";

const history = createBrowserHistory();
const Index: React.FC = () => {
  const autRender = () => {
    if (!!localStorage.getItem("userName")) {
      return <Contacts />;
    } else {
      return <Redirect exact={true} to={root} />;
    }
  };

  return (
    <Router history={history}>
      <Switch>
        <Route exact={true} path={root} component={AuthorizationPage} />
        <Route path={contacts} render={autRender} />
        <Route component={AuthorizationPage} />
      </Switch>
    </Router>
  );
};
ReactDOM.render(<Index />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
