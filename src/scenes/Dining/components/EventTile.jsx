import React, { Component } from 'react';
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
} from 'semantic-ui-react'

export default class EventTile extends Component{

  //const styles = {
  //  width:'200px',
  //  margin: '10px'
  //}
//let EventTile = function statelessFunctionComponentClass(props){
  render(){
    console.log("Making Image");
    return (
      <Grid.Column>
        <Image src={this.props.source} style={this.props.style}/>
        <span>{this.props.cuisine} at {this.props.location}</span>
        {this.props.time}
        <Button id={this.props.buttonId} primary size='medium'>RSVP<Icon name='right arrow' /></Button>
      </Grid.Column>
    );
  }
}
