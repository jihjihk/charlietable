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
} from 'semantic-ui-react';

import InterestMultiSelect from '../../components/Select/InterestMultiSelect.js';
import EventTile from './components/EventTile.jsx';


var numEvents = 0;
var cuisines = [];
var times = [];
var images = [];
var locations = [];

export default class Dining extends Component{
  constructor() {
    super();
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

  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });

    createEventTile: function(location, time, cuisine, id, source){
      return (<EventTile source={source}key={source}/>);
    };

    const eventsRef = firebase.database().ref('events');
    const imageRef = firebase.database().ref('diningImages');
    createEventTiles: function (eventsRef){
      eventsRef.once("value")
      .then(function(snapshot){
        snapshot.forEach(function(childSnapshot){
          var key = childSnapshot.key;
          console.log("Child Key "+key);
          var buttonId = key;
          childSnapshot.forEach(function(childSnapshot){
            var childKey = childSnapshot.key;
            var childVal = childSnapshot.val();
            if(childKey == "cuisine"){
              console.log("Found Cuisine");
              var cuisine = childVal;
            }
            if(childKey == "time"){
              var time = childVal;
            }
            if(childKey == "venue"){
              var location = childVal;
            }
            console.log("el in child: "+ childKey);
            console.log("Child Value: "+childVal);
          })
          //get the image that matches the cuisine type
          imageRef.once("value")
          .then(function(snapshot){
            snapshot.forEach(function(childSnapshot){
              var key = childSnapshot.key;
              console.log(key);
              var val = childSnapshot.value();
              if(key == cuisine){
                console.log("FOund matching image for cuisine type");
                source = val;
              }
            })
          })
          return(this.createEventTile(location, time, cuisine, id, source));
        })
      })

    };

  }

  render(){
    return(
      <div>
      <Segment
      inverted
      textAlign='center'
      style={{ minHeight: 700, padding: '1em 0em' }}
      vertical
      >
      <Container text>
      <Header
      as='h1'
      content='Choose Your Dinner'
      inverted
      style={{ fontSize: '4em', fontWeight: 'normal', marginBottom: 0, marginTop: 0 }}
      />
      <Header
      as='h2'
      content='We Will Curate The Rest'
      inverted
      style={{ fontSize: '1.7em', fontWeight: 'normal' }}
      />
      </Container>
      <Grid columns={4} divided>
        createEventTiles();
      </Grid>
      </Segment>
      </div>
    );
  }
}
