import React from 'react';


const MenuSection = (props) => (
    <div className="menuSection">  
        {props.menuList.map(item => 
            <MenuCard 
                name={item.menuItem} 
                image={item.image}
                price={item.price} 
                ingredients={item.ingredients} 
                id={item._id} 
                compileOrder={props.compileOrder} 
                key={item._id} 
                />)} 
    </div>
)

const MenuCard = (props) => (
    <div className="menuItem">
        
        <img className="menuphoto" src={props.image} alt={props.name}></img>
        <h3>{props.name}</h3>
        <p className="ingredients">{props.ingredients.join(", ")}</p>
        <h4>{props.price}<button onClick={()=> props.compileOrder(props.id)}>Add Item</button></h4>
       
    </div>
    
)

export default MenuSection;