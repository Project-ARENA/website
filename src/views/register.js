import React from "react";
import axios from 'axios';
import bycrypt from 'bcryptjs';
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useState,useEffect } from "react";
import InputBoxForInfo from "../components/input-box-for-info";
import Button from "../components/button";
import "./register.css";
import Modal from "react-modal";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import { v4 as uuidv4 } from "uuid";
import CheckIcon from '@mui/icons-material/Check';
import { set } from "date-fns";
import Swal from 'sweetalert2';

let code = "";


//sends them code with email
function sendEmail(email){
  code = uuidv4();
  console.log(code);
  axios.post("http://localhost:3002/api/post/user/verify/sendCode", {
    user_email: email,
    user_code: code
  })
  .then(function (response) {
    console.log(response);
  }
  )
  .catch(function (error) {
    console.log(error);
  });
}

  
function hashPassword(password) {
  const salt = bycrypt.genSaltSync(10);
  return bycrypt.hashSync(password, salt);
}

function postUserDetails(name, surname, email, username, hashedPassword) {
  return axios.post("http://localhost:3002/api/post/register", {
    name: name,
    surname: surname,
    email: email,
    username: username,
    password: hashedPassword
  });
}

async function checkIfUserExists(username, setErrorMessage) {
  const response = await axios.get("http://localhost:3002/api/get/doesExist/" + username);
  const userExists = response.data;
  // console.log(response.data);
  if (JSON.stringify(userExists) == "[]") {
    setErrorMessage('Account created successfully');
    return true;
  }
  else {
    setErrorMessage('Username already exists');
    return false;
  }
}

function validateInput(name, surname, email, username, password, setErrorMessage) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  if (name === "" || surname === "" || email === "" || username === "" || password === "") {
    setErrorMessage("Please enter all details");
    return false;
  }
  else if (!emailPattern.test(email)) {
    setErrorMessage('Please enter a valid email');
    return false;
  }
  else if (!passwordPattern.test(password)) {
    setErrorMessage("Please enter a stronger password");
    return false;
  }
  else {
    return true;
  }
}

const doRegister = (name, surname, email, username, password, setErrorMessage, setModalVisible) => {

  const validInput = validateInput(name, surname, email, username, password, setErrorMessage);

  if (validInput) {
    setModalVisible(true);
  }
};


const Register = (props) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //const [code, setCode] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [enteredCode, setEnteredCode] = useState('');
  const [isCodeCorrect, setIsCodeCorrect] = useState(false);

  //sends email when modal is open
  useEffect(() => {
    if (modalVisible) {
      sendEmail(email);
    }
  }, [modalVisible, email]);

  const openModal = () => {
    setModalVisible(true);
    
  };

  const closeModal = () => {
    setModalVisible(false);
    
  };

function handleClickToSendEmail(email) {
    sendEmail(email);
    setModalVisible(true);
  }

  // Enter key triggers Register button
  const handleSubmit = event => {
    event.preventDefault();
    doRegister(name, surname, email, username, password, setErrorMessage, setModalVisible);
  };
  
//used to check if code matches entered code
  const handleCodeVerification = () => {
    const hashedPassword = hashPassword(password); // Hash the password
    // Compare enteredCode with the generated code
    if (enteredCode === code) {
      // Code is correct
      setModalVisible(false); // Close the modal
      setIsCodeCorrect(true); // Set the state to true
  
      Swal.fire({
        title: 'Code is correct and account created!',
        icon: 'success',
        showCancelButton: false,
        timer: 4000, // Display for 4 seconds
        timerProgressBar: true,
      });
  
      setTimeout(() => {
        // Redirect to login page after a delay
        window.location.href = 'http://localhost:3000/login';
      }, 4000); // Delay duration in milliseconds
  
      // Show pop-up message
      console.log(code);
      postUserDetails(name, surname, email, username, hashedPassword); // Post user details
    } else {
      // Code is incorrect, handle the error
      setIsCodeCorrect(false); // Set the state to false
      setEnteredCode(''); // Clear the entered code
  
      Swal.fire({
        title: 'Code incorrect',
        icon: 'error',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Close'
      });
    }
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
      <div className="register-container5" onSubmit={handleSubmit}>
        <span className="register-text">
          <span>Register</span>
          <br></br>
        </span>

        <InputBoxForInfo
          buttonText="NAME"
          onChange={(e) => setName(e.target.value)}
          rootClassName="input-box-for-info-root-class-name"
          id="name"
        ></InputBoxForInfo>

        <InputBoxForInfo
          buttonText="SURNAME"
          onChange={(e) => setSurname(e.target.value)}
          rootClassName="input-box-for-info-root-class-name2"
          id="surname"
        ></InputBoxForInfo>
        
        <InputBoxForInfo
          buttonText="EMAIL"
          onChange={(e) => setEmail(e.target.value)}
          rootClassName="input-box-for-info-root-class-name3"
          id="email"
        ></InputBoxForInfo> 

        <InputBoxForInfo
          buttonText="USERNAME"
          onChange={(e) => setUsername(e.target.value)}
          rootClassName="input-box-for-info-root-class-name4"
          id="username"
        ></InputBoxForInfo>

        <InputBoxForInfo
          buttonText="PASSWORD"
          onChange={(e) => setPassword(e.target.value)}
          isPassword
          rootClassName="input-box-for-info-root-class-name5"
          id="password"
        ></InputBoxForInfo>
        
        <br></br>
        <Button
          type = "submit"
          name="Register"
          onClick={() => {
            // console.log("Register button clicked");
            doRegister(name, surname, email, username, password, setErrorMessage,setModalVisible);
          }}
          rootClassName="button-root-class-name"
          id="submitBtn"
        ></Button>
        
        <Modal
  isOpen={modalVisible}
  shouldCloseOnOverlayClick={false}
  style={{
    content: {
      width: "50%",
      height: "40%",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      overflowY: "hidden",
      borderRadius: "10px", // Add border-radius for curved corners
      padding: "20px" // Add padding for spacing
    },
    overlay: { zIndex: 1000 },
  }}
>
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <h4 style={{ marginBottom: "10px", textAlign: "center",fontFamily: "Bebas Neue" }}>A code has been sent to your email</h4> {/* Improve text appearance */}
    <h4 style={{ marginBottom: "20px", textAlign: "center",fontFamily: "Bebas Neue" }}>Please enter your code to verify your email</h4> {/* Improve text appearance */}

    <br />
    <div style={{ display: "flex", alignItems: "center" }}>
      <InputBoxForInfo
        buttonText="Code"
        value={enteredCode}
        onChange={(event) => setEnteredCode(event.target.value)}
      />
    </div>
    <br />
    <Button
      onClick={handleCodeVerification}
      name={"Verify Code"}
    >
    </Button>
    <br />
    <Button
      name={"Email incorrect? Click here to change your email"}
      onClick={() => setModalVisible(false)}
    ></Button>
  </div>
</Modal>



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

export { Register, validateInput, postUserDetails, checkIfUserExists, hashPassword, doRegister };
