import { DECREMENT, INCREMENT } from "./actionTypes";

export const increaseAction = step => ({
  type: INCREMENT,
  step: step
});

export const decreaseAction = step => ({
  type: DECREMENT,
  step: step
});
