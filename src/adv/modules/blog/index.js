import React, { Component } from "react";
import { Context } from "../../context";

export default class Blog extends Component {
  render() {
    return (
      <Context.Consumer>
        {context =>
          context.map((blog, index) => (
            <React.Fragment key={index}>
              <h3>{blog.name}</h3>
              <img width={"100px"} src={blog.image} />
            </React.Fragment>
          ))
        }
      </Context.Consumer>
    );
  }
}
