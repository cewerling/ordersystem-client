import React from 'react';
// Material UI Imports:
//import {______, ________} from '@material-ui/core';   // 
//import {______, _______} from '@material-ui/core/SvgIcon'; //https://material-ui.com/components/icons/#font-vs-svg-which-approach-to-use
//import {______, ________} from '@material-ui/icons';   // https://material-ui.com/components/icons/#font-icons
import 'typeface-roboto';         // https://material-ui.com/components/typography/#general

import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;