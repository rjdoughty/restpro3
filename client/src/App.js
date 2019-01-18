import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import HomePage from './Components/MenuPage'

class App extends Component {

  state = {
    menuList: [
      // {
      //   id: 1,
      // menuItem: 'cheeseburger',
      // price: 5.99,
      // ingredients: ['american cheese', 'lettuce', 'tomatoes','pickles', 'onions'],
      // category: 'burger',
      // selected:  false
      // },
      // {
      //   id: 2,
      //   menuItem: 'bacon cheeseburger',
      //   price: 6.99,
      //   ingredients: ['bacon', 'cheese', 'lettuce', 'tomatoes','pickles', 'onions'],
      //   category: 'burger',
      //   selected:  false
      //   },
      //   {
      //     id: 3,
      //     menuItem: 'turkey burger',
      //     price: 5.99,
      //     ingredients: ['swiss cheese', 'lettuce', 'tomatoes','pickles', 'onions'],
      //     category: 'burger',
      //     selected:  false
      //     }
    ],
    newOrder: [],
    total: 0,
    myOrders: []
  }


  getMenu = () => {
    axios.get('/api/Menu')
    .then((result) => {
      console.log(result);
      this.setState({menuList: result.data})
    }) 
  }
getOrders = () => {
  axios.get('/api/Orders')
    .then((result) => {
      console.log(result);
      this.setState({myOrders: result.data})
    })  
}
  
  componentDidMount(){
     this.getMenu();
     this.getOrders();
  }
 

addNewOrder = (id) => {
  const additem = this.state.menuList.find(item => item._id === id)
  const newList = [...this.state.newOrder];
  newList.push(additem);
  
  const total = (this.state.total + additem.price);
  console.log(total);
  this.setState({ newOrder: newList, total: total })
}

placeOrder = () => {
  const orderarray = this.state.newOrder.map(e => e.menuItem)
  console.log(this.state.total);
  axios.post('/api/Orders', {menuItems: orderarray, price: this.state.total})
    .then((result) => { 
      console.log(result.data);
    })
}

deleteOrder = (id) => {
  console.log(id);
  axios.delete(`/api/Orders/${id}`)
  .then((result) => {
    console.log(result);
    this.getOrders();
  })
}


  render() {
    return (
      <div className="App">
      <HomePage 
          menuList={this.state.menuList} 
          addOrder={this.addNewOrder}
          newOrder={this.state.newOrder}    
          total={this.state.total}       
          placeOrder={this.placeOrder}
          myOrders={this.state.myOrders}
          deleteOrder={this.deleteOrder}
      />
      </div>
    );
  }
}

export default App;
