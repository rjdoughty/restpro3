import React from 'react';

const OrderSection = (props) => (
    <div> Order Cart
        {props.newOrder.map((item, i) => <OrderCart name={item.menuItem} price={item.price} total={props.total} key={i} />)}
        <SubmitOrder  total={props.total} placeOrder={props.placeOrder}/>
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

export default OrderSection;