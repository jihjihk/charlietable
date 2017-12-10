import React, { Component } from 'react';
import {  Link } from 'react-router-dom'
import {
  Button,
  Container,
  Header,
  Icon,
  Segment,
} from 'semantic-ui-react'

export default class Home extends Component {
  render () {
    return (
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
              content='The Dinner Party You Choose'
              inverted
              style={{ fontSize: '4em', fontWeight: 'normal', marginBottom: 0, marginTop: '3em' }}
            />
            <Header
              as='h2'
              content='Curated dinners with 3 interesting strangers like you'
              inverted
              style={{ fontSize: '1.7em', fontWeight: 'normal' }}
            />
            <Link to="/dining">
              <Button primary size='huge'>
                Find Dinners Around You
                <Icon name='right arrow' />
              </Button>
            </Link>
          </Container>
        </Segment>

        <Segment style={{ padding: '8em 0em' }} vertical>

          <Container>
            <h2>Some Sample Events
            </h2>
          </Container>
        </Segment>
    </div>
    )
  }
}