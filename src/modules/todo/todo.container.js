import { connect } from "react-redux";

import * as actions from "./todo.action";
import TodoUI from "./todo.ui";

const mapStateToProps = state => ({
  todo: state.todo
});

const mapDispatchToProps = dispatch => ({
  fetchTodos: () => dispatch(actions.fetchTodos())
});

const TodoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoUI);

export default TodoContainer;
