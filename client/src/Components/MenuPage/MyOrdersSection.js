import React from 'react';

const MyOrdersSection = (props) => (

    <div>Past Orders
        {console.log(props.myOrders)}
    {props.myOrders.map(item => 
            <PastOrders 
                name={item.menuItems} 
                price={item.price} 
                isCompleted={item.isCompleted}
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
         {props.isCompleted === false
            ? <span>Preparing</span>
            : <span>Ready</span>
        }
        {props.name.join(", ")}
        <span>{props.price}</span>
        <span onClick={()=> props.deleteOrder(props.id)}>x</span>
        
    </div>
)

export default MyOrdersSection;