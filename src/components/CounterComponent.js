import React, { Component } from 'react';

class CouterComponent extends Component {
  render() {
    return (
      <div>
        <h1>Redux sage</h1>

        <button onClick={() => { this.props.onDecrement(2) }}>Decrement --</button>
        <button onClick={() => { this.props.onIncrement(2) }}>Increment ++</button>

        <p>couter: {this.props.times}</p>
      </div>
    );
  }
}

export default CouterComponent;