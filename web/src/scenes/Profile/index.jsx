
import React, { Component } from 'react';
import './style.css';
import firebase from 'firebase'

//import * as Survey from 'survey-react';
//import 'survey-react/survey.css';
// import SurveyEditor from './SurveyEditor';
// import logo from './logo.svg';
// import './index.css';
// import 'bootstrap/dist/css/bootstrap.css';


import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { ref, auth, provider } from '../../services/firebase.js';
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


class Profile extends Component {

  constructor(){
    super()
    this.state = {
      eventName : '',
      participants: [],
      time: moment(),
      city: '',
      venue: '',
      cuisine: '',
      userInterests: [],
      creator: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }



  handleChange(e) {
  if(e._isAMomentObject){
    this.setState({time: e});
  }else{
     this.setState({
          [e.target.name]: e.target.value
        });
    }
  }

   handleSubmit(e) {
    e.preventDefault();
    const eventsRef = firebase.database().ref('events');

    //we can use the imported modules from /services/firebase.js and replace firebase.auth() with auth
    const user = auth.currentUser;
    console.log(user);
    if(user){

      const event = {
        eventName : this.state.eventName,
        participants: [user.G],
        time: this.state.time,
        city: this.state.city,
        venue: this.state.venue,
        userInterests: this.state.userInterests,
        cuisine: this.state.cuisine,
        creator: user.G
      }

      eventsRef.push(event);

      this.setState({
        eventName : '',
        participants: [],
        time: moment(),
        city: '',
        venue: '',
        cuisine: '',
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

    }
    render() {

    return (
      <div>
        <Segment style={{ padding: '8em 0em' }} vertical>
          <Header as="h1" textAlign="center" content="Tell us about yourself!" />
          <Container text>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group>
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
                </Form.Group>
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
    json = { title: 'Create your profile!', showProgressBar: 'top', pages: [
      {
        questions: [{
            type: 'matrix',
            name: 'Quality',
            title: 'How comfortable are you with the following settings',
            columns: [{
                value: 1,
                text: 'Very uncomfortable'
              },
              {
                value: 2,
                text: 'Uncomfortable'
              },
              {
                value: 3,
                text: 'Neutral'
              },
              {
                value: 4,
                text: 'Comfortable'
              },
              {
                value: 5,
                text: 'Very Comfortable'
              }
            ],
            rows: [{
                value: 'language',
                text: 'Having dinner with people who have different native languages than me/ speak primarily in English'
              },
              {
                value: 'religion',
                text: 'Having dinner with people who hold diverse religious beliefs'
              },
              {
                value: 'gender',
                text: 'Having dinner with people from the opposite gender'
              },
              {
                value: 'age',
                text: 'Having dinner with people from a different age group'
              }
            ]
          },
          {
            type: 'comment',
            name: 'bio',
            title: 'Tell us about yourself!',
          }
        ]
      }, {
        questions: [{
            type: 'radiogroup',
            name: 'Topics',
            title: 'What are you interested in talking about?',
            choices: ['Politics', 'Sports', 'Religion', 'Social Issues']
          },
          {
            type: 'radiogroup',
            name: 'Industry',
            title: 'What organizations/industries are you intersted in?',
            choices: ['Tech', 'Finance']
          },
          {
            type: 'multipletext',
            name: 'pricelimit',
            title: 'What is the... ',
            items: [{
                name: 'mostamount',
                title: 'Most amount you would every pay for a product like ours'
              },
              {
                name: 'leastamount',
                title: 'The least amount you would feel comfortable paying'
              }
            ]
          }
        ]
      }, {
        questions: [{
          type: 'text',
          name: 'create-profile',
          title: 'If you are ready to create your profile, please press the "Submit" button.'
        }]
      }]
  }
  };
   
   
   render() {
    Survey.Survey.cssType = "bootstrap";
    var model = new Survey.Model(this.json);
    return (
      <div className="Profile">
      
        <div className="surveyjs">
          {/*If you want to show survey, uncomment the line below*/}
          <Survey.Survey model={model}/>
          {/*If you want to show survey editor, uncomment the line below*/}
          {/*<SurveyEditor />*/}
        </div>
       
      </div>
    );
  }
}

export default Profile;

