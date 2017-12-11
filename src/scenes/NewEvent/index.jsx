import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

import Select from 'react-select';
import 'react-select/dist/react-select.css';
import './style.css';
import { Async } from 'react-select';
import { db, auth } from '../../services/firebase.js';
import {
  Button,
  Container,
  Header,
  Segment,
  Form
} from 'semantic-ui-react'


var request = require('request');
var ACCESS_TOKEN = '3265b2063d0d33920ef1429db8936e6f';
var API_END_POINT = 'https://developers.zomato.com/api/v2.1';
const DATA = require('../../data/interests');

  
function recordUserPreference(eventCreated){

  //update DB on the user's preferences, ensure this is reflected 
  //for the next time that user makes a choice.



}


function determineCity(inputCity, callback){
    
   var returnArr=[];

   var options = {
        method: 'GET',
        url: API_END_POINT + '/cities?q='+inputCity,
        headers: {
            'user-key': ACCESS_TOKEN,
            'content-type': 'application/json'
        }
    };
  
    request(options, function(error, response, body) {
        var responseVal=  JSON.parse(response.body).location_suggestions
        for (var i=0; i<responseVal.length;i++){
          var option = {
            value: responseVal[i].id,
            label: responseVal[i].name
          }
          returnArr.push(option);
        }       
    });
    callback(null, {
        options: returnArr,
          // CAREFUL! Only set this to true when there are no more options,
          // or more specific queries will not be sent to the server.
        complete: true
    });
    // return returnArr;
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
      creator: '',
      possibleCities:[],
      possibleCuisines:[],
      possibleVenues:[],
      changeCityListener: 0,
      changeCuisineListener: 0,
      changeVenueListener: 0,
      setCity: false,
      setCuisine: false,
      setVenue: false,

    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.changedCityOptions = this.changedCityOptions.bind(this);
    this.getCityOptions = this.getCityOptions.bind(this);
    this.changedCuisineOptions= this.changedCuisineOptions.bind(this);
    this.getCuisineOptions=this.getCuisineOptions.bind(this);


    }

    changedCityOptions(value){ 

      this.setState({
        setCity:true,
        city: value
      });

    };


    changedCuisineOptions(value){ 

      this.setState({
        setCuisine:true,
        cuisine: value
      });
    };

    getCityOptions(input, callback){
    
    clearTimeout(this.changeCityListener);
     this.setState({
          setCity:false
      });

    this.changeCityListener = setTimeout( () => {
      var returnArr=[];

      var options = {
            method: 'GET',
            url: API_END_POINT + '/cities?q='+input,
            headers: {
                'user-key': ACCESS_TOKEN,
                'content-type': 'application/json'
            }
        };
      
        request(options, function(error, response, body) {
          var responseVal=  JSON.parse(response.body).location_suggestions
            for (var i=0; i<responseVal.length;i++){
              var option = {
                value: responseVal[i].id.toString(),
                label: responseVal[i].name
              }
              returnArr.push(option);
            }      
        
          callback(null, {
              options: returnArr,
              // CAREFUL! Only set this to true when there are no more options,
              // or more specific queries will not be sent to the server.
              complete: true
          });
      });

    }, 500);

  };

  getCuisineOptions(input, callback){
    
    clearTimeout(this.changeCuisineListener);
     this.setState({
          setCuisine:false
      });

    this.changeCuisineListener = setTimeout( () => {
      var returnArr=[];

      var options = {
            method: 'GET',
            url: API_END_POINT + '/cuisines?city_id='+this.state.city.value,
            headers: {
                'user-key': ACCESS_TOKEN,
                'content-type': 'application/json'
            }
        };
        
        request(options, function(error, response, body) {
          var responseVal=  JSON.parse(response.body).cuisines
          console.log(responseVal);
          for (var i=0; i<responseVal.length;i++){
              var option = {
                value: responseVal[i].cuisine.cuisine_id.toString(),
                label: responseVal[i].cuisine.cuisine_name
              }
              console.log(option);
              returnArr.push(option);
            }      
        
          callback(null, {
              options: returnArr,
              // CAREFUL! Only set this to true when there are no more options,
              // or more specific queries will not be sent to the server.
              complete: true
          });
      });

    }, 500);

  };

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
          creator: '',
          possibleCities:[],
          possibleCuisines:[],
          possibleVenues:[],
          changeCityListener: 0,
          changeCuisineListener: 0,
          changeVenueListener: 0,
          setCity: false,
          setCuisine: false,
          setVenue: false,
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
        // this.getAPIData(this.props.group);
      }
    });

    const eventsRef = db.ref('events');

    // this.callAPI(this.props.group);

  }

  componentWillReceiveProps(nextProps) {

    // // Assuming parameter comes from url.
    // // let group = window.location.toString().split("/")[*indexParameterLocated*];
    // // this.UserList(group);

    // // Assuming parameter comes from props that from parent component.
    // let group = nextProps.group; // Maybe something like "groupTwo" 
    // this.UserList(group);

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
                </Form.Group>
                <div className="section">
                 <Header as="h3">City</Header>
                  <Async
                    className="city"
                    autoload={false}
                    value={this.state.city}
                    closeOnSelect={!this.state.stayOpen}
                    onChange={this.changedCityOptions}
                    loadOptions={this.getCityOptions}
                    placeholder="Which city is this event held at?"
                  />
                </div>
                <div className="section">
                 <Header as="h3">Cuisine</Header>
                  <Async
                    className="cuisine"
                    autoload={false}
                    value={this.state.cuisine}
                    closeOnSelect={!this.state.stayOpen}
                    onChange={this.changedCuisineOptions}
                    loadOptions={this.getCuisineOptions}
                    placeholder="Which cuisine do you like?"
                  />
                </div>   
                <Form.Group>
                
                  <Form.Input label='Venue Name' placeholder="Which restaurant/bar will it be at?" type="text" name="venue" 
                    onChange={this.handleChange} value={this.state.venue} />
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