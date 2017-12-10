import React, { Component } from 'react';
import {  Link } from 'react-router-dom'
import {
  Button,
  Container,
  Header,
  Icon,
  Segment,
  Grid,
  Image
} from 'semantic-ui-react'

export default class Home extends Component {
  render () {
    return (
      <div>
        <Segment
          inverted
          textAlign='center'
          style={{ minHeight: 700, padding: '1em 0em', backgroundImage: `url("https://media.brides.com/photos/59567e4eec147364a0686f67/master/pass/Julie&Mathieu20161014_10.jpg")`,
                    backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover'}}
          vertical

        >
          <Container text>
            <Header
              as='h1'
              content='The Dinner Party You Choose'
              inverted
              style={{ fontSize: '4em', fontWeight: 'bold', marginBottom: 0, marginTop: '3em' }}
            />
            <Header
              as='h2'
              content='Curated dinners with 3 interesting strangers like you'
              inverted
              style={{ fontSize: '1.7em', fontWeight: 'normal' }}
            />
            <Link to="/dining">
              <Button primary size='huge' style={{ margin:"1em"}}>
                Find Dinners Near You
                <Icon name='right arrow' />
              </Button>
            </Link>
          </Container>
        </Segment>
 
        <Segment style={{ padding: '8em 0em' }} vertical textAlign='center'>
          <Container text>
              <Header
                as='h1'
                content='About'
                style={{ fontSize: '3em', fontWeight: 'bold'}}
              />
              <Header
                as='h2'
                content="Great meals and meaningful conversations"
                textAlign='center'
                style={{ fontSize: '2em', fontWeight: 'normal', marginBottom: '2em', marginTop: '1em' }}
              />
          </Container>
          <Grid container stackable verticalAlign="middle" textAlign='center' style={{margin: '2em'}}>
            <Grid.Row columns={3}>
              <Grid.Column>
                <Image centered src='/img/icon/calendar.png' size='small'  />
                <Header
                  as='h3'
                  content='No More Planning'
                />
                <p  style={{fontSize:'1.2em'}}>Planning is stressful so we will do it for you. Just tell us the time that works and we will schedule and reserve.</p>
              </Grid.Column>
              <Grid.Column>
                <Image centered src='/img/icon/wine.png' size='small'  />
                <Header
                  as='h3'
                  content='Great Dining'
                />
                <p style={{fontSize:'1.2em'}}>Can't decide what to eat? We will guide you to exciting venues that are verified and recommended.</p>
              
              </Grid.Column>
              <Grid.Column>
                <Image centered src='/img/icon/happy.png' size='small'  />
                <Header
                  as='h3'
                  content='New Connections'
                />
                <p style={{fontSize:'1.2em'}}>Meet 3 people who share similar interests with you. Charlie will break the ice and help create deep conversations.</p>
              
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        <Segment style={{ padding: '8em 0em' }} vertical textAlign='center'>
          <Container text>
              <Header
                as='h1'
                content='Dinners Around You'
                style={{ fontSize: '3em', fontWeight: 'bold', marginBottom: 0, marginTop: '1em' }}
              />
              <Link to="/dining">
                <Button primary size='huge' style={{ margin:"1em"}}>
                  Discover More
                </Button>
              </Link>
          </Container>
          <Grid container stackable verticalAlign="middle" textAlign='center' style={{margin: '2em'}}>
            <Grid.Row columns={3}>
              <Grid.Column>
                <Image centered src='/img/dinner.jpg' size='medium'  />
                <Header
                  as='h3'
                  content='Dinner 1'
                />
                <p style={{fontSize:'1em'}}>Some awesome event.</p>
              </Grid.Column>
              <Grid.Column>
                <Image centered src='/img/dinner.jpg' size='medium'  />
                <Header
                  as='h3'
                  content='Dinner 2'
                />
                <p style={{fontSize:'1em'}}>Some awesome event.</p>
              </Grid.Column>
              <Grid.Column>
                <Image centered src='/img/dinner.jpg' size='medium'  />
                <Header
                  as='h3'
                  content='Dinner 3'
                />
                <p style={{fontSize:'1em'}}>Some awesome event.</p>
              
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
    </div>
    )
  }
}