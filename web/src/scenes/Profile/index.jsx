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

const AGEDATA = require('../../data/age-groups')
const LANGUAGEDATA = require('../../data/languages')
const OCCUPATIONDATA = require('../../data/occupations')
const INTERESTSDATA = require('../../data/interests')


export default class Profile extends Component {

  constructor(){
    super()
    this.state = {
      userInterests: [],
      age: '',
      languages: [],
      occupation: '',
      gender: '',
      stayOpen: true,
      removeSelected: true

          }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);

  }
   handleSelectChange (value) {
    console.log('You\'ve selected:', value);
    this.setState({
      userInterests: value,
      languages: value,
      age: value,
    });
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
        userAge: this.state.age,
        userLanguages: this.state.languages,
        userOccupation: this.state.occupation,
        userGender: this.state.gender,
        creator: user.G
      }

      profileRef.push(profile);

      this.setState({
        userInterests: [],
        age: '',
        languages: [],
        occupation: '',
        gender: '',
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

    const profileRef= db.ref('profile');


    }


    render() {
      var interestOptions= INTERESTSDATA.INTERESTS;
      var ageOptions= AGEDATA.AGEGROUPS;
      var languageOptions= LANGUAGEDATA.LANGUAGES;
      var occupationOptions= OCCUPATIONDATA.OCCUPATIONS;

      return (
        
        <div>
          <Segment style={{ padding: '8em 0em' }} vertical>
            <Header as="h1" textAlign="center" content="Tell us about yourself!" />
            <Container text>
                <Form onSubmit={this.handleSubmit}>
                   <Form.Group>
                    <Form.Input label='Gender'type="text" name="gender" 
                      onChange={this.handleChange} value={this.state.gender} />
                  </Form.Group>
                
                  <Header as="h3"> What are your interests? </Header>
                  <div className="interest">
                  <Select
                    closeOnSelect= {!this.state.stayOpen}
                    multi
                    onChange={this.handleSelectChange}
                    options= {interestOptions}
                    placeholder="e.g. Hiking, Spanish language, Meditation..."
                    simpleValue
                    value= {this.state.userInterests}
                    removeSelected={this.state.removeSelected}
                  />    
                                      
                  </div>

                  <Header as="h3"> How old are you? </Header>
                  <div className="age-group">
                  <Select
                    closeOnSelect= {!this.state.stayOpen}
                    multi
                    onChange={this.handleSelectChange}
                    options= {ageOptions}
                    simpleValue
                    value= {this.state.age}
                    removeSelected={this.state.removeSelected}
                  />    
                                      
                 
                    </div>

                  <Header as="h3"> What languages do you speak? </Header>
                  <div className="languages">
                  <Select
                    closeOnSelect= {!this.state.stayOpen}
                    multi
                    onChange={this.handleSelectChange}
                    options= {languageOptions}
                    simpleValue
                    value= {this.state.languages}
                    removeSelected={this.state.removeSelected}
                  />    
                                      
                  </div>

                

                  <Header as="h3"> What's your occupation? </Header>
                  <div className="occupation">
                  <Select
                    closeOnSelect= {!this.state.stayOpen}
                    multi
                    onChange={this.handleSelectChange}
                    options= {occupationOptions}
                    simpleValue
                    value= {this.state.occupation}
                    removeSelected={this.state.removeSelected}
                  />    
                                      
                  </div>
                  <Button type="submit">Create my profile</Button>
                </Form>
              </Container>
          </Segment>
        </div>
      );
    }
  }