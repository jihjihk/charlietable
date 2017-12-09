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



//  width:'200px',
//  margins: '10px'
//}
//var size=0;


export default class Dining extends Component{
  constructor() {
    super();
    this.state = {
      eventName : '',
      participants: [],
      time: moment(),
      city: '',
      venue: '',
      conversationTopic: [],
      creator: '',
      images : [],
      cuisines : [],
      sources : [],
      locations : [],
      times : [],
      buttonIds: [],
      cuisine : '',
      source : "https://www.kids-world-travel-guide.com/images/french_food_macarons_shutterstock_62967172-2.jpg",
      location: '',
      time : '',
      buttonId : '',
      style : {
        width:'200px',
        margins: '10px'
      }
    };
    //this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
    //this.componentWillMount = this.componentDidMount.bind(this);

    this.createEventTile = this.createEventTile.bind(this);
    //this.createEventTiles = this.createEventTiles.bind(this);
    //this.findCuisineSource = this.findCuisineSource.bind(this);
    //this.makeTiles = this.makeTiles.bind(this);
    this.renderTiles = this.renderTiles.bind(this);
  }


  componentDidMount = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });
    console.log("Testing Tile");
    <Image src="https://www.kids-world-travel-guide.com/images/french_food_macarons_shutterstock_62967172-2.jpg"/> //source={this.source} location="Saadiyat" time="12pm" buttonId="boop" cuisine="French" style={this.style}/>);
  }

  componentWillMount = () => {
    const eventsRef = firebase.database().ref('events');
    const imageRef = firebase.database().ref('diningImages');
    eventsRef.once("value")
    .then(function(snapshot){
      snapshot.forEach(function(childSnapshot){//for each event
        var key = childSnapshot.key;
        console.log("Child Key "+key);
        this.setState(this.buttonId: key);//event id
        //this.size++;
        childSnapshot.forEach(function(childSnapshot){//for each attribute of the event
          var childKey = childSnapshot.key;
          var childVal = childSnapshot.val();
          if(childKey  == "time"){//if it is the time attribute
            this.setState({time : childVal});
          }
          if(childKey == "venue"){//if it is the venue attribute
            this.setState({location : childVal});
          }
          if(childKey == "cuisine"){//if it is the cuisine attribute
            this.cuisine.setState(childVal);
            this.setState({source : "https://www.kids-world-travel-guide.com/images/french_food_macarons_shutterstock_62967172-2.jpg"})
            //this.source.setState("https://www.kids-world-travel-guide.com/images/french_food_macarons_shutterstock_62967172-2.jpg");
            imageRef.once("value")
            .then(function(newSnapshot){
              newSnapshot.forEach(function(childSnapshot){
                var key = childSnapshot.key;
                //console.log("KEY  "+key + "Cuisine " + cuisine);
                var val = childSnapshot.val();
                //console.log("Cuisine Val: "+val);
                if(key == this.state.cuisine){
                  console.log("FOund matching image for cuisine type");
                  this.setState({source:val});
                  //sources.push(source);
                  //return source;
                }
              })
            })
          }
          var temp =[];
          temp.push(this.state.location);
          temp.push(this.state.time);
          temp.push(this.state.cuisine);
          temp.push(this.state.buttonId);
          temp.push(this.state.source);
          //console.log("ATTREIBUTES "+" "+cuisine+" "+location+" "+time+" "+buttonId+" "+source);
          console.log(temp);
          //this.setState({this.images: this.state.images.push(temp)})
          this.images.push(temp);

        })
      })
    })//finished going through all events here
    console.log("IMAGES"+this.state.images);
    return this.state.images;
  }

  createEventTile = function(data){
    return (<EventTile src={data[4]} key={data[3]} venue={data[0]} timePlace={data[1]} food={data[2]} id={data[3]}/>);
  }


  //createEventTiles = () => {
    // const eventsRef = firebase.database().ref('events');
    // const imageRef = firebase.database().ref('diningImages');
    // eventsRef.once("value")
    // .then(function(snapshot){
    //   snapshot.forEach(function(childSnapshot){//for each event
    //     var key = childSnapshot.key;
    //     console.log("Child Key "+key);
    //     this.setState(this.state.buttonId: key);//event id
    //     //this.size++;
    //     childSnapshot.forEach(function(childSnapshot){//for each attribute of the event
    //       var childKey = childSnapshot.key;
    //       var childVal = childSnapshot.val();
    //       if(childKey  == "time"){//if it is the time attribute
    //         this.setState({time : childVal});
    //       }
    //       if(childKey == "venue"){//if it is the venue attribute
    //         this.setState({location : childVal});
    //       }
    //       if(childKey == "cuisine"){//if it is the cuisine attribute
    //         this.cuisine.setState(childVal);
    //         this.setState({source : "https://www.kids-world-travel-guide.com/images/french_food_macarons_shutterstock_62967172-2.jpg"})
    //         //this.source.setState("https://www.kids-world-travel-guide.com/images/french_food_macarons_shutterstock_62967172-2.jpg");
    //         imageRef.once("value")
    //         .then(function(newSnapshot){
    //           newSnapshot.forEach(function(childSnapshot){
    //             var key = childSnapshot.key;
    //             //console.log("KEY  "+key + "Cuisine " + cuisine);
    //             var val = childSnapshot.val();
    //             //console.log("Cuisine Val: "+val);
    //             if(key == this.state.cuisine){
    //               console.log("FOund matching image for cuisine type");
    //               this.setState({source:val});
    //               //sources.push(source);
    //               //return source;
    //             }
    //           })
    //         })
    //       }
    //       var temp =[];
    //       temp.push(this.state.location);
    //       temp.push(this.state.time);
    //       temp.push(this.state.cuisine);
    //       temp.push(this.state.buttonId);
    //       temp.push(this.state.source);
    //       //console.log("ATTREIBUTES "+" "+cuisine+" "+location+" "+time+" "+buttonId+" "+source);
    //       console.log(temp);
    //       //this.setState({this.images: this.state.images.push(temp)})
    //       this.images.push(temp);
    //
    //     })
    //   })
    // })//finished going through all events here
    // console.log("IMAGES"+this.state.images);
    // return this.state.images;
  //}

/**  const imageRef = firebase.database().ref('diningImages');
  findCuisineSource = function(cuisine){
    this.setState({source: })
    this.source.setState("https://www.kids-world-travel-guide.com/images/french_food_macarons_shutterstock_62967172-2.jpg");
    imageRef.once("value")
    .then(function(snapshot){
      snapshot.forEach(function(childSnapshot){
        var key = childSnapshot.key;
        //console.log("KEY  "+key + "Cuisine " + cuisine);
        var val = childSnapshot.val();
        //console.log("Cuisine Val: "+val);
        if(key == cuisine){
          console.log("FOund matching image for cuisine type");
          this.source.setState(val);
          sources.push(source);
          //return source;
        }
      })
    })
    //return source;
  }**/

  //makeTiles = function(){
    //console.log("MAP IMAGES"+images);
    //return this.images.map(this.createEventTile);
//  }

  renderTiles() {
    return this.state.images.map(image => {
      <EventTile
        src={image[4]}
        key={image[3]}
        venue={image[0]}
        timePlace={image[1]}
        food={image[2]}
        id={image[3]}
      />
    })
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
      {this.renderTiles()}
      {this.createEventTile("Balcksmith", "12pm", "booo", "French","https://www.kids-world-travel-guide.com/images/french_food_macarons_shutterstock_62967172-2.jpg")}

      </Grid>
      </Segment>
      </div>
    );
  }
}
