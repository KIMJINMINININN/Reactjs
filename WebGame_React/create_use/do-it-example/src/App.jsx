import React, { Component } from 'react';
import './App.css';
import Tictacto from './JSX/7.tictacto/Tictacto';

class App extends Component {
  render() {
    return (
      <div className="body">
        <Tictacto />
      </div>
    );
  }
}

export default App;
