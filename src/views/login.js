import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import InputBoxForInfo from "../components/input-box-for-info";
import Button from "../components/button";
import "./login.css";
import bycrypt from 'bcryptjs';
import Modal from "react-modal";
import { doesSectionFormatHaveLeadingZeros } from "@mui/x-date-pickers/internals/hooks/useField/useField.utils";

/*
    API to get the password associacted with the username -> username might not exist-> throw an error
    call to that API to get the hashed password from the database and then we'll use bcrypt to compare
*/

let code = "";


function checkEmailExists(email, setEmailError){
  axios
      .get("http://localhost:3002/api/get/emailExists/" + email)
      .then(function (response) {
        const userData = response.data;

        if (JSON.stringify(userData) == "[]") {
          //Email does not exist
          setEmailError('Email does not exist');
          console.log("Email does not exist");
        }
        else {
          //Email exists, so send email
          setEmailError('');
          console.log("Email exists");
          sendEmail(email);
        }

      });
}

function sendEmail(email){
  code = uuidv4();
  console.log(code);
  axios.post("http://localhost:3002/api/post/password/reset/sendCode", {
    user_email: email,
    user_code: code
  })
  .then(function (response) {
    console.log(response);
  }
  )

}

function changePassword(email, newPass, setModalVisible){
  axios.post("http://localhost:3002/api/post/updatePassword", {
    user_email: email,
    user_password: newPass
  })
  .then(function (response) {
    console.log(response);
    setModalVisible(false);
  }
  )
}

const Login = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [email, setEmail] = useState("");
  const [verfCode, setVerfCode] = useState("");
  const [newPass, setNewPass] = useState("");

  // Enter key triggers Login button
  const handleSubmit = event => {
    event.preventDefault();
    handleLogin();
  };

  const doAPIStuff = () => {
    axios
      .get("http://localhost:3002/api/get/password/" + username)
      .then(function (response) {
        const userData = response.data;

        if (JSON.stringify(userData) == "[]") {
          setErrorMessage('Incorrect username or password');
        }
        else {
          const hashedPassword = userData[0].user_password;

          isValidPass(hashedPassword);
        }

      });
  }

  const checkIfAdmin = () => {
    axios
      .get("http://localhost:3002/api/get/isAdmin/" + username)
      .then(function (response) {
        // console.log((response.data)[0].user_admin);
        if ((response.data)[0].user_admin == "1") {
          setErrorMessage('Login Successful');
          setTimeout(function () {
            window.location.href = 'http://localhost:3000/admin-competitions';
          }, 500);
          //take him to the admin page
        }
        else {
          // console.log("this guy is a normal user");
          setErrorMessage('Login Successful');
          setTimeout(function () {
            window.location.href = 'http://localhost:3000/player-portal-competitions';
          }, 500);
          //take him to the normal page
        }

      });
  }

  const isValidPass = (hashedPassword) => {
    bycrypt.compare(password, hashedPassword, function (error, isMatch) {
      if (isMatch) {
        // Store the username in local storage
        sessionStorage.setItem('username', username);
        // console.log("The passwords match");
        setErrorMessage('');
        checkIfAdmin();
      }
      else {
        //alert("Incorrect Password");
        setErrorMessage('Incorrect username or password');
        // console.log("Incorrect Password");
      }

    });
  }

  const handleLogin = () => {
    // console.log(
    //   `Username: ${username}, Password: ${password}`
    // );
    sessionStorage.setItem('username', username);
    axios
      .get("http://localhost:3002/api/get/userID/" + username)
      .then(function (response) {
        const userData = response.data;
        const userID = userData[0].user_id;
        sessionStorage.setItem('userID', userID);
      });
    if (username == "Steve" && password == "SteveIsDaBest") {
      window.location.href = 'https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwiUzc-Bi-39AhWPtqQKHRYUCJQQwqsBegQIChAF&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DdQw4w9WgXcQ&usg=AOvVaw0aHtehaphMhOCAkCydRLZU';
    }
    else {
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
        <div className="login-container3" onSubmit={handleSubmit}>
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
          <br/>
          <Modal
        isOpen={modalVisible}
        style={{
          content: {
            width: "90%",
            height: "90%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            overflowY: "scroll",
          },
          overlay: { zIndex: 1000 },
        }}
        
        >
          <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            height: "100%",
            marginLeft: 200,
            marginRight: 200,
          }}
        >
          <h4>Please enter your recovery email address</h4>
          
          <br/>
          <InputBoxForInfo
            buttonText="Email Address"
            onChange={(e) => setEmail(e.target.value)}
          ></InputBoxForInfo>
          
          <br/>

          <Button
              name="Send verification code"
              onClick={() => {
                console.log(email);
                checkEmailExists(email, setEmailError);
              }}
          ></Button>
          <br/>

          <br/>
          <p>Please enter the verification code you received. If you did not receive the email, please check you spam folder.
            Thereafter enter your new password.
          </p>
          <br/>
          <InputBoxForInfo
            buttonText="Verification code"
            onChange={(e) => setVerfCode(e.target.value)}
          ></InputBoxForInfo>
          <InputBoxForInfo
            buttonText="New Password"
            onChange={(e) => setNewPass(e.target.value)}
          ></InputBoxForInfo>
          <br/>
          <Button
              name="Change Password"
              onClick={() => {
                console.log(email);
                console.log(verfCode);
                console.log(newPass);
                if (verfCode == code){
                  console.log("Code is correct");
                  const salt = bycrypt.genSaltSync(10);
                  const cryptedPass = bycrypt.hashSync(newPass, salt);
                  console.log(cryptedPass);
                  changePassword(email, cryptedPass, setModalVisible);
                }
              }}
          ></Button>
          <br/>
          <Button
              name="close"
              onClick={() => {
                setModalVisible(false);
              }}
          ></Button>
        </div>
        </Modal>
          <a href="#"
            onClick={() => {
              console.log("Forgot Password clicked");
              setModalVisible(true);
            }}
          >
            Forgot Password?
          </a>
          <br></br>
          {errorMessage && <div className="error">{errorMessage}</div>}
          <Button
            type="submit"
            name="Login"
            onClick={() => {
              // console.log("Login button clicked");
              handleLogin();
            }}
            rootClassName="button-root-class-name2"
          ></Button>
          <br></br>
          <span className="login-text1">Don&apos;t have an account? </span>
          <Link to="/register" className="register-navlink1 button">
            Register Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export { Login };
