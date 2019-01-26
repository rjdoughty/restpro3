import React from 'react';
//import { BrowserRouter, Route, Link } from 'react-router-dom';

const Login = (props) => (
  
    <form>
        <input value={props.username} onChange={props.changeName}/>
        <input value={props.password} onChange={props.changePassword}/>
        <button onClick={props.handleLogin}>Login</button>
    </form>

)

export default Login;