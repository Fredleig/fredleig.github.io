import { createStore, combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
//* Import Reducers

// Объединение Редюсеров
const reducers = combineReducers({
  form: reduxFormReducer,
});

export default createStore(reducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()); // to Index
