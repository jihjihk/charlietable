import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const LANGUAGES = [
  { label: "Arabic", value: "arabic" },
  { label: "Bengali", value: "bengail" },
  { label: "Chinese", value: "chinese" },
  { label: "Danish", value: "danish" },
  { label: "English", value: "english" },
  { label: "French", value: "french" },
  { label: "German", value: "german" },
  { label: "Greek", value: "greek" },
  { label: "Hindi", value: "hindi" },
  { label: "Italian", value: "italian" },
  { label: "Japanese", value: "japanese" },
  { label: "Korean", value: "korean" },
  { label: "Malay", value: "malay" },
  { label: "Nepali", value: "nepali" },
  { label: "Punjabi", value: "punjabi" },
  { label: "Polish", value: "polish" },
  { label: "Portuguese", value: "portuguese" },
  { label: "Russian", value: "russian" },
  { label: "Serbian", value: "serbian" },
  { label: "Spanish", value: "spanish" },
  { label: "Swahili", value: "swahili" },
  { label: "Tagalog", value: "tagalog" },
  { label: "Tamil", value: "tamil" },
  { label: "Thai", value: "thai" },
  { label: "Turkish", value: "turkish" },
  { label: "Urdu", value: "urdu" },
  
 
]

export default class languageMultiSelect extends Component {
  constructor() {
    super();
    this.state = {
      removeSelected: true,
      stayOpen: true,
      value: []
    }
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleSelectChange (value) {
    console.log('You\'ve selected:', value);
    this.setState({ value });
  }

  render () {
    const { stayOpen, value } = this.state;
    const options = LANGUAGES;
    return (
      <div className="section">
        <Select
          closeOnSelect={!stayOpen}
          multi
          onChange={this.handleSelectChange}
          options={options}
          placeholder="e.g. English, Spanish, Chinese...etc"
          simpleValue
          value={value}
        />
      </div>
    );
  }
}