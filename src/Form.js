import React from 'react';
import ChangeCity from './ChangeCity';


class Form extends React.Component {

    constructor(props){
       super(props);
       this.state = {
         city :''
       };
       this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
          <form id= 'add-todo' onSubmit={this.handleSubmit}>
            <input  type = 'text'  required autoFocus id = 'inp'/>
            <input type = 'submit' value = 'GO' />
            <ChangeCity city = {this.state.city}/>
          </form>
        )
    }

    handleSubmit(event) {
      event.preventDefault();
      var inp = document.getElementById('inp').value;
      //console.log(inp);
      this.setState({
        city: inp
      });
      document.getElementById('inp').value = '';
    }

}

export default Form;
