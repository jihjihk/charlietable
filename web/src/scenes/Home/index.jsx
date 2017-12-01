import React, { Component } from 'react';
import {  Link } from 'react-router-dom'
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
          <Container>
            <Menu fixed='top' size='large'>
              <Link to="/"><Menu.Item as='home' active>Home</Menu.Item></Link>
              <Link to="/dining"><Menu.Item as='events'>Explore</Menu.Item></Link>
              <Link to="/newevent"><Menu.Item as='newevent'>Create Event</Menu.Item></Link>
              <Link to="/"><Menu.Item as='messages'>Messages</Menu.Item></Link>

                {this.state.user ?
                   <Link to ="/profile">
                  <Menu.Item as='mypage'>
                   
                      <Image src={this.state.user.photoURL} size='mini' circular />
                      &nbsp;{this.state.user.displayName}
                      <Menu.Item as='events'><Link to="/Profile/src"> My profile</Link></Menu.Item>
                  </Menu.Item>
                    </Link>
                   
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
          <Link to="/Dining">
            <Button primary size='huge'>
              Find Dinners
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