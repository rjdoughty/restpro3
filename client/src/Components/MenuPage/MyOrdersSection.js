import React from 'react';

const MyOrdersSection = (props) => (

    <div>Past Orders
        {console.log(props.myOrders)}
    {props.myOrders.map(item => 
            <PastOrders 
                name={item.menuItems} 
                price={item.price} 
                ingredients={item.ingredients} 
                id={item._id} 
                addOrder={props.addOrder} 
                deleteOrder={props.deleteOrder}
                key={item._id} 
                />)} 
    </div>
)
const PastOrders = (props) => (
    <div>
        <h5>{props.name.join(", ")}<span>{props.price}</span><span onClick={()=> props.deleteOrder(props.id)}>x</span></h5>
    </div>
)

export default MyOrdersSection;