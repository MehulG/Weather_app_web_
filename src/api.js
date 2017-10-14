import axios from 'axios';
import React, { Component } from 'react';

const base = 'http://api.openweathermap.org/data/2.5/forecast?appid=d39f22db0c0bbbf0657284068a57a074'

//const getWeatherUrl = (lat,lon) => `${base}&lat=${lat}&lon=${lon}`;

var old = ''; //used for compairing new and old state for api calling

var temp_arr = [];

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
      <div>
        <ul>{this.state.name}<br/><br/>{this.state.temp}</ul></div>
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

    temp_arr = [];

    axios.get(getWeatherUrlCity(this.props.city))
      .then(response => {
        console.log(response);
        for (var i = 0; i < 40; i++) {
          temp_arr.push(this.round((response.data.list[i].main.temp_max-273.15),2));
          i+=7;
        }
        var temp = temp_arr.map((temp)=>(<li>{temp}</li>));
        var name = response.data.city.name +','+ response.data.city.country;
        console.log(temp);
        this.setState({
          name: name,
          temp: temp
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
