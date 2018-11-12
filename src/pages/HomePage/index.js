import React from "react";
import Todo from "src/modules/todo";

class HomePage extends React.Component {
  render() {
    return (
      <div>
        Home page
        <Todo />
      </div>
    );
  }
}

export default HomePage;
