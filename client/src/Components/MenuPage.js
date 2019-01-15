import React from 'react';


const HomePage = (props) => (
    <div>
        <Header />
        <MenuSection menuList={props.menuList} addOrder={props.addOrder}/>
        <OrderSection newOrder={props.newOrder} total={props.total} placeOrder={props.placeOrder} />
        
         
    </div>
)

const Header = (props) => (
    <div>

    </div>
)

const MenuSection = (props) => (
    <div>Menu   
        {props.menuList.map((item, i) => <MenuCard name={item.menuItem} price={item.price} ingredients={item.ingredients} id={item.id} addOrder={props.addOrder} key={i}/>)} 
    </div>
)
const OrderSection = (props) => (
    <div> Order Cart
        {props.newOrder.map((item, i) => <OrderCart name={item.menuItem} price={item.price} total={props.total} key={i} />)}
        <SubmitOrder  total={props.total} placeOrder={props.placeOrder}/>
    </div>
)
const MenuCard = (props) => (
    <div>
        <h3>{props.name} <span>{props.price}</span><button onClick={()=> props.addOrder(props.id)}>Add Item</button></h3>
        <p>{props.ingredients.join(", ")}</p>
    </div>
)

const OrderCart = (props) => (
    <div>
        <h5>{props.name}<span>{props.price}</span></h5>
    </div>
)

const SubmitOrder = (props) => (
    <div>
        <h3>{props.total}</h3>
        <button onClick={props.placeOrder}>Submit Order</button>
    </div>
)

export default HomePage;
