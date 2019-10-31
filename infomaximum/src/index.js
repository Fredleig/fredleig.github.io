import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import {ApolloProvider} from 'react-apollo';
import {Provider} from "react-redux";
import * as serviceWorker from './serviceWorker';

import './index.sass';
import App from './App';
import store from './Store';
// import {client} from './client';
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: 'https://api.graph.cool/simple/v1/ciyz901en4j590185wkmexyex',
});

const wrapper = (
    <Provider store={store}>
        <ApolloProvider client={client}>
          <BrowserRouter>
          <App/>
        </BrowserRouter>
        </ApolloProvider>
    </Provider>
);

ReactDOM.render(wrapper, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();