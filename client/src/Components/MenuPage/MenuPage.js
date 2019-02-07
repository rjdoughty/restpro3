import React from 'react';
import MenuSection from './MenuSection';
import OrderSection from './OrderSection';
import MyOrdersSection from './MyOrdersSection';



const HomePage = (props) => (
    <div className="main-container">

        <MenuSection
            menuList={props.menuList}
            compileOrder={props.compileOrder}
            toggleOrderSection={props.toggleOrderSection}
            renderOrderSection={props.renderOrderSection}
        />
        <OrderSection
            newOrder={props.newOrder}
            total={props.total}
            placeOrder={props.placeOrder}
            clearCart={props.clearCart}
        />
        <MyOrdersSection
            myOrders={props.myOrders}
            deleteOrder={props.deleteOrder}
        />
    </div>
)




export default HomePage;
