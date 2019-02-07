import React from 'react';

const AdminView = (props) => (
    <div className="adminview">
        Incoming Orders
        {props.myOrders.map(item =>
            <PastOrders
                name={item.name}
                items={item.menuItems}
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
    <div className="incomingOrders">
        <span>{props.isCompleted === false
            ? <i className="far fa-square" onClick={() => props.completeOrder(props.id, props.isCompleted)}></i>
            : <i className="far fa-check-square" onClick={() => props.completeOrder(props.id, props.isCompleted)}></i>
        }</span>
        <span>{props.name}</span>
        <span>{props.time}</span>
        <span>{props.items.join(", ")}</span>
        <span onClick={() => props.deleteOrder(props.id)}><i className="far fa-times-circle"></i></span>
    </div>
)

export default AdminView;