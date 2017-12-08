import React, { Component } from 'react';
import * as Survey from 'survey-react';
import 'survey-react/survey.css';
// import SurveyEditor from './SurveyEditor';
// import logo from './logo.svg';
// import './index.css';
// import 'bootstrap/dist/css/bootstrap.css';
import { db, auth, provider } from '../../services/firebase.js';

class Profile extends Component {
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

