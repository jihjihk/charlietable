import React, { Component } from 'react';
import {
  Button,
  Grid,
  Image,
  Icon,
  Modal
} from 'semantic-ui-react';

export default class Modal extends Component{

  render(){
    return(
      <div class="ui_modal">
        <div class="ui icon header">
          <i class="archive icon"></i>
          You Have Registered!!
        </div>
        <div class="actions">
          <div class="ui green ok inverted button" style={{position:'relative', align:'center'}}>
            <i class="checkmark icon"></i>
            Ok!
          </div>
        </div>
      </div>
    );
  }
}
