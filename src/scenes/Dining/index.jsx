import React, { Component } from 'react';
import './style.css';
import moment from 'moment';
import { auth, db } from '../../services/firebase.js';
import {
  Container,
  Grid,
  Header,
  Segment,
  Modal,
} from 'semantic-ui-react';

import EventTile from './components/EventTile.jsx';
//import RSVP from './rsvp.jsx';


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
      eventName: '',
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
        height: '200px',
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
        this.setState({buttonId: key});//event id
        temp[0] = key;

        /**for each attribute of the event assign the different
        components to the temporary array that will build the event tile**/
        childSnapshot.forEach(childSnapshot => {
          var childKey = childSnapshot.key;
          if(childKey == "eventName"){
            this.setState({eventName: childSnapshot.val()});
            temp[5] = childSnapshot.val();
          }

          if(childKey  === "time"){//if it is the time attribute
            this.setState({time : childSnapshot.val()});
            temp[1] = childSnapshot.val();
          }
          if(childKey === "venue"){//if it is the venue attribute
            childSnapshot.forEach(childSnapshot => {
              if(childSnapshot.key == "label"){
                this.setState({location : childSnapshot.val()});
                temp[2] = childSnapshot.val();
              }
            })
          }
          if(childKey === "cuisine"){//if it is the cuisine attribute
            childSnapshot.forEach(childSnapshot => {
              if(childSnapshot.key == "label"){
                this.setState({cuisine: childSnapshot.val()});
                temp[3] = childSnapshot.val();

                /**once the cuisine attribute is found,
                look through the image database to find the corresponding image location**/
                imageRef.once("value")
                  .then((newSnapshot) => {
                    newSnapshot.forEach(newChildSnapshot => {
                      if(newChildSnapshot.key === childSnapshot.val()){
                        this.setState({source: newChildSnapshot.val()})
                        temp[4] = newChildSnapshot.val();
                        joined = this.state.images.push(temp);

                      }
                    })
                  }, (error) => {
                    console.log("ERROR:",error)
                  });
              }

            })
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
    return (<EventTile src={data[4]} key={data[0]} venue={data[2]} timePlace={data[1]} food={data[3]} id={data[0]} eventName={data[5]}/>);
  }

  makeTiles = function(){
    return this.state.images.map(this.createEventTile);
  }

  //registering RSVP data and changing the database accordingl
  render(){
    return(
      <div>
        <Segment
        textAlign='center'
        style={{ minHeight: 400, padding: '1em 0em', background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://www.romeing.it/wp-content/uploads/2017/03/rome-international-food-guide-1-e1489424047884.jpg")',
                  backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', opacity:'0.9'}}
        vertical
        inverted
        >
          <Container>
            <Header
              as='h1'
              content='Choose Your Dinner'
              inverted
              style={{ fontSize: '4em', fontWeight: 'bold', marginBottom: '0.5em', marginTop: '2em' }}
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
