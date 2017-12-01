import React, { Component } from 'react';
import './style.css';
import firebase, { auth, provider } from '../../services/firebase.js';
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

export default class NewEvent extends Component {
  constructor() {
    super();

    this.state = {
      interest: '',
      cuisine: '',
      username: '',
      items: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.login = this.login.bind(this);
    //this.logout = this.logout.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
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


  handleSubmit(e) {
    e.preventDefault();
    const eventsRef = firebase.database().ref('events');

    const event = {

      eventName : this.state.eventName,
      participants: [this.state.username],
      time: this.state.time,
      location: this.state.location,
      cuisine: this.state.cuisine,
      creator: this.state.username
    }

    eventsRef.push(event);

    this.setState({
     
      eventName : '',
      participants: '',
      time: '',
      location: '',
      cuisine: '',
      creator: ''
    });

  }
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });

    const eventsRef = firebase.database().ref('events');

    // eventsRef.on('value', (snapshot) => {
    //   let events = snapshot.val();
    //   let newState = [];
    //   for (let event in events) {
    //     newState.push({
    //       log: event,
    //       interest: events[event].interest,
    //       cuisine: events[event].cuisine,
    //       user: events[event].user
    //     });
    //   }
    //   this.setState({
    //     items: newState
    //   });
    // });
  }
  
  render() {

    return (
      <div>
          <Container>
            <Menu fixed='top' size='large'>
              <Menu.Item as='home' active>Home</Menu.Item>
              <Menu.Item as='events'>Explore</Menu.Item>
              <Menu.Item as='messages'>Messages</Menu.Item>

                {this.state.user ?
                  <Menu.Item as='mypage'>
                      <Image src={this.state.user.photoURL} size='mini' circular />
                      &nbsp;{this.state.user.displayName}
                  </Menu.Item>
                  :
                  <Menu.Item as='mypage'>
                    My Page
                  </Menu.Item>
                }
              

              <Menu.Menu position='right'>
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

        <Segment style={{ padding: '8em 0em' }} vertical>
          <Container>
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
              <div className='container'>
                <section className='createEventInput'>
                  <form onSubmit={this.handleSubmit}>
                    <input type="text" name="eventName" placeholder="Name this event" onChange={this.handleChange} value={this.state.eventName} />
                    <input type="text" name="cuisine" placeholder="What cuisine do you like?" onChange={this.handleChange} value={this.state.cuisine} />
                    <input type="text" name="location" placeholder="Where do you want to host this event?" onChange={this.handleChange} value={this.state.location} />                      <input type="text" name="interest" placeholder="What are you interested in?" onChange={this.handleChange} value={this.state.interest} />
                    <input type="text" name="time" placeholder="When do you wanna host this event?" onChange={this.handleChange} value={this.state.time} />
                    <button>Create Event</button>
                  </form>

                </section>
      
              </div>
            </div>
          </Container>
        </Segment>
      </div>
    );
  }
}