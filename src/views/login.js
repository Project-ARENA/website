import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import { useState,useEffect } from "react";

import InputBoxForInfo from "../components/input-box-for-info";
import Button from "../components/button";
import "./login.css";
import { hash } from "bcryptjs";
import bycrypt from 'bcryptjs';

/*
    API to get the password associacted with the username -> username might not exist-> throw an error
    call to that API to get the hashed password from the database and then we'll use bcrypt to compare
*/
const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const[hashedPassword, setHashedPass] = useState("");
  const [errorMessage, setErrorMessage] = useState('');

const doAPIStuff = () =>{
  axios
  .get("http://localhost:3002/api/get/password/" + username)
  .then(function(response){
    //console.log("help " + JSON.stringify(response.data));
    const userData = response.data;
    if (JSON.stringify(userData) == "[]"){
      setErrorMessage('Incorrect username or password');
    }
    else{
      setHashedPass(userData[0].user_password);
    console.log("hashed password: " + hashedPassword);
    isValidPass();
    }
    
  });
}
const isValidPass = () =>{
  bycrypt.compare(password, hashedPassword, function(error, isMatch) {
    if(isMatch) {
      console.log("The passwords match");
      setErrorMessage('');
    }
    else{
      //alert("Incorrect Password");
      setErrorMessage('Incorrect username or password');
      console.log("Incorrect Password");
    }
    
  });
}

const handleLogin = () =>{
  console.log(
    `Username: ${username}, Password: ${password}`
  );
  if(username=="Sayf" && password=="SayfLikesKids"){
    window.location.href = 'https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwiUzc-Bi-39AhWPtqQKHRYUCJQQwqsBegQIChAF&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DdQw4w9WgXcQ&usg=AOvVaw0aHtehaphMhOCAkCydRLZU';
  }
  else{
    doAPIStuff();
  }
  
}

  return (
    <div className="login-container">
      <Helmet>
        <title>login - Project ARENA</title>
        <meta property="og:title" content="login - Project ARENA" />
      </Helmet>
      <div className="login-container1">
        <div className="login-container2">
          <Link to="/" className="login-navlink">
            <svg viewBox="0 0 877.7142857142857 1024" className="login-icon">
              <path d="M519.429 797.143l58.286-58.286c14.286-14.286 14.286-37.143 0-51.429l-175.429-175.429 175.429-175.429c14.286-14.286 14.286-37.143 0-51.429l-58.286-58.286c-14.286-14.286-37.143-14.286-51.429 0l-259.429 259.429c-14.286 14.286-14.286 37.143 0 51.429l259.429 259.429c14.286 14.286 37.143 14.286 51.429 0zM877.714 512c0 242.286-196.571 438.857-438.857 438.857s-438.857-196.571-438.857-438.857 196.571-438.857 438.857-438.857 438.857 196.571 438.857 438.857z"></path>
            </svg>
          </Link>
        </div>
        <div className="login-container3">
          <span className="login-text">LOGIN</span>
          <br></br>
          <InputBoxForInfo
          buttonText="USERNAME" 
          onChange={(e) => setUsername(e.target.value)} 
          ></InputBoxForInfo>
          <InputBoxForInfo 
          buttonText="PASSWORD" 
          isPassword
          onChange={(e) => setPassword(e.target.value)}
          ></InputBoxForInfo>
          <br></br>
          {errorMessage && <div className="error">{errorMessage}</div>}
          <Button
            name="Login"
            onClick={() => {
              console.log("Login button clicked");
              handleLogin();
            }}
            rootClassName="button-root-class-name2"
          ></Button>
          <div className="login-container4"></div>
          <br></br>
          <span className="login-text1">Don&apos;t have an account? </span>
          <Link to="/login" className="register-navlink1 button">
          Register Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
