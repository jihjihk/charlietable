import React, { Component } from 'react';
//import 'font-awesome/css/font-awesome.css';
//import 'normalize.css/normalize.css';

//Added as part of routing schema
//-----------------------------------------//

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

//-----------------------------------------//


import './index.css';
import Home from './scenes/Home';
import Dining from './scenes/Dining';


//before, this just reterned <Home />
export default class App extends Component {
  render() {
    return (
    	 <Router>
		    <div>
		      <Route exact path="/" component={Home}/>
		      <Route path="/Dining" component={Dining}/>
		    </div>
		</Router>
    );
  }
}
