import React, { Component } from 'react';
import logo from './logo.svg';
//import ReactDOM from 'react-dom';
//import App from './App';
import './index.css';
import * as Survey from 'survey-react';
import 'survey-react/survey.css';
//import firebase, { auth, provider } from '../../services/firebase.js';

// import './index.css';
import firebase, { auth, provider } from '../../services/firebase.js';
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

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      interest: '',
      cuisine: '',
      username: '',
      items: []
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
  };
   
   
   render() {
    Survey.Survey.cssType = "bootstrap";
    var model = new Survey.Model(this.json);
    return (
      <div className="App">
      
        <div className="surveyjs">
          {/*If you want to show survey, uncomment the line below*/}
          <Survey.Survey model={model}/>
          
          {/*<SurveyEditor />*/}
        </div>
      
      </div>
    );
  }
}
