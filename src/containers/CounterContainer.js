import { connect } from "react-redux";
import CounterComponent from "../components/CounterComponent";

import { increaseAction, decreaseAction } from "../actions";

const mapStateToProps = state => {
  return {
    times: state.CounterReducers ? state.CounterReducers : 0
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIncrement: step => {
      console.log(step);

      dispatch(increaseAction(step));
    },
    onDecrement: step => {
      dispatch(decreaseAction(step));
    }
  };
};

const CounterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CounterComponent);
export default CounterContainer;
