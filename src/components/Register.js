import React from 'react'
import {useForm}  from "react-hook-form";
import './Register.css';

export default function Register({setVisibilityRegister, registerUser, errorMessage, setNewUser}) {
  const {register, handleSubmit} = useForm();
  const onSubmit = (data) =>{
    setNewUser(data);
    registerUser();
  }
    return (
        <div className="register">
          <form action="POST" onSubmit={handleSubmit(onSubmit)}>
          <span onClick={() => setVisibilityRegister(false)}>x</span>
          <div className="form-input">
          <legend>Register</legend>
            <input type="text" placeholder="Username" id="username" name="username" ref={register} required={true}/>
            <br/>
            <input type="password" placeholder="Password" id="password" name="password" ref={register} required={true}/>
            <br/>
            <p style={{color: "red"}}>{errorMessage}</p>
            <button type="submit">Register</button>
          </div>
        </form>  
        </div>
    )
}
