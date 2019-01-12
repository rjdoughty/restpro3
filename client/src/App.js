import React, { Component } from 'react';
import './App.css';
import * as $ from 'axios';
import MenuPage from './Components/MenuPage'

class App extends Component {

  state = {
    menu: []

  }

  componentDidMount(){
    $.get('/api/taskList')
    .then((result) => {
      this.setState({taskList: result.data})
    })  
  }


  render() {
    return (
      <div className="App">
      <MenuPage />
      </div>
    );
  }
}

export default App;
