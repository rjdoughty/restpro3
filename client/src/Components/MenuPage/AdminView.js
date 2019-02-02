import React from 'react';

const AdminView = (props) => (
    <div className="adminview">
        Incoming Orders
        {props.myOrders.map(item => 
            <PastOrders 
                name={item.menuItems} 
                price={item.price} 
                ingredients={item.ingredients} 
                isCompleted={item.isCompleted}
                time={item.time}
                id={item._id} 
                addOrder={props.addOrder} 
                deleteOrder={props.deleteOrder}
                completeOrder={props.completeOrder}
                key={item._id} 
                />)} 
    </div>
)

const PastOrders = (props) => (
    <div>
        {console.log(props.isCompleted)}
        {props.isCompleted === false
            ? <i className="far fa-square" onClick={() => props.completeOrder(props.id, props.isCompleted)}></i>
            : <i className="far fa-check-square" onClick={() => props.completeOrder(props.id, props.isCompleted)}></i>
        }
        <span>{props.time}</span>
        {" "}
        {props.name.join(", ")}
        <span onClick={()=> props.deleteOrder(props.id)}>x</span>
    </div>
)

export default AdminView;