import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './Form';


class App extends Component {

  constructor(props) {

    super(props);
    this.state = {
      weather:''
    };
    //console.log('const');

  }

 componentWillMount(){

    //console.log('mount');

  }



  render() {

    return (
      <div className="App">
        <header className="App-header">
          <Form changeCity = {this.ChangeCity}/>
        </header>
      </div>
    );
  }

}


export default App;
