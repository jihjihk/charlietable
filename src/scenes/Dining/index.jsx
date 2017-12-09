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


var images = [];
var cuisines = [];
var sources = [];
var locations = [];
var times = [];
var buttonIds = [];
var cuisine = '';
var source = "https://www.kids-world-travel-guide.com/images/french_food_macarons_shutterstock_62967172-2.jpg";
var location = '';
var time = '';
var buttonId = '';
var style = {
  width:'200px',
  margins: '10px'
}
var size=0;


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
    console.log("Testing Tile");
    <Image src="https://www.kids-world-travel-guide.com/images/french_food_macarons_shutterstock_62967172-2.jpg"/> //source={this.source} location="Saadiyat" time="12pm" buttonId="boop" cuisine="French" style={this.style}/>);
  }

  createEventTile = function(data){
    return (<EventTile source={data[4]} key={data[3]} location={data[0]} time={data[1]} cuisine={data[2]} buttonId={data[3]}/>);
  }

  findCuisineSource = function(cuisine){
    const imageRef = firebase.database().ref('diningImages');
    source = "https://www.kids-world-travel-guide.com/images/french_food_macarons_shutterstock_62967172-2.jpg";
    imageRef.once("value")
    .then(function(snapshot){
      snapshot.forEach(function(childSnapshot){
        var key = childSnapshot.key;
        //console.log("KEY  "+key + "Cuisine " + cuisine);
        var val = childSnapshot.val();
        //console.log("Cuisine Val: "+val);
        if(key == cuisine){
          console.log("FOund matching image for cuisine type");
          source = val;
          sources.push(source);
          //console.log(source);
        }
      })
    })
  }

  createEventTiles = function(){
    const eventsRef = firebase.database().ref('events');
    eventsRef.once("value")
    .then(function(snapshot){
      snapshot.forEach(function(childSnapshot){
        var key = childSnapshot.key;
        console.log("Child Key "+key);
        buttonId = key;
        buttonIds.push(buttonId);
        size++;
        childSnapshot.forEach(function(childSnapshot){
          var childKey = childSnapshot.key;
          var childVal = childSnapshot.val();
          if(childKey  == "time"){
            time = childVal;
            times.push(time);
          }
          if(childKey == "venue"){
            location = childVal;
            locations.push(location);
          }
          if(childKey == "cuisine"){
            //console.log("Found Cuisine");
            cuisine = childVal;
            cuisines.push(cuisine);
            this.findCuisineSource(cuisine);
          }
          var temp =[];
          temp.push(location);
          temp.push(time);
          temp.push(cuisine);
          temp.push(buttonId);
          temp.push(source);
          console.log("ATTREIBUTES "+" "+cuisine+" "+location+" "+time+" "+buttonId+" "+source);
          console.log(temp);
          images.push(temp);
          for(var j=0; j<22; j++){
            console.log("IMAGES "+images[j]);
          }
        })
        //get the image that matches the cuisine type
        //console.log(size);
        //console.log(cuisines);
        //console.log(times);
        //console.log(sources);
      })
      //return (<EventTile location={location} source={source} time={time} cuisine = {cuisine} buttonId={buttonId} style={style}/>);

    })
    //console.log("IMAGES"+images);
    return images;
  }

  makeTiles = function(){
    images = this.createEventTiles();
    console.log("MAP IMAGES"+images);
    return images.map(this.createEventTile);
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
      <EventTile source={source} style={style} cuisine={cuisine} location={location} buttonId={buttonId} time={time}/>
      {this.createEventTile("Balcksmith", "12pm", "booo", "French","https://www.kids-world-travel-guide.com/images/french_food_macarons_shutterstock_62967172-2.jpg")}
      {this.makeTiles()}
      </Grid>
      </Segment>
      </div>
    );
  }
}
