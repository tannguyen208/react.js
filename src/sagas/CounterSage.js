import { takeEvery } from 'redux-saga/effects';
import { INCREMENT, DECREMENT } from '../actions/actionTypes';

export function* sayHello() {
  console.log("hello world! ");
}
/**
|--------------------------------------------------
| increment
|--------------------------------------------------
*/
export function* watchIncrement() {
  yield takeEvery(INCREMENT, () => {
    console.log("redux-sage increment! ");
  })
}

/**
|--------------------------------------------------
| decrement
|--------------------------------------------------
*/
function* decrement() {
  console.log("redux-sage decrement! ");
}

export function* watchDecrement() {
  yield takeEvery(DECREMENT, decrement)
}