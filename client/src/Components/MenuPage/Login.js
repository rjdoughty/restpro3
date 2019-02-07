import React from 'react';

const Login = (props) => (
<div className="logincontainer">
  <div className="login">
    <form >
       Username: <input value={props.username} onChange={props.changeName}/><br/>
       Password: <input value={props.password} onChange={props.changePassword}/><br/>
        <button onClick={props.handleLogin}>Login</button>
    </form>
  </div>
  </div>
)

export default Login;