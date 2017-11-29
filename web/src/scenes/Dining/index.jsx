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
      interest: '',
      cuisine: '',
      username: '',
      items: []
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
            <Container>
              <Menu fixed='top' size='large'>
                <Menu.Item as='home' active>Home</Menu.Item>
                <Menu.Item as='events'>Explore</Menu.Item>
                <Menu.Item as='messages'>Messages</Menu.Item>

                  {this.state.user ?
                    <Menu.Item as='mypage'>
                        <Image src={this.state.user.photoURL} size='mini' circular />
                        &nbsp;{this.state.user.displayName}
                    </Menu.Item>
                    :
                    <Menu.Item as='mypage'>
                      My Page
                    </Menu.Item>
                  }
                }

                <Menu.Menu position='right'>
                  <Menu.Item className='item'>
                    {this.state.user ?
                        <Button as='logout' onClick={this.logout}>Log Out</Button>
                        :
                        <Button as='login' onClick={this.login}>Log In</Button>
                      }
                  </Menu.Item>
                </Menu.Menu>
            </Menu>
          </Container>


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
                  <Image src='/Images/salad.png' size='medium' style={{ marginTop: '2em' }} />
                  <Button primary size='medium'>
                    RSVP
                    <Icon name='right arrow' />
                  </Button>
                </Grid.Column>
                <Grid.Column>
                  <Image src='/Images/hamburger.png' size='medium' style={{ marginTop: '2em' }} />
                  <Button primary size='medium'>
                    RSVP
                    <Icon name='right arrow' />
                  </Button>
                </Grid.Column>
                <Grid.Column>
                  <Image src='/Images/strawberry.png' size='medium' style={{ marginTop: '2em' }} />
                  <Button primary size='medium'>
                    RSVP
                    <Icon name='right arrow' />
                  </Button>
                </Grid.Column>
                <Grid.Column>
                  <Image src='/Images/salad.png' size='medium' style={{ marginTop: '2em' }} />
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
