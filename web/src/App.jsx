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
import Profile from './scenes/Profile'
// import NewEvent from './scenes/NewEvent // <Route path="/newevent" component={NewEvent}/>



//before, this just returned <Home />
export default class App extends Component {
  render() {
    return (
    	 <Router>
		    <div>
		      <Route exact path="/" component={Home}/>
		      <Route path="/dining" component={Dining}/>
		      <Route path="/profile" component={Profile}/>

		    </div>
		</Router>
    );
  }
}
