import { connect } from "react-redux";
import { GET_TODOS } from "./actions/types";
import { default as TodoComponent } from "./components/TodoComponent";
import { createLoadingSelector } from "src/components/functions/loading/loadingSelectors";
import { getTodos } from "./actions";

// Show loading on GET_TODOS_REQUEST
const loadingSelector = createLoadingSelector([GET_TODOS]);
const mapStateToProps = state => ({
  todos: state.todoReducer,
  isFetching: loadingSelector(state)
});
const mapDispatchToProps = {
  getTodos
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoComponent);
