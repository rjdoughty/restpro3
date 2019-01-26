import React from 'react';

const MenuSection = (props) => (
    <div>Menu   
        {props.menuList.map(item => 
            <MenuCard 
                name={item.menuItem} 
                price={item.price} 
                ingredients={item.ingredients} 
                id={item._id} 
                compileOrder={props.compileOrder} 
                key={item._id} 
                />)} 
    </div>
)

const MenuCard = (props) => (
    <div>
        <h3>{props.name} <span>{props.price}</span><button onClick={()=> props.compileOrder(props.id)}>Add Item</button></h3>
        <p>{props.ingredients.join(", ")}</p>
    </div>
    
)

export default MenuSection;