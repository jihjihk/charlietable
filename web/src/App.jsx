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

import './index.css';
import Home from './scenes/Home';
import Dining from './scenes/Dining';
import Profile from './scenes/Profile';
import NewEvent from './scenes/NewEvent';	
import firebase, { auth, ref, provider } from './services/firebase.js';
// import NewEvent from './scenes/NewEvent // <Route path="/newevent" component={NewEvent}/>

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, authed, ...rest}) {
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
    return this.state.loading === true ? <h1>Loading</h1> :(
      <Router>
        <div>
          <Segment
            textAlign='center'
            vertical
          >
            <Container>
              <Menu fixed='top' size='large'>
                <Menu.Menu position='right'>
                  <Menu.Item as='home' active><Link to="/">Home</Link></Menu.Item>
                  <Menu.Item as='dining'><Link to="/dining">Explore</Link></Menu.Item>
                  <Menu.Item as='messages'>Messages</Menu.Item>
                    {this.state.user ?
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
          <Route authed={this.state.authed} user={this.state.user} path="/dining" component={Dining} />
          <Route authed={this.state.authed} user={this.state.user} path='/profile' component={Profile} />
          <Route authed={this.state.authed} user={this.state.user} path='/newevent' component={NewEvent} />
          <Route render={() => <Segment><Container><h3>No Match</h3></Container></Segment>} />
        </Switch>
      </div>
    </Router>
    )
  }
}
