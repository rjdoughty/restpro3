import React from 'react';
import './App.css';
import axios from 'axios';

import HomePage from './Components/MenuPage/MenuPage';
import Header from './Components/MenuPage/Header';
import Login from './Components/MenuPage/Login';
import AdminView from './Components/MenuPage/AdminView';
import { sendOrders } from './api'

import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3001/');

  class App extends React.Component {
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
        myOrders: [],
        isLoggedIn: false,
        username: '',
        password: '',
        currentUser: '',
        time: ''
        
      }
      
    //  toggleOrderSection = () => {
    //    this.setState({ isOrderHidden: !this.state.isOrderHidden })
    //  }

    //  renderOrderSection = () => {
    //    if(!this.state.isOrderHidden) {
    //      return <OrderSection newOrder={this.state.newOrder} total={this.state.total} placeOrder={this.placeOrder} />      
    //    } else {
    //      return <MenuSection menuList={this.state.menuList} compileOrder={this.compileOrder}/>
    //    }
    //  }


      submitLogin = (event) => {
        event.preventDefault();
        this.setState({ isLoggedIn: true, currentUser: this.state.username})
    }
    changeName = (event) => {
      event.preventDefault();
      this.setState({username: event.target.value})
}

changePassword = (event) => {
  event.preventDefault();
  this.setState({password: event.target.value})
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
         socket.on('new-order', data => {
           console.log('incoming data\n\n', data);
           this.setState({myOrders: [...this.state.myOrders, data]})
         });

         socket.on('complete-order', data => {
          console.log('incoming data\n\n', data.data);
          const orderUpdate = this.state.myOrders.find(item => item._id === data.data._id)

          console.log(data.data.isCompleted);
          console.log(orderUpdate.isCompleted);
          orderUpdate.isCompleted = data.data.isCompleted;
          console.log(orderUpdate.isCompleted);
          const index = data.data._id;
          console.log(index);
          var newList = [...this.state.myOrders];
          newList = (newList.filter(item => item._id !== index).map(item => item))
          newList.push(orderUpdate)
          console.log(newList)
          this.setState({ myOrders: newList })
        });
      }
     
    
    compileOrder = (id) => {
      const additem = this.state.menuList.find(item => item._id === id)
      const newList = [...this.state.newOrder];
      newList.push(additem);
      
      const newprice = (this.state.total + additem.price);
      const total = parseFloat(newprice.toFixed(2));
      console.log(total);
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
        var year = currentDate.getFullYear();
        var monthDateYear  = hour + ":" + min + " " + (month+1) + "/" + date + "/" + year;
        console.log(monthDateYear);
        const orderarray = this.state.newOrder.map(e => e.menuItem)
      console.log(this.state.total);
      socket.emit('new-order', {menuItems: orderarray, price: this.state.total, time: monthDateYear, isCompleted: false })
      axios.post('/api/Orders', {menuItems: orderarray, price: this.state.total, time: monthDateYear, isCompleted: false})
        .then((result) => { 
          console.log(result.data);
          // sendOrders({data: this.state.myOrders})
      
          this.getOrders();
        })
        this.setState({ newOrder: [], total: 0 })
    }
  }

  completeOrder = (id, isCompleted) => {
    
    if (isCompleted === false) {
      axios.put(`/api/Orders/${id}`, { _id: id, isCompleted: true });
      const updateOrder = {
        _id: id,
        isCompleted: true,
      }
    console.log(updateOrder);
    socket.emit('complete-order', {data: updateOrder});
      this.getOrders();
    } else {
      axios.put(`/api/Orders/${id}`, { _id: id, isCompleted: false });
      const updateOrder = {
        _id: id,
        isCompleted: false,
      }   
    console.log(updateOrder);
    socket.emit('complete-order', {data: updateOrder});
    }
      this.getOrders();
    }

    



    deleteOrder = (id) => {
      console.log(id);
      axios.delete(`/api/Orders/${id}`)
      .then((result) => {
        console.log(result);
        this.getOrders();
      })
    }

    renderHomepage = () => {
      if(!this.state.isLoggedIn) {
          return <Login 
              handleLogin={this.submitLogin}
              changeName={this.changeName}
              changePassword={this.changePassword}  
              username={this.state.username}
              password={this.state.password}
            />
      }
      else if(this.state.isLoggedIn && this.state.currentUser !== 'admin') {
          return <HomePage
          menuList={this.state.menuList} 
          compileOrder={this.compileOrder}
          newOrder={this.state.newOrder}    
          total={this.state.total}       
          placeOrder={this.placeOrder}
          myOrders={this.state.myOrders}
          deleteOrder={this.deleteOrder}
          />
      }
      else if(this.state.isLoggedIn && this.state.currentUser === 'admin') {
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
            <Header/>
            {this.renderHomepage()}
          </div>
        );
      }

}


export default App;
