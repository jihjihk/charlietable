import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//import "babel-polyfill";


//added as part of routing schema
//-----------------------------------------//
// import { Provider } from 'react-redux'
// import {BrowserRouter} from 'react-router-dom';

// import { ConnectedRouter } from 'react-router-redux'
// import store, { history } from './store'
//-----------------------------------------//

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';


ReactDOM.render((
    <App/>
), document.getElementById('root')
);


registerServiceWorker();