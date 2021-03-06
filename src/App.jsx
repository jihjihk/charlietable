import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'

import {
  Button,
  Container,
  Image,
  Menu,
  Segment,
  Header
} from 'semantic-ui-react'

import './index.css';
import Home from './scenes/Home';
import Dining from './scenes/Dining';
import Profile from './scenes/Profile';
import NewEvent from './scenes/NewEvent';	
import { auth, provider } from './services/firebase.js';

function PrivateRoute ({component: Component, user, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, user, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/profile' />}
    />
  )
}

export default class App extends Component {

  state = {
    authed: false,
    loading: true,
    user: null
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

  componentDidMount () {
    this.removeListener = auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
          user: user
        })
      } else {
        this.setState({
          authed: false,
          loading: false,
          user: null
        })
      }
    })
  }
  componentWillUnmount () {
    this.removeListener()
  }

  render () {
    var Spinner = require('react-spinkit')
    return this.state.loading === true ?
      <Segment
        textAlign='center'
        vertical>
        <Container textAlign='center'>
          <Spinner name="chasing-dots" color="coral" />
        </Container>
      </Segment>
    :(
      <Router>
        <div>
          <Segment
            textAlign='center'
            vertical
            style={{ padding: '0em 4em' }}
          >
            <Container>
              <Menu fixed='top' size='large' inverted>
                <Menu.Item as='logo'><Link to="/"><Image style={{ marginLeft: '1em' }} src='logo.png' /></Link></Menu.Item>
                <Menu.Item as='home'><Link to="/">Home</Link></Menu.Item>
                <Menu.Item as='dining'><Link to="/dining">Explore</Link></Menu.Item>
                <Menu.Item as='newevent'><Link to="/newevent">Organize</Link></Menu.Item>
                <Menu.Menu position='right'>
                  
                  
                    {this.state.user ?
                        <Menu.Item as='profile'><Link to="/profile">
                            
                            {this.state.user.displayName+"  "}
                            </Link>
                            <Image style={{ marginLeft: '1em' }} src={this.state.user.photoURL} size='mini' circular />
                        </Menu.Item>
                        :
                        <Menu.Item as='profile'><Link to="/profile">
                          My Profile
                          </Link>
                        </Menu.Item>
                      
                    }
                    <Menu.Item>
                      {this.state.user ?
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
          <Route path='/' exact component={Home} />
          <PrivateRoute authed={this.state.authed} user={this.state.user} path="/dining" component={Dining} />
          <PrivateRoute authed={this.state.authed} user={this.state.user} path='/profile' component={Profile} />
          <PrivateRoute authed={this.state.authed} user={this.state.user} path='/newevent' component={NewEvent} />
          <Route render={() => <Segment><Container><h3>No Match</h3></Container></Segment>} />
        </Switch>
      </div>
    </Router>
    )
  }
}
