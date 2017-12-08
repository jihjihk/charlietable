import React, { Component } from 'react';
import './style.css';
import firebase from 'firebase'

//import * as Survey from 'survey-react';
//import 'survey-react/survey.css';
// import SurveyEditor from './SurveyEditor';
// import logo from './logo.svg';
// import './index.css';
// import 'bootstrap/dist/css/bootstrap.css';
import { db, auth, provider } from '../../services/firebase.js';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

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

import InterestMultiSelect from '../../components/Select/InterestMultiSelect.js'

export default class Profile extends Component {

  constructor(){
    super()
    this.state = {
      userInterests: [],
          }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }



  handleChange(e) {
 
     this.setState({
          [e.target.name]: e.target.value
        });
    
  }

   handleSubmit(e) {
    e.preventDefault();
    const profileRef = firebase.database().ref('profile');

    //we can use the imported modules from /services/firebase.js and replace firebase.auth() with auth
    const user = auth.currentUser;
    console.log(user);
    if(user){

      const profile = {
        userName : user.displayName,
        participants: [user.G],
        userInterests: this.state.userInterests,
        creator: user.G
      }

      profileRef.push(profile);

      this.setState({
        userInterests: [],
        creator: ''
      });

    } else{
        alert("please first login");
    }

  }
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });

    //line to user profile database on firebase
    //const profileRef = firebase.database().ref('user-profiles');

      /*<Form.Group>
                  <Form.Input label='Event Name' placeholder='What is the event called?' type="text" name="eventName" 
                    onChange={this.handleChange} value={this.state.eventName} />
                  <Form.Input label='City' placeholder='Where are you hosting it?' type="text" name="city" 
                    onChange={this.handleChange} value={this.state.city} />
                </Form.Group>
                <Form.Group>
                  <Form.Input label='Venue Name' placeholder="Which restaurant/bar will it be at?" type="text" name="venue" 
                    onChange={this.handleChange} value={this.state.venue} />
                  <Form.Input label='Cuisine' placeholder="French, Thai, or Beer?" type="text" name="cuisine" 
                    onChange={this.handleChange} value={this.state.cuisine} />
                </Form.Group> */

    }
    render() {

    return (
      <div>
        <Segment style={{ padding: '8em 0em' }} vertical>
          <Header as="h1" textAlign="center" content="Tell us about yourself!" />
          <Container text>
              <Form onSubmit={this.handleSubmit}>
              
                <Header as="h3"> What are your interests? </Header>
                <InterestMultiSelect label="InterestMultiSelect" onChange={this.handleChange} value={this.state.userInterests}/>
                                    
             
                <Button type="submit">Create my profile</Button>
              </Form>
            </Container>
        </Segment>
      </div>
    );
  }
}