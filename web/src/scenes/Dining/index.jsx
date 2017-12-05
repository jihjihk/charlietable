import React, { Component } from 'react';
import logo from './logo.svg';
import './style.css';

//import firebase, { auth, provider } from './firebase.js';
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
} from 'semantic-ui-react'

export default class Dining extends Component{
  constructor() {
    super();
    this.state = {
      user: user
    }
  }

    render(){
      return(
        <div>
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em' }}
            vertical
          >
          <Container text>
            <Header
              as='h1'
              content='Choose Your Dinner'
              inverted
              style={{ fontSize: '4em', fontWeight: 'normal', marginBottom: 0, marginTop: 0 }}
            />
            <Header
              as='h2'
              content='We Will Curate The Rest'
              inverted
              style={{ fontSize: '1.7em', fontWeight: 'normal' }}
            />
            </Container>
            <Grid columns={4} divided>
              <Grid.Row>
                <Grid.Column>
                  <Image href='./Images/salad.png' size='medium' style={{ marginTop: '2em' }} />
                  <Button primary size='medium'>
                    RSVP
                    <Icon name='right arrow' />
                  </Button>
                </Grid.Column>
                <Grid.Column>
                  <Image href='./Images/hamburger.png' size='medium' style={{ marginTop: '2em' }} />
                  <Button primary size='medium'>
                    RSVP
                    <Icon name='right arrow' />
                  </Button>
                </Grid.Column>
                <Grid.Column>
                  <Image href='./Images/strawberry.png' size='medium' style={{ marginTop: '2em' }} />
                  <Button primary size='medium'>
                    RSVP
                    <Icon name='right arrow' />
                  </Button>
                </Grid.Column>
                <Grid.Column>
                  <Image href='./Images/salad.png' size='medium' style={{ marginTop: '2em' }} />
                  <Button primary size='medium'>
                    RSVP
                    <Icon name='right arrow' />
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
        </Segment>
      </div>
      );
    }
}
