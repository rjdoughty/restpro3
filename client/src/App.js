import React from 'react';
import './App.css';
import axios from 'axios';

import HomePage from './Components/MenuPage/MenuPage';
import Header from './Components/MenuPage/Header';
import Login from './Components/MenuPage/Login';
import AdminView from './Components/MenuPage/AdminView';


import openSocket from 'socket.io-client';
const socket = openSocket('https://restproj3.herokuapp.com/');

class App extends React.Component {
  state = {
    menuList: [],
    newOrder: [],
    total: 0,
    myOrders: [],
    isLoggedIn: false,
    username: '',
    password: '',
    currentUser: '',
    time: ''
  }

  submitLogin = (event) => {
    if (this.state.username === '') {
      alert('name required');
    } else {
      event.preventDefault();
      this.setState({ isLoggedIn: true, currentUser: this.state.username })
    }
  }

  changeName = (event) => {
    event.preventDefault();
    this.setState({ username: event.target.value })
  }

  changePassword = (event) => {
    event.preventDefault();
    this.setState({ password: event.target.value })
  }

  getMenu = () => {
    axios.get('/api/Menu')
      .then((result) => {
        this.setState({ menuList: result.data })
      })
  }

  getOrders = () => {
    axios.get('/api/Orders')
      .then((result) => {
        this.setState({ myOrders: result.data })
      })
  }

  componentDidMount() {
    this.getMenu();
    this.getOrders();
    socket.on('new-order', data => {
      this.setState({ myOrders: [...this.state.myOrders, data.sendOrder] })
    });
    socket.on('complete-order', data => {
      const orderUpdate = this.state.myOrders.find(item => item._id === data.data._id)
      orderUpdate.isCompleted = data.data.isCompleted;
      const index = data.data._id;
      var newList = [...this.state.myOrders];
      newList = (newList.filter(item => item._id !== index).map(item => item))
      newList.push(orderUpdate)
      this.setState({ myOrders: newList })
    });
  }

  compileOrder = (id) => {
    const additem = this.state.menuList.find(item => item._id === id)
    const newList = [...this.state.newOrder];
    newList.push(additem);
    const newprice = (this.state.total + additem.price);
    const total = parseFloat(newprice.toFixed(2));
    this.setState({ newOrder: newList, total: total })
  }

  placeOrder = () => {
    if (this.state.total === 0) {
      console.log("empty")
    } else {
      var currentDate = new Date();
      var hour = currentDate.getHours();
      var min = currentDate.getMinutes();
      var date = currentDate.getDate();
      var month = currentDate.getMonth();
      var monthDateYear = hour + ":" + ('0' + min).slice(-2) + " " + (month + 1) + "/" + date;
      const orderarray = this.state.newOrder.map(e => e.menuItem)
      axios.post('/api/Orders', { name: this.state.currentUser, menuItems: orderarray, price: this.state.total, time: monthDateYear, isCompleted: false })
        .then((result) => {
          const sendOrder = result.data
          socket.emit('new-order', { sendOrder })
        })
      this.setState({ newOrder: [], total: 0 })
    }
  }

  clearCart = () => {
    this.setState({ newOrder: [], total: 0 })
  }

  completeOrder = (id, isCompleted) => {
    if (isCompleted === false) {
      axios.put(`/api/Orders/${id}`, { _id: id, isCompleted: true });
      const updateOrder = {
        _id: id,
        isCompleted: true,
      }
      socket.emit('complete-order', { data: updateOrder });
      this.getOrders();
    } else {
      axios.put(`/api/Orders/${id}`, { _id: id, isCompleted: false });
      const updateOrder = {
        _id: id,
        isCompleted: false,
      }
      socket.emit('complete-order', { data: updateOrder });
    }
    this.getOrders();
  }

  deleteOrder = (id) => {
    axios.delete(`/api/Orders/${id}`)
      .then((result) => {
        this.getOrders();
      })
  }

  renderHomepage = () => {
    if (!this.state.isLoggedIn) {
      return <Login
        handleLogin={this.submitLogin}
        changeName={this.changeName}
        changePassword={this.changePassword}
        username={this.state.username}
        password={this.state.password}
      />
    }
    else if (this.state.isLoggedIn && this.state.currentUser !== 'admin') {
      return <HomePage
        menuList={this.state.menuList}
        compileOrder={this.compileOrder}
        newOrder={this.state.newOrder}
        total={this.state.total}
        placeOrder={this.placeOrder}
        myOrders={this.state.myOrders}
        deleteOrder={this.deleteOrder}
        clearCart={this.clearCart}
      />
    }
    else if (this.state.isLoggedIn && this.state.currentUser === 'admin') {
      return <AdminView
        myOrders={this.state.myOrders}
        deleteOrder={this.deleteOrder}
        time={this.state.time}
        completeOrder={this.completeOrder}
      />
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        {this.renderHomepage()}
      </div>
    );
  }

}


export default App;
