import React, { useState } from 'react';
import {useForm}  from "react-hook-form";
import './Login.css';

function Login({users, setVisibility, setLoggedIn, setLogin, errorMessage, validateToken}) {
  const {register, handleSubmit} = useForm();
  const onSubmit = (data) =>{
    setLogin(data);
    validateToken();
  }
  return (
    <div className="login" >
        <form action="POST" onSubmit={handleSubmit(onSubmit)}>
          <span onClick={() => setVisibility(false)}>x</span>
          <div className="form-input">
          <legend>Login</legend>
            <input type="text" placeholder="Username" id="username" name="username" ref={register} required={true}/>
            <br/>
            <input type="password" placeholder="Password" id="password" name="password" ref={register} required={true}/>
            <br/>
            <p style={{color: "red"}}>{errorMessage}</p>
            <button type="submit">Sign in</button>
          </div>
        </form>
    </div>
  );
}

export default Login;