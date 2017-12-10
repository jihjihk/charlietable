import React, { Component } from 'react';
import './style.css';
import moment from 'moment';
import { auth, db } from '../../services/firebase.js';
import {
  Container,
  Grid,
  Header,
  Segment,
} from 'semantic-ui-react';

import EventTile from './components/EventTile.jsx';

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
      source : "",//"https://www.kids-world-travel-guide.com/images/french_food_macarons_shutterstock_62967172-2.jpg",
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
    //this.renderTiles = this.renderTiles.bind(this);
  }


  componentDidMount = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });
    console.log("Testing Tile");//source={this.source} location="Saadiyat" time="12pm" buttonId="boop" cuisine="French" style={this.style}/>);
  }

  componentWillMount = () => {
    const eventsRef = db.ref('events');
    const imageRef = db.ref('diningImages');
    eventsRef.once("value")
    .then(snapshot => {
      snapshot.forEach(childSnapshot => {//for each event
        var key = childSnapshot.key;
        console.log("Child Key "+key);
        this.setState({buttonId: key});//event id
        //this.size++;
        childSnapshot.forEach(childSnapshot => {//for each attribute of the event
          var childKey = childSnapshot.key;
          var childVal = childSnapshot.val();
          if(childKey  === "time"){//if it is the time attribute
            this.setState({time : childVal});
          }
          if(childKey === "venue"){//if it is the venue attribute
            this.setState({location : childVal});
          }
          if(childKey === "cuisine"){//if it is the cuisine attribute
            this.setState({cuisine: childVal});
          //  this.setState({source : "https://www.kids-world-travel-guide.com/images/french_food_macarons_shutterstock_62967172-2.jpg"})
            //this.source.setState("https://www.kids-world-travel-guide.com/images/french_food_macarons_shutterstock_62967172-2.jpg");
            imageRef.once("value")
            .then(newSnapshot => {
              newSnapshot.forEach(newChildSnapshot => {
                var key = newChildSnapshot.key;
                console.log("KEY  "+key + "Cuisine " + this.state.cuisine);
                var val = newChildSnapshot.val();
                //console.log("Cuisine Val: "+val);
                if(key === this.state.cuisine){
                  console.log("FOund matching image for cuisine type " + this.state.cuisine);
                  console.log(val);
                  this.setState({source: val});
                  //sources.push(source);
                  //return source;
                }
              })
            })
          }
        })
        var temp =[];
        temp.push(this.state.location);
        temp.push(this.state.time);
        temp.push(this.state.cuisine);
        temp.push(this.state.buttonId);
        temp.push(this.state.source);
        //console.log("ATTREIBUTES "+" "+cuisine+" "+location+" "+time+" "+buttonId+" "+source);
        console.log(temp);
        //this.setState(images: images.push(temp))
        var joined = this.state.images.push(temp);
        this.setState(this.state.images: joined);
      })
    })//finished going through all events here
    //return this.state.images;
  }

  createEventTile = function(data){
    return (<EventTile src={data[4]} key={data[3]} venue={data[0]} timePlace={data[1]} food={data[2]} id={data[3]}/>);
  }

  makeTiles = function(){
    return this.state.images.map(this.createEventTile);
  }

  render(){
    console.log(this.state.images);
    return(
      <div>
        <Segment
        textAlign='center'
        vertical
        inverted
        style={{ minHeight: 400, padding: '1em 0em' }}
        >
          <Container text>
            <Header
              as='h1'
              content='Choose Your Dinner'
              inverted
              style={{ fontSize: '4em', fontWeight: 'normal', marginBottom: '0.5em', marginTop: '2em' }}
            />
            <Header
              as='h2'
              inverted
              content='We Will Curate The Rest'
              style={{ fontSize: '2em', fontWeight: 'normal', marginBottom:'2em' }}
            />
          </Container>
        </Segment>
        <Segment vertical>
          <Grid columns={4} container stackable verticalAlign="middle" centered>

            {this.makeTiles()}
          </Grid>
        </Segment>
      </div>
    );
  }
}
