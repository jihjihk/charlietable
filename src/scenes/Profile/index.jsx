import React, { Component } from 'react';
import './style.css';
import { db, auth } from '../../services/firebase.js';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

import {
  Button,
  Container,
  Header,
  Segment,
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
      removeSelected: true,
      newProfile: true

    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectChangeInterests = this.handleSelectChangeInterests.bind(this);
    this.handleSelectChangeAge = this.handleSelectChangeAge.bind(this);
    this.handleSelectChangeLanguages = this.handleSelectChangeLanguages.bind(this);
    this.handleSelectChangeOccupation = this.handleSelectChangeOccupation.bind(this);
    this.handleSelectChangeLocation = this.handleSelectChangeLocation.bind(this);
    this.handleProfileCreation = this.handleProfileCreation.bind(this);
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

 handleProfileCreation(userID){
  const profileRef = db.ref('profile');
  //this.state.newProfile= true;
  profileRef.once("value")
  .then(snapshot=> {
    var data = snapshot.val();
    snapshot.forEach(childSnapshot=>{
       var key = childSnapshot.key;
        console.log("Child Key "+key);
        console.log(data[key].creator)
        if(userID == data[key].creator){
          console.log("yes")
          this.setState({
          newProfile: false,
          userInterests: data[key].userInterests,
          age: data[key].userAge,
          occupation: data[key].userOccupation,
          languages: data[key].userLanguages,
          gender:data[key].userGender,
          location: data[key].userLocation
  });
          
    
        }
    } )
    
      
  
  });
}


handleSubmit(e) {
  e.preventDefault();
  const profileRef = db.ref('profile');

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
        creator: user.uid,
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
    const user = auth.currentUser;
    this.handleProfileCreation(user.uid);
    
    //const theProfile= this.handleProfileCreation(user.G)
    //this.setState({newProfile: this.handleProfileCreation(user.G) });

  }



  render() {
    var interestOptions= INTERESTSDATA.INTERESTS;
    var ageOptions= AGEDATA.AGEGROUPS;
    var languageOptions= LANGUAGEDATA.LANGUAGES;
    var occupationOptions= OCCUPATIONDATA.OCCUPATIONS;
    var locationOptions= LOCATIONDATA.LOCATIONS;

    const newProfile = this.state.newProfile
    console.log(newProfile)

    var renderObject

    if(newProfile==true){
        renderObject= 
        <Container text>
        <Header as="h1" textAlign="center">"Tell us about yourself!"</Header>
      
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

    }
    else if (newProfile==false){
      renderObject = 
            <Container text>

            <Header as="h1" textAlign="center"> My profile</Header>
            <Header as="h3"> {"Gender: "+this.state.gender}</Header>
            <Header as="h3"> {"Interests: "+this.state.userInterests} </Header>
            <Header as="h3" > {"Age: " + this.state.age}</Header>
            <Header as="h3" >{"Languages: " +this.state.languages}</Header>
            <Header as="h3" > {"Occupation: " +this.state.occupation} </Header>
            <Header as="h3" > {"Location: " +this.state.location} </Header>
            </Container>
    }



    return (
      <div>
        <Segment>

          {renderObject}
        </Segment>
      </div>
    );
  }
}

      