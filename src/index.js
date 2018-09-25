import React from 'react';
import ReactDOM from 'react-dom';
import Record from './components/recording';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>REACT PERMISSION</h1>
        <Record />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
