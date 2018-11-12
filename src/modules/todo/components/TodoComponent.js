import React, { memo } from "react";

const TodoComponent = memo(
  class T extends React.Component {
    componentDidMount = () => {
      this.props.fetchTodos();
    };

    renderTodos = todos => (
      <ul>
        {todos.map(todo => (
          <li>
            {todo.title} - {todo.description}
          </li>
        ))}
      </ul>
    );

    renderError = () => <h1>ERROR</h1>;

    renderLoading = () => <h1>LOADING ...</h1>;

    render = () => {
      let { isFetching, data } = this.props;
      if (!isFetching) {
        return data.status === "success"
          ? this.renderTodos(data.todos)
          : this.renderError();
      }

      return this.renderLoading();
    };
  }
);

export default TodoComponent;
