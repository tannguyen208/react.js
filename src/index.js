import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

// redux
import rootReducers from './reducers';
import CounterContainer from './containers/CounterContainer';

// redux saga
import createSageMiddleware from 'redux-saga';
import rootSaga from './sagas';

const sageMiddleware = createSageMiddleware();

let store = createStore(rootReducers, applyMiddleware(sageMiddleware));

const App = () =>
  (<Provider store={store}>
    <CounterContainer />
  </Provider>)

sageMiddleware.run(rootSaga);

ReactDOM.render(<App />, document.getElementById('root'));
