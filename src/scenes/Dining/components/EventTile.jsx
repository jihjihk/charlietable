import React, { Component } from 'react';
import {
  Button,
  Grid,
  Image,
  Icon
} from 'semantic-ui-react';
//import RSVP from '../rsvp.jsx';
import { auth, db } from '../../../services/firebase.js';

const Timestamp = require('react-timestamp')


export default class EventTile extends Component{

  handleSubmit(){
    const user = auth.currentUser.uid;
    let users = [];
    console.log("User: "+user);
    console.log(this.props);
    //const id = buttonId.toString();
    //console.log("ID: "+id);

    const eventsRef = db.ref('events');
    console.log(eventsRef);
    const userData = eventsRef.child(this.props.id);
    console.log(userData);
    const eventParticipants = userData.child('participants');
    eventParticipants.once('value').then(snapshot => {
      snapshot.forEach(childSnapshot => {
        users.push(childSnapshot.val());
        console.log(users);
      })
      return new Promise((resolve,reject)=>{
        resolve();
      });
    }).then(()=>{
      users.push(user);
      userData.update({participants : users});
    });
    //console.log("USER ARRAY"+users);
    console.log(eventParticipants);
    //let temp = eventParticipants.val();
  //  temp.push(user);
    //userData.update({participants : users});
    //eventParticipants.update({participants :user});
    //console.log("RSVP'd to the event"

  }


  render(){
    return (
      <Grid.Column>
        <Image src={this.props.src} style={{margin:'1em', width:'250px', height:'170px', overflow:'hidden'}}/>

        <span>{this.props.food} at {this.props.venue}</span> <br />
        <Timestamp time={this.props.timePlace} format="full" includeDay />
        <Button style={{ margin:'1em'}} id={this.props.id} primary size='medium' onClick={this.handleSubmit.bind(this)}>RSVP<Icon name='right arrow' /></Button>
      </Grid.Column>
    );
  }
}

//onClick={RSVP(this.props.id)}
