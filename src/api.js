import axios from 'axios';
import React, { Component } from 'react';
var Plotly = require('plotly.js/lib/core');
require('./grid.css');

const base = 'http://api.openweathermap.org/data/2.5/forecast?appid=d39f22db0c0bbbf0657284068a57a074'
const base_current = 'http://api.openweathermap.org/data/2.5/weather?appid=d39f22db0c0bbbf0657284068a57a074'



//const getWeatherUrl = (lat,lon) => `${base}&lat=${lat}&lon=${lon}`;

var old = ''; //used for compairing new and old state for api calling

var temp_arr = [];
var date_arr = [];
var weather_arr = [];

const getWeatherUrlCity = (city) => `${base}&q=${city}`;
const getWeatherUrlCity_current = (city) => `${base_current}&q=${city}`;


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
        <br/>
        <div id = 'city_name'>{this.state.name}
          <br/>
          {this.state.temp_current}
          <br/>
          {this.state.weather_current}
        </div>
        <br/><br/>
        <div id = 'content'>
          {this.state.day}
          {this.state.temp}
          {this.state.weather}
        </div>
        <br/>
        <div id="myDiv"></div>
      </div>
    );
  }



  //custom functions

//Used to check if new city is added
  Change(){
    if(old !== this.props.city){
      this.AfterChange();
      old = this.props.city;
    }
    else{}
  }

// api calling recieveing response and error handling
  AfterChange(){
    axios.get(getWeatherUrlCity_current(this.props.city))
      .then(response =>{
        console.log(response);
        this.setState({
          temp_current: this.round((response.data.main.temp-273.15),2) + ' °C',
          weather_current: response.data.weather["0"].description
        })
        //console.log('current');
      })
      .catch(error => {
        this.setState({
          temp_current: '',
          weather_current: ''
        })
        console.log("Can't get current weather");
      });

//forecast
    temp_arr = [];
    date_arr = [];
    weather_arr = [];


    axios.get(getWeatherUrlCity(this.props.city))
      .then(response => {

        console.log(response);

        for (var i = 0; i < 40; i++) {
          temp_arr.push(this.round((response.data.list[i].main.temp_max-273.15),2));
          var date = new Date(response.data.list[i].dt*1000);
          date_arr.push(date);
          weather_arr.push(response.data.list[i].weather["0"].description);
          i+=7;
        }

        var temp = temp_arr.map((temp)=>(<div>{temp} °C</div>));
        var weather = weather_arr.map((weather) => <div className = 'weather'>{weather}</div>)

        var day_map = ['Sunday','Monday', 'Tuesday', 'Thursday', 'Friday', 'Saturday'];

        var day = date_arr.map((date) => <div className = 'weather'>{day_map[date.getDay()]}</div>)

        console.log(weather_arr);
        if (response.data.city.country) {
          var name = response.data.city.name +', '+ response.data.city.country;
        }else {
           name = response.data.city.name;
        }

        //console.log(temp);

        this.setState({
          name: name,
          temp: temp,
          weather:weather,
          day: day
        });

        var data = [
          {
            x: date_arr,
            y: temp_arr,
            line: {shape: 'spline'},
            type: 'scatter'
          }
        ];
        var myDiv = document.getElementById('myDiv');
        myDiv.style.display = 'block';


        Plotly.newPlot('myDiv', data);
      })
      .catch(error => {
        this.setState({
          name: '',
          temp: '',
          weather:'',
          day: ''
        });
        var data = [
          {
            x: [],
            y: [],
            line: {shape: 'spline'},
            type: 'scatter'
          }
        ];

        //Plotly.newPlot('myDiv', data);

        var myDiv = document.getElementById('myDiv');
        myDiv.style.display = 'none';

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
