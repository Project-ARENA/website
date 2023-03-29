import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import bycrypt from 'bcryptjs';
import axios from 'axios';

import InputBoxForInfo from "../components/input-box-for-info";
import Button from "../components/button";
import './player-portal-profile.css'

const PlayerPortalProfile = (props) => {
  // Get the username, userID and useremail from local storage
  const userID = localStorage.getItem('userID');
  const username = localStorage.getItem('username');
  const email = localStorage.getItem('useremail');
  const oldPassword = localStorage.getItem('userpassword')
  let [password, setPassword] = useState("");
  let [newPassword, setNewPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  let [newUsername, setNewUsername] = useState("");
  let [newEmail, setNewEmail] = useState("");

  const salt = bycrypt.genSaltSync(10);
  let hashedNewPassword = "";
  
  // Get user_email from database
  const getUserDetails = () => {
    axios
      .get("http://localhost:3002/api/get/userDetails/" + username)
      .then(function (response) {
        localStorage.setItem('userID', (response.data)[0].user_id);
        localStorage.setItem('useremail', (response.data)[0].user_email);
        localStorage.setItem('userpassword',(response.data)[0].user_password);
        setNewUsername(username);
        setNewEmail(email);
      });
  }

  // Update user details in database
  const putUserDetails = (newEmail, newUsername, newPassword) => {
    axios
      .put("http://localhost:3002/api/put/updateDetails/" + userID, {email: newEmail, username: newUsername, password: newPassword});
  }

  const checkIfDetailsValid = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    //If fields empty, warn
    if(newEmail == "" || newUsername == ""){
      alert("Email and Username cannot be empty");
      return false;
    }
    else if (password == "") {
      alert("Current Password Required")
      return false;
    }

    //not empty
    else if (newEmail != "" || newUsername != "" || password != "") {
      //email not corect format
      if(!emailPattern.test(newEmail)){
        alert("Please enter a valid email");
        return false;
      }
      //password not correct format
      if(!passwordPattern.test(password)){
        alert("Please enter a stronger password");
        return false;
      }
    }
    return true;
  }

  // Handles different update cases
  const update = () => {
    bycrypt.compare(password, oldPassword, function (error, isMatch) {
      if (isMatch) {
        // Password not changed
        if ((newPassword == confirmPassword) && (newPassword == "" && confirmPassword == "") && checkIfDetailsValid()) {
          // putUserDetails(newEmail, newUsername, oldPassword);
          alert("Email and username updated")
        }
        // Password changed and new passwords matches confirmed password 
        else if ((newPassword == confirmPassword) && (newPassword != "" && confirmPassword != "") && checkIfDetailsValid()) {
          hashedNewPassword = bycrypt.hashSync(newPassword,salt);
          // putUserDetails(newEmail, newUsername, hashedNewPassword);
          alert("Details updated")
        } 
        // New password doesn't match confirmed password
        else if ((newPassword != confirmPassword) && checkIfDetailsValid()){
          alert("Passwords do not match");
        }
      }
      else {
        if (checkIfDetailsValid()) {
          alert("Incorrect Current Password");
        }
        
      }

    });
  }

  // Allows current details to display when page loads
  useEffect(() => {
    getUserDetails()
  }, []); 

  return (
    <div className="player-portal-profile-container">
      <div
        data-role="Header"
        className="player-portal-profile-navbar-container"
      >
        <div className="player-portal-profile-navbar">
          <div className="player-portal-profile-left-side">
            <img
              alt="image"
              src="https://play.teleporthq.io/static/svg/default-img.svg"
              className="player-portal-profile-image"
            />
            <div
              data-role="BurgerMenu"
              className="player-portal-profile-burger-menu"
            >
              <svg
                viewBox="0 0 1024 1024"
                className="player-portal-profile-icon"
              >
                <path d="M128 256h768v86h-768v-86zM128 554v-84h768v84h-768zM128 768v-86h768v86h-768z"></path>
              </svg>
            </div>
            <div className="player-portal-profile-links-container">
              <Link to="/player-portal-home" className="player-portal-profile-link">
                HOME
              </Link>
              <Link to="/player-portal-competitions" className="player-portal-profile-link1 Anchor">
                COMPETITIONS
              </Link>
              <Link to="/player-portal-team" className="player-portal-profile-link2 Anchor">
                TEAM
              </Link>
              <Link to="/player-portal-contact" className="player-portal-profile-link3 Anchor">
                CONTACT US
              </Link>
            </div>
          </div>
          <div className="player-portal-profile-container1">
            <Link to="/player-portal-profile" className="player-portal-profile-navlink">
              <svg
                viewBox="0 0 1024 1024"
                className="player-portal-profile-icon2"
              >
                <path d="M576 706.612v-52.78c70.498-39.728 128-138.772 128-237.832 0-159.058 0-288-192-288s-192 128.942-192 288c0 99.060 57.502 198.104 128 237.832v52.78c-217.102 17.748-384 124.42-384 253.388h896c0-128.968-166.898-235.64-384-253.388z"></path>
              </svg>
            </Link>
          </div>
          <div
            data-role="MobileMenu"
            className="player-portal-profile-mobile-menu"
          >
            <div className="player-portal-profile-container2">
              <img
                alt="image"
                src="https://play.teleporthq.io/static/svg/default-img.svg"
                className="player-portal-profile-image1"
              />
              <div
                data-role="CloseMobileMenu"
                className="player-portal-profile-close-menu"
              >
                <svg
                  viewBox="0 0 1024 1024"
                  className="player-portal-profile-icon4"
                >
                  <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                </svg>
              </div>
            </div>
            <div className="player-portal-profile-links-container1">
              <Link to="/player-portal-home" className="player-portal-profile-link">
                HOME
              </Link>
              <Link to="/player-portal-competitions" className="player-portal-profile-link1 Anchor">
                COMPETITIONS
              </Link>
              <Link to="/player-portal-team" className="player-portal-profile-link2 Anchor">
                TEAM
              </Link>
              <Link to="/player-portal-contact" className="player-portal-profile-link3 Anchor">
                CONTACT US
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="player-portal-profile-section-separator"></div>
      <div className="player-portal-profile-section-separator1"></div>
      <div className="player-portal-profile-section-separator2"></div>
      <div className="player-portal-profile-section-separator3"></div>
      <div className="player-portal-profile-container3">
        <span className="player-portal-profile-text">UPDATE PROFILE</span>
        <InputBoxForInfo
          initialValue={username}
          buttonText="USERNAME"
          onChange={(e) => setNewUsername(e.target.value)}
        >
        </InputBoxForInfo>
        <InputBoxForInfo
          initialValue={email}
          buttonText="EMAIL"
          onChange={(e) => setNewEmail(e.target.value)}
        >
        </InputBoxForInfo>
        <InputBoxForInfo 
          buttonText="Current PASSWORD" 
          isPassword
          onChange={(e) => setPassword(e.target.value)}
        >
        </InputBoxForInfo>
        <InputBoxForInfo 
          buttonText="PASSWORD" 
          isPassword
          onChange={(e) => setNewPassword(e.target.value)}
        >
        </InputBoxForInfo>
        <InputBoxForInfo 
          buttonText="CONFIRM PASSWORD" 
          isPassword
          onChange={(e) => setConfirmPassword(e.target.value)}
        >
        </InputBoxForInfo>
        <Button
          name="UPDATE"
          onClick={() => {
            console.log("Register button clicked");
            update();
          }}
          // button="UPDATE"
          rootClassName="button-root-class-name4"
        ></Button>
        <div className="player-portal-profile-container4"></div>
      </div>
    </div>
  )
}

export default PlayerPortalProfile
