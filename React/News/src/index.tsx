import * as React from "react";
import * as ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { ApolloProvider } from "@apollo/client";
import { createBrowserHistory } from "history";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
// my import
import "./index.sass";
import getStore from "./store/store";
import RenderRoute from "./services/RouteProvider/RenderRoutes";
import { client } from "./configs/configApollo";

const history = createBrowserHistory();
const store = getStore(history);

const wrapper = (
  <Provider store={store}>
    <ApolloProvider client={client}>
      <ConnectedRouter history={history}>
        <RenderRoute />
      </ConnectedRouter>
    </ApolloProvider>
  </Provider>
);

ReactDOM.render(wrapper, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
