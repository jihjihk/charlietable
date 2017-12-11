import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

import Select from 'react-select';
import 'react-select/dist/react-select.css';
import './style.css';

import { db, auth } from '../../services/firebase.js';
import {
  Button,
  Container,
  Header,
  Segment,
  Form
} from 'semantic-ui-react'

const DATA = require('../../data/interests');

function recordUserPreference(eventCreated){

  //update DB on the user's preferences, ensure this is reflected 
  //for the next time that user makes a choice.

}


function determineCity(inputCity){

  // check if the city exists in our own db, save a call to API.

  // make Zomato API call based on inputCity.

  // save the city values to db if it didn't exist before.

  //return 1. name of city, 2. coords, 3. cityID as a JSON obj
}

function determineCuisines(inputCityId){

  // check if the cuisines for that city exists in our own db.
  //If the date of last access(which we will also log in our db) is less than a week, save a call to API.

  //make Zomato API call, get back types of cuisines available in the city provided.

  //save the cuisines to the db.

  //return an array of cuisines available in the city.



}


function determineResOptions(inputCityId, cuisinesArray ){
  //get restaurant options given the input city id and cusines array. Return value sorted by rating.
  //https://developers.zomato.com/api/v2.1/search?entity_id=57&entity_type=city&start=0&count=50&cuisines=150&sort=rating&order=desc



}


function verifyInput(inputObj){

    const hasName = inputObj.eventName.length !=0 ;
    const hasTime = inputObj.time!=null;
    const hasCity = inputObj.city.length !=0 ;
    const hasVenue = inputObj.venue.length !=0;
    const hasCuisine = inputObj.cuisine.length !=0;
    const hasConversationTopic = inputObj.conversationTopic.length >= 3 ;
    const hasUser = inputObj.creator != null && inputObj.creator == inputObj.participants[0];

    if (!hasName){
      return {error: "make sure you've named this event"}
    }else if(!hasCity){
      return {error: "make sure you've set a city for this event"}
    }else if(!hasVenue){
      return {error: "make sure you've set a venue for this event"}
    }else if(!hasCuisine){
      return {error: "make sure you've set a cuisine for this event"}
    }else if(!hasConversationTopic){
      return {error: "make sure you've set three conversation topics for this event"}
    }else if(!hasTime){
      return {error: "make sure you've set a time for this event"}
    }else if(!hasUser){
      return {error: "are you trying to hack us? That's not very nice."};
    }else{
      return {success: "successfully created event "+inputObj.eventName};
    }


}

function verifyEventUnique(inputObj){

  return true;

}




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
        )
      }
    }
  
  handleSelectChange (value) {
    this.setState({
      conversationTopic: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const eventsRef = db.ref('events');

    //we can use the imported modules from /services/firebase.js and replace firebase.auth() with auth
    const user = auth.currentUser;

    if(user){

      //we will use user's google account info to track them.

      const event = {

        eventName : this.state.eventName,
        participants: [user.G],
        time: this.state.time.unix(),
        city: this.state.city,
        venue: this.state.venue,
        conversationTopic: this.state.conversationTopic.split(","),
        cuisine: this.state.cuisine,
        creator: user.G

      }

      const result= verifyInput(event);

      if(result.success){
        
        if(!verifyEventUnique(event)){
        
        alert("there already exists an event just like this.")
        
        }else{

          alert(result.success);
          eventsRef.push(event);

        }

        // reset state
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
        //redirect to main page
        this.props.history.push('/');

      }else{
        alert(result.error);
      }
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
        <Segment
          textAlign='center'
          style={{ minHeight: 400, padding: '1em 0em', background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://static1.squarespace.com/static/51a7e8d4e4b02f202602477c/t/54f0dc0ae4b013baf3fe1891/1425071144740/deliberateLIFE-Backyard+Dinner+Party-0064.jpg?format=1500w")',
                    backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', opacity:'0.9'}}
          vertical
          inverted
        >
          <Container>
            <Header
              as='h1'
              content='Organize Your Own'
              inverted
              style={{ fontSize: '4em', fontWeight: 'bold', marginBottom: '0.5em', marginTop: '2em' }}
            />
            <Header
              as='h2'
              inverted
              content='Host at your favorite restaurant, without the hassle'
              style={{ fontSize: '2em', fontWeight: 'normal', marginBottom:'2em' }}
            />
          </Container>
        </Segment>
        <Segment style={{ padding: '8em 0em' }} vertical>
          <Container text>
            <Header
              as='h1'
              content='Tell us about the event'
              textAlign='center'
              style={{ marginBottom: '1em' }}
              />

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
                <Header as="h4">Pick 3 Potential Conversation Topics</Header>
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
                <Header as="h4">Time and Date</Header>
                <DatePicker
                    selected={this.state.time}
                    onChange={this.handleChange}
                    minDate={moment()}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={30}
                    dateFormat="LLL"
                    className="datePickerFormat"
                />
                <Button type="submit">Create Event</Button>
              </Form>
            </Container>
        </Segment>
      </div>
    );
  }
}