import React, { Component } from 'react';
import './style.css';
import firebase from 'firebase'

import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { db, auth, provider } from '../../services/firebase.js';
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

const DATA = require('../../data/interests')

export default class NewEvent extends Component {
  constructor() {
    super()
    this.state = {
      eventName : '',
      participants: [],
      removeSelected: true,
      stayOpen: true,
      time: moment(),
      city: '',
      venue: '',
      cuisine: '',
      conversationTopic: [],
      creator: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);

  }
  
  handleChange(e) {
    if(e._isAMomentObject){
      this.setState({time: e});
    }
    
    else {
      this.setState( 
        { [e.target.name]: e.target.value } 
        //{ e }
        )
      }
    }
  
  handleSelectChange (value) {
    console.log('You\'ve selected:', value);
    this.setState({
      conversationTopic: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const eventsRef = db.ref('events');

    //we can use the imported modules from /services/firebase.js and replace firebase.auth() with auth
    const user = auth.currentUser;
    console.log(user);
    if(user){

      const event = {
        eventName : this.state.eventName,
        participants: [user.G],
        time: this.state.time.unix(),
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

    console.log("These are my interests")
    console.log(this.state.conversationTopic)

  }
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });

    const eventsRef = db.ref('events');

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
    var options = DATA.INTERESTS;
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
                <div className="section">
                  <Select
                    closeOnSelect={!this.state.stayOpen}
                    multi
                    onChange={this.handleSelectChange}
                    options={options}
                    placeholder="e.g. Hiking, Spanish language, Meditation..."
                    simpleValue
                    value={this.state.conversationTopic}
                    removeSelected={this.state.removeSelected}
                  />

                </div>                    
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