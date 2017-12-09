import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const AGEGROUPS = [
  { label: "18-25", value: "18-25" },
  { label: "25-30", value: "25-30" },
  { label: "30-35", value: "30-35" },
  { label: "35-40", value: "35-40" },
  { label: "40-45", value: "40-45" },
  { label: "45-50", value: "45-50" },
  { label: "50-55", value: "50-55" },
  { label: "55-60", value: "55-60" },
  { label: "60-65", value: "60-65" },
  { label: "65-70", value: "65-70" },
  { label: "70-75", value: "70-75" },
  { label: "75-80", value: "75-80" },
  { label: "80-85", value: "80-85" },
  { label: "85-90", value: "85-90" },
  { label: "90+", value: "90+" },



]

export default class ageMultiSelect extends Component {
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
    const options = AGEGROUPS;
    return (
      <div className="section">
        <Select
          closeOnSelect={!stayOpen}
          multi
          onChange={this.handleSelectChange}
          options={options}
          placeholder="age groups..."
          simpleValue
          value={value}
        />
      </div>
    );
  }
}
