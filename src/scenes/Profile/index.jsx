import React, { Component } from 'react';
import './style.css';
import firebase from 'firebase'

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
const LOCATIONDATA = require('../../data/locations')

export default class Profile extends Component {

  constructor(){
    super()
    this.state = {
      userInterests: [],
      age: '',
      languages: [],
      occupation: '',
      location:'',
      gender: '',
      stayOpen: true,
      removeSelected: true

          }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectChangeInterests = this.handleSelectChangeInterests.bind(this);
    this.handleSelectChangeAge = this.handleSelectChangeAge.bind(this);
    this.handleSelectChangeLanguages = this.handleSelectChangeLanguages.bind(this);
    this.handleSelectChangeOccupation = this.handleSelectChangeOccupation.bind(this);
    this.handleSelectChangeLocation = this.handleSelectChangeLocation.bind(this);
  }
   handleSelectChangeInterests (value) {
     this.setState({
        userInterests: value
      });
  }
   handleSelectChangeAge (value) {
     this.setState({
        age: value
      });
  }
   handleSelectChangeLanguages (value) {
     this.setState({
        languages: value
      });
  }
   handleSelectChangeOccupation (value) {
     this.setState({
        occupation: value
      });
  }
   handleSelectChangeLocation (value) {
     this.setState({
        location: value
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
        userInterests: this.state.userInterests.split(","),
        userAge: this.state.age,
        userLanguages: this.state.languages.split(","),
        userOccupation: this.state.occupation,
        userGender: this.state.gender,
        creator: user.G,
        userLocation: this.state.location
      }

      profileRef.push(profile);

      this.setState({
        userInterests: [],
        age: '',
        languages: [],
        occupation: '',
        gender: '',
        location: ''
      });
      this.props.history.push('/');

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
      var locationOptions= LOCATIONDATA.LOCATIONS;

      return (
        
        <div>
          <Segment style={{ padding: '8em 0em' }} vertical>
            <Header as="h1" textAlign="center" content="Tell us about yourself!" />
            <Container text>
                <Form onSubmit={this.handleSubmit}>
                   
                   <Header as="h3"> Gender </Header>
                   <div className="gender">
                   <Form.Group>
                    <Form.Input type="text" name="gender" 
                      onChange={this.handleChange} value={this.state.gender} />
                  </Form.Group>
                  </div>
                
                  <Header as="h3"> What are your interests? </Header>
                  <div className="interest">
                  <Select
                    closeOnSelect= {!this.state.stayOpen}
                    multi
                    onChange={this.handleSelectChangeInterests}
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
                    onChange={this.handleSelectChangeAge}
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
                    onChange={this.handleSelectChangeLanguages}
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
                    onChange={this.handleSelectChangeOccupation}
                    options= {occupationOptions}
                    simpleValue
                    value= {this.state.occupation}
                    removeSelected={this.state.removeSelected}
                  />    
                                      
                  </div>
                    <Header as="h3"> Where do you live? </Header>
                  <div className="location">
                  <Select
                    closeOnSelect= {!this.state.stayOpen}
                    onChange={this.handleSelectChangeLocation}
                    options= {locationOptions}
                    simpleValue
                    value= {this.state.location}
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