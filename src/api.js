import axios from 'axios';
import React, { Component } from 'react';

const base = 'http://api.openweathermap.org/data/2.5/weather?appid=d39f22db0c0bbbf0657284068a57a074'

//const getWeatherUrl = (lat,lon) => `${base}&lat=${lat}&lon=${lon}`;

var old = ''; //used for compairing new and old state for api calling

const getWeatherUrlCity = (city) => `${base}&q=${city}`;

class GetData extends Component {
  constructor(props){
    super(props)
    this.state = {};
    //console.log('const_api');
  }


  render(){
    this.Change();
    return(
      <p>{this.state.name} {this.state.temp}</p>
    );
  }



  //custom functions

//basically used to check if new city is added
  Change(){
    if(old !== this.props.city){
      this.AfterChange();
      old = this.props.city;
    }
    else{}
  }

// api calling recieveing response and error handling
  AfterChange(){
    axios.get(getWeatherUrlCity(this.props.city))
      .then(response => {
        console.log(response);
        var temp = response.data.main.temp_max;
        var name = response.data.name;
        this.setState({
          name: name,
          temp: this.round((temp-273.15),2)
        });
      })
      .catch(error => {
        console.log(this.props.city);
        this.setState({
          name:'Error',
          temp: ''
        });
        console.log(error);
      });

  }

  round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
  }


}


export default GetData;
