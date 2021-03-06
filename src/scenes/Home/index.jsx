import React, { Component } from 'react';
import {  Link } from 'react-router-dom'
import {
  Button,
  Container,
  Header,
  Segment,
  Grid,
  Image,
  List,
  Label,
  Icon
} from 'semantic-ui-react'

export default class Home extends Component {
  render () {
    return (
      <div>
        <Segment
          inverted
          textAlign='center'
          style={{ minHeight: 700, padding: '1em 0em', background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://media.brides.com/photos/59567e4eec147364a0686f67/master/pass/Julie&Mathieu20161014_10.jpg")',
                    backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', opacity:'0.85'}}
          vertical

        >
          <Container>
            <Header
              as='h1'
              content='The Dinner Party You Choose'
              inverted
              style={{ fontSize: '4em', fontWeight: 'bold', marginBottom: 0, marginTop: '4em' }}
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
                <Image centered src="http://cook.fnr.sndimg.com/content/dam/images/cook/fullset/2011/1/6/0/CCEV103_Margherita-Pizza_s4x3.jpg.rend.hgtvcom.966.725.suffix/1416867304309.jpeg" size='medium' style={{backgroundPosition: 'center', width:'330px', height:'260px', overflow:'hidden'}} />
                <Header
                  as='h1'
                  content='Hiking & Diving'
                />
                <List horizontal> 
                  <List.Item>
                    <List.Content>
                      <Label style={{fontSize:"1em"}} as='a' color='teal'>
                        Hiking
                      </Label>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content>
                      <Label style={{fontSize:"1em"}} as='a' color='teal'>
                        Exercise
                      </Label>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content>
                      <Label style={{fontSize:"1em"}} as='a' color='teal'>
                        Food & Dining
                      </Label>
                    </List.Content>
                  </List.Item>
                </List>
                <p style={{fontSize:'1.5em', marginTop:'1em'}}>Italian at Little Italy</p>
                <p>7pm on Tuesday</p>
                <Button style={{ margin:'1em'}} primary size='medium'>RSVP<Icon name='right arrow' /></Button>
              </Grid.Column>
              <Grid.Column>
                <Image centered src="img/dinner.jpg" size='medium' style={{width:'330px', height:'260px', overflow:'hidden', backgroundPosition: 'center'}} />
                <Header
                  as='h1'
                  content='Coffee+Travel'
                />
                <List horizontal> 
                  <List.Item>
                    <List.Content>
                      <Label style={{fontSize:"1em"}} as='a' color='teal'>
                        Coffee
                      </Label>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content>
                      <Label style={{fontSize:"1em"}} as='a' color='teal'>
                        Travel
                      </Label>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content>
                      <Label style={{fontSize:"1em"}} as='a' color='teal'>
                        Working Abroad
                      </Label>
                    </List.Content>
                  </List.Item>
                </List>
                <p style={{fontSize:'1.5em', marginTop:'1em'}}>Ethiopian at Bonne Anne</p>
                <p>6pm on Monday</p>
                <Button style={{ margin:'1em'}} primary size='medium'>RSVP<Icon name='right arrow' /></Button>
              </Grid.Column>
              <Grid.Column>
                <Image centered src="https://cdn.vox-cdn.com/thumbor/zXCcamd4pwv0u1Tqt5uhaONy-KE=/0x134:960x854/1200x900/filters:focal(0x134:960x854)/cdn.vox-cdn.com/uploads/chorus_image/image/52883105/babu_ji.0.0.jpg" size='medium' style={{backgroundPosition: 'center', width:'330px', height:'260px', overflow:'hidden'}} />
                <Header
                  as='h1'
                  content='Vegetarians in Abu Dhabi'
                />
                <List horizontal> 
                  <List.Item>
                    <List.Content>
                      <Label style={{fontSize:"1em"}} as='a' color='teal'>
                        Vegetarian
                      </Label>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content>
                      <Label style={{fontSize:"1em"}} as='a' color='teal'>
                        Philanthropy
                      </Label>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content>
                      <Label style={{fontSize:"1em"}} as='a' color='teal'>
                        Animal Rights
                      </Label>
                    </List.Content>
                  </List.Item>
                </List>
                <p style={{fontSize:'1.5em', marginTop:'1em'}}>Indian at Sangeetha</p>
                <p>8pm on Wednesday</p>
                <Button style={{ margin:'1em'}} primary size='medium'>RSVP<Icon name='right arrow' /></Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
    </div>
    )
  }
}
