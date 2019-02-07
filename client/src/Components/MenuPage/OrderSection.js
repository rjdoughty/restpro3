import React from 'react';


const OrderSection = (props) => (
    <div className="ordercontainer">
        <h2>Order Cart</h2>
        {props.newOrder.map((item, i) =>
            <OrderCart
                name={item.menuItem}
                price={item.price}
                total={props.total}
                key={i}
            />
        )}

        <SubmitOrder
            total={props.total}
            placeOrder={props.placeOrder}
            clearCart={props.clearCart}
        />

    </div>
)


const OrderCart = (props) => (
    <div>
        <h5>{props.name}{" "}{props.price}</h5>
    </div>
)

const SubmitOrder = (props) => (
    <div>
        <h3>Total: {props.total}</h3>
        <button onClick={props.placeOrder}>Submit Order</button>
        <button onClick={props.clearCart}>Clear Cart</button>
    </div>
)

export default OrderSection;