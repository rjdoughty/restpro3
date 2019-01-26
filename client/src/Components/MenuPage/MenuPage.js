import React from 'react';
import MenuSection from './MenuSection';
import OrderSection from './OrderSection';
import MyOrdersSection from './MyOrdersSection';



const HomePage = (props) => (
    <div>
        <MenuSection menuList={props.menuList} compileOrder={props.compileOrder}/>
        <OrderSection newOrder={props.newOrder} total={props.total} placeOrder={props.placeOrder} />      
        <MyOrdersSection myOrders={props.myOrders} deleteOrder={props.deleteOrder}/>
    </div>
)




export default HomePage;
