import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const GENDER = [
  { label: "Female", value: "female" },
  { label: "Male", value: "male" },
  { label: "Other", value: "other" },
  
  
  
 
]

export default class genderMultiSelect extends Component {
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
    const options = GENDER;
    return (
      <div className="section">
        <Select
          closeOnSelect={!stayOpen}
          multi
          onChange={this.handleSelectChange}
          options={options}
          placeholder="gender..."
          simpleValue
          value={value}
        />
      </div>
    );
  }
}