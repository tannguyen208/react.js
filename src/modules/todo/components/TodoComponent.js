import React from "react";

class TodoComponent extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  componentDidMount = () => {
    this.props.dispatch(this.props.getTodos());
  };

  render = () => {
    return <div>TodoComponent</div>;
  };
}
export default TodoComponent;
