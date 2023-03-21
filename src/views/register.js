import React from "react";
import axios from 'axios';
import bycrypt from 'bcryptjs';

import { Link } from "react-router-dom";

import { Helmet } from "react-helmet";

import { useState } from "react";
// const bcrypt = require('bcryptjs');

import InputBoxForInfo from "../components/input-box-for-info";
import Button from "../components/button";
import "./register.css";

const Register = (props) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const salt = bycrypt.genSaltSync(10);
  const hashedPassword = bycrypt.hashSync(password,salt);
  const[exist, setExistence] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const postDetails = () =>{
    axios.post("http://localhost:3002/api/post/register",{name:name, surname:surname, email: email, username: username, password: hashedPassword});
    
  }

  const checkIfUserExists = () =>{
    axios
    .get("http://localhost:3002/api/get/doesExist/" + username)
    .then(function(response){
      const userExists = response.data;
      if (JSON.stringify(userExists) == "[]"){
        setErrorMessage('');
        postDetails();
      }
      else{
        setErrorMessage('Username already exists');
      }
    });
  }

  const checkIfBlank=()=>{
    if(name == "" || surname =="" || email == "" || username == "" || password==""){
      alert("Please enter all details");
    }
    else{
      checkIfUserExists();
    }
  }

  const handleRegister = () => {
    // Do something with the input values
    console.log(
      `Name: ${name}, Surname: ${surname} Email: ${email}, Username: ${username}, Password: ${hashedPassword}`
    );
    checkIfBlank();
  };

  return (
    <div className="register-container">
      <Helmet>
        <title>register - Project ARENA</title>
        <meta property="og:title" content="register - Project ARENA" />
      </Helmet>
      <div className="register-container1">
        <Link to="/" className="register-navlink">
          <svg
            viewBox="0 0 877.7142857142857 1024"
            className="register-backbtn"
          >
            <path d="M519.429 797.143l58.286-58.286c14.286-14.286 14.286-37.143 0-51.429l-175.429-175.429 175.429-175.429c14.286-14.286 14.286-37.143 0-51.429l-58.286-58.286c-14.286-14.286-37.143-14.286-51.429 0l-259.429 259.429c-14.286 14.286-14.286 37.143 0 51.429l259.429 259.429c14.286 14.286 37.143 14.286 51.429 0zM877.714 512c0 242.286-196.571 438.857-438.857 438.857s-438.857-196.571-438.857-438.857 196.571-438.857 438.857-438.857 438.857 196.571 438.857 438.857z"></path>
          </svg>
        </Link>
      </div>
      <div className="register-container5">
        <span className="register-text">
          <span>Register</span>
          <br></br>
        </span>

        <InputBoxForInfo
          buttonText="NAME"
          onChange={(e) => setName(e.target.value)}
          rootClassName="input-box-for-info-root-class-name"
        ></InputBoxForInfo>

        <InputBoxForInfo
          buttonText="SURNAME"
          onChange={(e) => setSurname(e.target.value)}
          rootClassName="input-box-for-info-root-class-name2"
        ></InputBoxForInfo>
    
        <InputBoxForInfo
          buttonText="EMAIL"
          onChange={(e) => setEmail(e.target.value)}
          rootClassName="input-box-for-info-root-class-name3"
        ></InputBoxForInfo>
    
        <InputBoxForInfo
          buttonText="USERNAME"
          onChange={(e) => setUsername(e.target.value)}
          rootClassName="input-box-for-info-root-class-name4"
        ></InputBoxForInfo>
    
        <InputBoxForInfo
          buttonText="PASSWORD"
          onChange={(e) => setPassword(e.target.value)}
          isPassword
          rootClassName="input-box-for-info-root-class-name5"
        ></InputBoxForInfo>
    
        <br></br>
        <Button 
          name="Register"
          onClick={() => {
            console.log("Register button clicked");
            handleRegister();
          }}
          rootClassName="button-root-class-name"
        ></Button>
        
        <br></br>
        {errorMessage && <div className="error">{errorMessage}</div>}
        <span className="register-text3">Already have an account?</span>
        <Link to="/login" className="register-navlink1 button">
          Login here
        </Link>
      </div>
    </div>
  );
};

export default Register;11