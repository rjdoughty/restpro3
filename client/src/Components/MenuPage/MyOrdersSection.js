import React from 'react';

const MyOrdersSection = (props) => (

    <div className="completedOrders">
        <div className="heading">Orders</div>

        <div>
            {props.myOrders.map(item =>
                <PastOrders
                    name={item.name}
                    items={item.menuItems}
                    price={item.price}
                    isCompleted={item.isCompleted}
                    ingredients={item.ingredients}
                    id={item._id}
                    time={item.time}
                    addOrder={props.addOrder}
                    deleteOrder={props.deleteOrder}
                    key={item._id}
                />)}
        </div>
    </div>
)
const PastOrders = (props) => (
    <div className="singleOrder">
        <span>{props.name}</span><br />
        <span>{props.time}</span><br />
        <span>{props.items.join(", ")}</span><br />
        <span>{props.price}</span><br />
        <span>{props.isCompleted === false
            ? <span className="preparing">Preparing</span>
            : <span className="ready">Ready</span>
        }</span><br />
        <button onClick={() => props.deleteOrder(props.id)}>DELETE</button>
    </div>
)

export default MyOrdersSection;