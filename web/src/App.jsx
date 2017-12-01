import React, { Component } from 'react';
import logo from './logo.svg';
import './style.css';
import firebase, { auth, ref, provider } from '../../services/firebase.js';

//import 'font-awesome/css/font-awesome.css';
//import 'normalize.css/normalize.css';

//Added as part of routing schema
//-----------------------------------------//

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'

import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Visibility,
} from 'semantic-ui-react'


//-----------------------------------------//


import './index.css';
import Home from './scenes/Home';
import Dining from './scenes/Dining';
import Profile from './scenes/Profile';
// import NewEvent from './scenes/NewEvent // <Route path="/newevent" component={NewEvent}/>

//before, this just returned <Home />
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authed: false,
      loading: true,
      user: null
    }
  }

  logout = () => {
    auth.signOut().then(() => {
      this.setState({
        user: null
      });
    });
  }

  login = () => {
    auth.signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      this.setState({
        user
      });
    });
  }

  componentDidMount() {
    this.removeListener = auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
          user: user
        })
      }
      else {
        this.setState({
          authed: false,
          laoding: false,
          user: null
        })
      }
    });
  }

  componentWillUnmount () {
    this.removeListener()
  }

  render() {
    return (
    	 <Router>
        <div>
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em' }}
            vertical
          >
            <Container>
              <Menu fixed='top' size='large'>
                <Menu.Menu position='right'>
                  <Menu.Item as='home' active><Link to="/">Home</Link></Menu.Item>
                  <Menu.Item as='dining'><Link to="/dining">Explore</Link></Menu.Item>
                  <Menu.Item as='messages'>Messages</Menu.Item>
                  { this.state.authed ?
                    <Menu.Item as='profile'><Link to="/profile">
                        <Image src={this.state.user.photoURL} size='mini' circular />
                        {this.state.user.displayName}
                        </Link>
                    </Menu.Item>
                    :
                    <Menu.Item as='profile'><Link to="/profile">
                      My Profile
                      </Link>
                    </Menu.Item>
                  }
                    
                  <Menu.Item className='item'>
                    {this.state.authed ?
                        <Button as='logout' onClick={this.logout}>Log Out</Button>
                        :
                        <Button as='login' onClick={this.login}>Log In</Button>
                      }
                  </Menu.Item>
                </Menu.Menu>
              </Menu>
            </Container>
          </Segment>

          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/dining" render={(props) => <Dining userData={this.state.user} {...props}/>} />
            <Route path="/profile" render={(props) => <Profile userData={this.state.user} {...props}/>} />
            <Route render={() => <h3>Page Not Found</h3>} />
          </Switch>
        </div>
      </Router>
    );
  }
}

