import React from 'react';
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

let EventTile = function statelessFunctionComponentClass(props){
  let location = props.location;
  let time = props.time;
  let cuisine = props.cuisine;
  let buttonId = props.id;

  let source = props.source;

  let style = {
    width : '200px',
    margin: '10px'
  };

  return (
    <Grid.Column>
      <Image src={source} style={style} />
      <span>{cuisine} at {location}</span>
      {time}
      <Button id={buttonId} primary size='medium'>RSVP<Icon name='right arrow' /></Button>
    </Grid.Column>
  );
};

export default EventTile;
