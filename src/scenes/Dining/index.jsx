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
      source : "https://www.kids-world-travel-guide.com/images/french_food_macarons_shutterstock_62967172-2.jpg",
      location: '',
      buttonId : '',
      style : {
        width:'200px',
        margins: '10px'
      }
    };

    this.createEventTile = this.createEventTile.bind(this);
  }


  componentDidMount = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });
    console.log("Testing Tile");
  }

  componentWillMount = () => {
    const eventsRef = db.ref('events');
    const imageRef = db.ref('diningImages');
    let joined = [];
    eventsRef.once("value")
    .then(snapshot => {
      snapshot.forEach(childSnapshot => {//for each event assign a new ID
        let temp = [];
        var key = childSnapshot.key;
        console.log("Child Key "+key);
        this.setState({buttonId: key});//event id
        temp[0] = key;

        /**for each attribute of the event assign the different
        components to the temporary array that will build the event tile**/
        childSnapshot.forEach(childSnapshot => {
          var childKey = childSnapshot.key;
          var childVal = childSnapshot.val();
          if(childKey  === "time"){//if it is the time attribute
            this.setState({time : childVal});
            temp[1] = childVal;
          }
          if(childKey === "venue"){//if it is the venue attribute
            this.setState({location : childVal});
            temp[2] = childVal;
          }
          if(childKey === "cuisine"){//if it is the cuisine attribute
            this.setState({cuisine: childVal});
            temp[3] = childVal;

            /**once the cuisine attribute is found,
            look through the image database to find the corresponding image location**/
            imageRef.once("value")
              .then((newSnapshot) => {
                newSnapshot.forEach(newChildSnapshot => {
                  if(newChildSnapshot.key === childVal){
                    this.setState({source: newChildSnapshot.val()})
                    temp[4] = newChildSnapshot.val();
                    joined = this.state.images.push(temp);

                  }
                })
              }, (error) => {
                console.log("ERROR:",error)
              });
          }
        });
      });
    })
    .then(()=>{
      this.setState(this.state.images: joined);
    }, (error) => {
      console.error(error);
    });
    return Promise.all(this.state.images);
  }

  createEventTile = function(data){
    return (<EventTile src={data[4]} key={data[0]} venue={data[2]} timePlace={data[1]} food={data[3]} id={data[0]}/>);
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
