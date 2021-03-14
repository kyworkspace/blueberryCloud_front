import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
import reducers from '../redux/index';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    reducers,
    compose(
      applyMiddleware(sagaMiddleware,promiseMiddleware,ReduxThunk),
      window.devToolsExtension
        ? window.devToolsExtension()
        : function (f) {
            return f;
          }
    )
  );

export default store;