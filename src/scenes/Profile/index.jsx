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
  Form,
  Grid,
  Card,
  List,
  Label,
  Icon
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
      newProfile: true,

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
/*
 handleEditButton (e) {
  this.setState({
    newProfile: true
  })
  this.forceUpdate();
 }
*/
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

    if(user){
      const profile = {
        userName : user.displayName,
        userInterests: this.state.userInterests.split(","),
        userAge: this.state.age,
        userLanguages: this.state.languages.split(","),
        userOccupation: this.state.occupation,
        userGender: this.state.gender,
        creator: user.uid,
        userLocation: this.state.location,
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

    const user = auth.currentUser;
    var renderObject

    if(newProfile==true){
        renderObject= 
        <Container text>      
          <Form style={{margin:"1em", padding:"1em"}}onSubmit={this.handleSubmit}>
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
            <Button style={{marginTop:'3em', marginBottom:'3em'}} type="submit">Create my profile</Button>
            </Form>
            </Container>

    }
    else if (newProfile==false){
      renderObject = 
            <Container text>
              <Header as="h1" textAlign="center" style={{margin:"2em"}}> My Profile</Header>
              
              <Grid container stackable>
                <Grid.Row>
                  <Grid.Column width={6}>
                    <Card
                      image={user.photoURL}
                      header={user.displayName}
                      meta={this.state.location}
                      extra={
                        occupationOptions[occupationOptions.findIndex(obj => obj['value'] === this.state.occupation)]['label']
                      }
                    />
                    <Button icon labelPosition='left' fluid>
                      <Icon name="setting" />
                      Edit
                    </Button>
                  </Grid.Column>

                  <Grid.Column width={10}>
                    <Header as="h2" content="Interests" />
                    <List horizontal>
                      {this.state.userInterests.map(function(interest) {
                        var label = interestOptions.findIndex(obj => obj['value'] === interest)
                        return (
                          <List.Item>
                            <List.Content>
                              <Label style={{fontSize:"1em"}} as='a' color='teal'>
                                {interestOptions[label]['label']}
                              </Label>
                            </List.Content>
                          </List.Item>
                        )
                      })}
                    </List>
                    
                    <Header as="h2" content="Languages" />
                    <List horizontal>
                      {this.state.languages.map(function(language) {
                        var label = languageOptions.findIndex(obj => obj['value'] === language)
                        return (
                          <List.Item>
                            <List.Content>
                              <Label style={{fontSize:"1em"}} as='a' color='yellow'>
                               {languageOptions[label]['label']}
                              </Label>
                            </List.Content>
                          </List.Item>
                        )
                      })}
                    </List>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              
            </Container>
    }



    return (
      <div style={{marginBottom:"2em"}}>
        <Segment
        textAlign='center'
        style={{ minHeight: 400, padding: '1em 0em', background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://si.wsj.net/public/resources/images/BN-TW891_invest_J_20170615160045.jpg")',
                  backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', opacity:'0.9'}}
        vertical
        inverted
        >
          <Container>
            <Header
              as='h1'
              content='Tell us about yourself'
              inverted
              style={{ fontSize: '4em', fontWeight: 'bold', marginBottom: '0.5em', marginTop: '2em' }}
            />
            <Header
              as='h2'
              inverted
              content='We will curate the best events for you'
              style={{ fontSize: '2em', fontWeight: 'normal', marginBottom:'2em' }}
            />
          </Container>
        </Segment>

          {renderObject}
      </div>
    );
  }
}

      