import React, { Component } from 'react';
import './style.css';
import firebase from 'firebase'

import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

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
  Form
} from 'semantic-ui-react'

import InterestMultiSelect from '../../components/Select/InterestMultiSelect.js'

export default class NewEvent extends Component {
  constructor() {
    super()
    this.state = {
      eventName : '',
      participants: [],
      time: moment(),
      city: '',
      venue: '',
      cuisine: '',
      conversationTopic: [],
      creator: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  
  
 
  handleChange(e) {
  if(e._isAMomentObject){
    this.setState({time: e});
  }else{
     this.setState({
          [e.target.name]: e.target.value
        });
    }
  }


  handleSubmit(e) {
    e.preventDefault();
    const eventsRef = firebase.database().ref('events');

    //we can use the imported modules from /services/firebase.js and replace firebase.auth() with auth
    const user = auth.currentUser;
    console.log(user);
    if(user){

      const event = {
        eventName : this.state.eventName,
        participants: [user.G],
        time: this.state.time,
        city: this.state.city,
        venue: this.state.venue,
        conversationTopic: this.state.conversationTopic,
        cuisine: this.state.cuisine,
        creator: user.G
      }

      eventsRef.push(event);

      this.setState({
        eventName : '',
        participants: [],
        time: moment(),
        city: '',
        venue: '',
        cuisine: '',
        conversationTopic: [],
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
          <Header as="h1" textAlign="center" content="Host your own dinner party at a restaurant" />
          <Container text>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                  <Form.Input label='Event Name' placeholder='What is the event called?' type="text" name="eventName" 
                    onChange={this.handleChange} value={this.state.eventName} />
                  <Form.Input label='City' placeholder='Where are you hosting it?' type="text" name="city" 
                    onChange={this.handleChange} value={this.state.city} />
                </Form.Group>
                <Form.Group>
                  <Form.Input label='Venue Name' placeholder="Which restaurant/bar will it be at?" type="text" name="venue" 
                    onChange={this.handleChange} value={this.state.venue} />
                  <Form.Input label='Cuisine' placeholder="French, Thai, or Beer?" type="text" name="cuisine" 
                    onChange={this.handleChange} value={this.state.cuisine} />
                </Form.Group>
                <Header as="h3">Pick 3 Potential Conversation Topics</Header>
                <InterestMultiSelect label="InterestMultiSelect" onChange={this.handleChange} value={this.state.conversationTopic}/>
                                    
                <Header as="h3">Time and Date</Header>
                <DatePicker
                    selected={this.state.time}
                    onChange={this.handleChange}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={30}
                    dateFormat="LLL"
                />
                <Button type="submit">Create Event</Button>
              </Form>
            </Container>
        </Segment>
      </div>
    );
  }
}