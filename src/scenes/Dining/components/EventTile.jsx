import React, { Component } from 'react';
import {
  Button,
  Grid,
  Image,
  Icon,
  Modal
} from 'semantic-ui-react';
//import RSVP from '../rsvp.jsx';
import { auth, db } from '../../../services/firebase.js';

const Timestamp = require('react-timestamp')


export default class EventTile extends Component{

  handleSubmit(){
    const user = auth.currentUser.uid;
    let users = [];

    const eventsRef = db.ref('events');
    const userData = eventsRef.child(this.props.id);
    const eventParticipants = userData.child('participants');
    eventParticipants.once('value').then(snapshot => {
      snapshot.forEach(childSnapshot => {
        users.push(childSnapshot.val());
      })
      return new Promise((resolve,reject)=>{
        resolve();
      });
    }).then(()=>{
      users.push(user);
      userData.update({participants : users});
      //('#ui_modal').modal('hide');
    });
  }


  render(){
    return (
      <Grid.Column>
        <Image src={this.props.src} style={{margin:'1em', width:'250px', height:'170px', overflow:'hidden'}}/>
        <span>{this.props.eventName}<br />{this.props.food} <br /> {this.props.venue}</span> <br />
        <Timestamp time={this.props.timePlace} format="full" includeDay />
        <Button style={{ margin:'1em'}} id={this.props.id} primary size='medium' onClick={this.handleSubmit.bind(this)}>RSVP<Icon name='right arrow' /></Button>
      </Grid.Column>
    );
  }
}
