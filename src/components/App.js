import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App__header">
          <h1 className="App__title">Cryptab</h1>
        </header>
        <p className="App__intro">Cryptocurrencies Ranked by Market Cap</p>
      </div>
    );
  }
}

export default App;
