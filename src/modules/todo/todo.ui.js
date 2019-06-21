import React from "react";

class TodoUI extends React.Component {
  componentDidMount() {
    this.props.fetchTodos();
  }

  render() {
    const { todo } = this.props;
    console.log("TCL: TodoUI -> render -> todo", todo);
    
    return null;
  }
}

export default TodoUI;
