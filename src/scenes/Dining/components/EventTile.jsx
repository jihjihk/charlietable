import React, { Component } from 'react';
import {
  Button,
  Grid,
  Image,
  Icon,
  Modal,
  Header
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
      <Grid.Column textAlign="center">
        <Image src={this.props.src} style={{backgroundPosition: 'center', margin:'0.5em', width:'250px', height:'170px', overflow:'hidden'}}/>
        <Header
          as='h2'
          content={this.props.eventName}
        />
        <h3 style={{fontSize:'1.2em', marginTop:'1em'}}>{this.props.venue}</h3>
        <h4 style={{fontSize:'1.2em', marginTop:'0.5em', fontWeight:"normal"}}>{this.props.food}</h4>
        <Timestamp time={this.props.timePlace} format="full" includeDay />
        
        <Modal dimmer='blurring' basic size='small' trigger={
          <Button
            style={{ margin:'1em'}}
            id={this.props.id}
            primary size='medium'
            onClick={this.handleSubmit.bind(this)}>RSVP</Button>
          }>
          <Header as="h1" content='Your spot was confirmed!' />
          <Modal.Content>
            <p>We will send you a confirmation email for attending the {this.props.eventName} event.</p>
          </Modal.Content>
          <Modal.Actions>
            <Button positive color='green' inverted>
              <Icon name='checkmark' /> Got it.
            </Button>
          </Modal.Actions>
        </Modal>
      </Grid.Column>
    );
  }
}
