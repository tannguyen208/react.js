import { all } from 'redux-saga/effects';

import { sayHello } from './CounterSage';
import { watchIncrement, watchDecrement } from './CounterSage';

export default function* rootSaga() {
  yield all([
    sayHello(),
    watchIncrement(),
    watchDecrement()
  ]);
}



