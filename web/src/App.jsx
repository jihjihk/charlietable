import React, { Component } from 'react';
//import 'font-awesome/css/font-awesome.css';
//import 'normalize.css/normalize.css';

import './index.css';
import Home from './scenes/Home';
import Dining from './scenes/Dining'

export default class App extends Component {
  render() {
    return (
      <Dining />
    );
  }
}
