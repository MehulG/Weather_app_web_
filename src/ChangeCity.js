import React, { Component } from 'react';
import GetData from './api';


class ChangeCity extends Component {
  constructor(props){
    super(props);
    this.state = {};
    //console.log('ChangeCity');
  }

  render(){
    //console.log(this.props.city);

    return (
      <div>
        <GetData city={this.props.city}/>
      </div>
    );
  }


}
 export default ChangeCity;
