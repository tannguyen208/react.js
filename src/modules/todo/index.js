import { connect } from "react-redux";
import { FETCH_TODOS } from "./actions/types";
import { default as TodoComponent } from "./components/TodoComponent";
import { createLoadingSelector } from "src/components/functions/loading/loadingSelectors";
import { fetchTodos } from "./actions";

// Show loading on FETCH_TODOS_REQUEST
const loadingSelector = createLoadingSelector([FETCH_TODOS]);
const mapStateToProps = state => ({
  data: state.todoReducer,
  isFetching: loadingSelector(state)
});

const mapDispatchToProps = {
  fetchTodos
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoComponent);
