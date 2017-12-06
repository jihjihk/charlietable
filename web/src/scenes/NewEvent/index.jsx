import React, { Component } from 'react';
import './style.css';
import firebase from 'firebase'

import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';


import { ref, auth, provider } from '../../services/firebase.js';
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
      items: [],
      startDate: moment()
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

 
  handleChange(e) {
  if(e._isAMomentObject){
    this.setState({startDate: e});
  }else{
     this.setState({
          [e.target.name]: e.target.value
        });

  }
   
  }


  handleSubmit(e) {
    e.preventDefault();
    const eventsRef = firebase.database().ref('events');
   
    const user = firebase.auth().currentUser;
    console.log(user);
    if(user){


      const event = {

        eventName : this.state.eventName,
        participants: [user.G],
        time: this.state.time,
        location: this.state.location,
        cuisine: this.state.cuisine,
        creator: user.G

      }

      eventsRef.push(event);

      this.setState({
        eventName : '',
        participants: '',
        time: moment(),
        location: '',
        cuisine: '',
        creator: ''
      });

    }else{
        alert("please first login");
    }

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
        <Segment style={{ padding: '8em 0em' }} vertical>
          <Container>
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
              <div className='container'>

                <section className='createEventInput'>

                  <form onSubmit={this.handleSubmit}>
                    <input type="text" name="eventName" placeholder="Name this event" onChange={this.handleChange} value={this.state.eventName} />
                    <input type="text" name="cuisine" placeholder="What cuisine do you like?" onChange={this.handleChange} value={this.state.cuisine} />
                    <input type="text" name="location" placeholder="Where do you want to host this event?" onChange={this.handleChange} value={this.state.location} />                      
                    <input type="text" name="time" placeholder="When do you wanna host this event?" onChange={this.handleChange} value={this.state.time} />
                    <input type="hidden" name="username" onChange={this.handleChange} value={this.state.username} />
                    <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleChange}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="LLL"
                    />
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