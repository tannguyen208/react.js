import { combineReducers } from '@reduxjs/toolkit'
// reducers
import counterSlice from './counter/counterSlice'

export default combineReducers({
  counter: counterSlice.reducer,
})
