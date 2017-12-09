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
    return (
      <Grid.Column>
        <Image src={this.props.src} style={this.props.style}/>
        <br />
        <span>{this.props.food} at {this.props.venue}</span> <br />
        {this.props.timePlace} <br />
        <Button id={this.props.id} primary size='medium'>RSVP<Icon name='right arrow' /></Button>
      </Grid.Column>
    );
  }
}
