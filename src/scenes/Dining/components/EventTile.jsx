import React, { Component } from 'react';
import {
  Button,
  Grid,
  Image,
  Icon
} from 'semantic-ui-react'
const Timestamp = require('react-timestamp')

export default class EventTile extends Component{

  render(){
    return (
      <Grid.Column>
        <Image src={this.props.src} style={{margin:'1em', width:'250px', height:'170px', overflow:'hidden'}}/>

        <span>{this.props.food} at {this.props.venue}</span> <br />
        <Timestamp time={this.props.timePlace} format="full" includeDay />
        <Button style={{ margin:'1em'}} id={this.props.id} primary size='medium' onChange={this.handleChange}>RSVP<Icon name='right arrow' /></Button>
      </Grid.Column>
    );
  }
}
