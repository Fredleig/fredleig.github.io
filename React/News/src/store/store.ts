import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import {reducer as reduxFormReducer} from "redux-form";
import logger from 'redux-logger'
import thunk from "redux-thunk";
import {connectRouter, routerMiddleware} from 'connected-react-router'

//* Import Reducers
import {queryReducer} from "./queryReducer/queryReducer";
import {mutationReducer} from "./mutationReducer/mutationReducer";
import {loginModalReducer} from "./loginModalReducer/loginModalReducer";
import {authReducer} from "./auth/authReducer";
import {createLogicMiddleware} from "redux-logic";
import authLogic from "./auth/authLogic";

// Объединение Редюсеров
const reducers = (history) => combineReducers({
  form: reduxFormReducer,
  router: connectRouter(history),
  queryReducer,
  mutationReducer,
  loginModalReducer,
  authReducer
});

// Промежуточный функционал редакса
const logicMiddleware = createLogicMiddleware(authLogic);

function getStore(history) {
  return createStore(
    reducers(history),
    compose(
      applyMiddleware(thunk, logger, routerMiddleware(history), logicMiddleware),
      //@ts-ignore
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
}

export default getStore
