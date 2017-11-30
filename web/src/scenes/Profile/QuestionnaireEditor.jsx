
import React, { Component } from 'react';
import * as SurveyJSEditor from 'surveyjs-editor';
import 'questionnairejs-editor/QuestionnaireEditor.css';

class QuestionnaireEditor extends Component {
  editor;
  componentDidMount() {
    let editorOptions = { showEmbededSurveyTab: true };
    this.editor = new SurveyJSEditor.QuestionnaireEditor('QuestionnaireEditorContainer', editorOptions);
    this.editor.saveSurveyFunc = this.saveMySurvey;
  }
  render() {
    return (
      <div id="QuestionnaireEditorContainer"></div>
    );
  }
  saveMySurvey = () => {
      console.log(JSON.stringify(this.editor.text));
  }
}

export default QuestionnaireEditor;