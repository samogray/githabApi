import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import Icon from './components/icon'
const __svg__ = {path: './components/icon/**/*.svg', name: 'assets/svg/[hash].sprite.svg'};
require('webpack-svgstore-plugin/src/helpers/svgxhr')(__svg__)


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          Sashko!!!!
          <Icon name="blur-ico" width={20} height={20}/>
        </p>
      </div>
    );
  }
}

export default App;
