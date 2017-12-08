import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const INTERESTS = [
  { label: "Writing", value: "writing" },
  { label: "Art", value: "art" },
  { label: "Film", value: "film" },
  { label: "Literature", value: "literature" },
  { label: "Music", value: "music" },
  { label: "Photography", value: "photography" },
  { label: "Business Networking", value: "businessNetworking" },
  { label: "Entrepreneurship", value: "entrepreneurship" },
  { label: "Investing", value: "investing" },
  { label: "Real Estate", value: "realEstate" },
  { label: "Young Professionals", value: "youngProfessionals" },
  { label: "Travel", value: "travel" },
  { label: "LGBTQ", value: "lgbtq" },
  { label: "Philanthropy", value: "philanthropy" },
  { label: "Vegetarian", value: "vegetarian" },
  { label: "Working Abroad", value: "workingAbroad" },
  { label: "Arabic Language & Culture", value: "arbic" },
  { label: "Spanish Language & Culture", value: "spanish" },
  { label: "French Language & Culture", value: "french" },
  { label: "Korean Language & Culture", value: "korean" },
  { label: "Meditation", value: "meditation" },
  { label: "Self Development", value: "selfDevelopment" },
  { label: "Nutrition", value: "nutrition" },
  { label: "Weight Lifting", value: "weightLifting" },
  { label: "Soccer", value: "soccer" },
  { label: "Exercise", value: "exercise" },
  { label: "Hiking", value: "hiking" },
  { label: "Games", value: "games" },
  { label: "Dining Out", value: "diningOut" },
  { label: "Wine and Beer", value: "wineBeer" },
  { label: "Web Development", value: "webDevelopment" },
  { label: "Blockchain and Cryptocurrency", value: "blockchainCrypto" },
  { label: "JavaScript", value: "javascript" },
  { label: "Machine Learning", value: "machineLearning" },
  { label: "Pets", value: "pets" },
  { label: "Animal Rights", value: "animalRights" },
  { label: "Political Activism", value: "politicalActivism" },
  { label: "Women in Technology", value: "womenInTech" },
  { label: "Religion", value: "religion" },
  { label: "Spirituality", value: "spirituality" },
  { label: "Artificial Intelligence", value: "ai" },
  { label: "Economics", value: "economics" },
  { label: "20's Social", value: "20social" },
  { label: "30's Social", value: "30social" },
  { label: "Dating and Relationship", value: "dating" },
  { label: "Women Empowerment", value: "womenEmpowerment" }
]

export default class InterestMultiSelect extends Component {
  constructor() {
    super();
    this.state = {
      removeSelected: true,
      stayOpen: true,
      interestValue: []
    }
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleSelectChange (interestValue) {
    console.log('You\'ve selected:', interestValue);
    this.setState({ interestValue });
  }

  render () {
    const { stayOpen, removeSelected, interestValue } = this.state;
    const options = INTERESTS;
    return (
      <div className="section">
        <Select
          closeOnSelect={!stayOpen}
          multi
          onChange={this.handleSelectChange}
          options={options}
          placeholder="e.g. Hiking, Spanish language, Meditation..."
          simpleValue
          value={interestValue}
        />
      </div>
    );
  }
}