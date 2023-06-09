import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import bycrypt from "bcryptjs";
import axios from "axios";

import InputBoxForInfo from "../components/input-box-for-info";
import Button from "../components/button";
import "./admin-profile.css";

import Swal from "sweetalert2";

// Update user details in database
function putUserDetails(userID, newEmail, newUsername, newPassword) {
  axios.post("http://localhost:3002/api/post/updateDetails", {
    user_id: userID,
    user_email: newEmail,
    user_nickname: newUsername,
    user_password: newPassword,
  });
}

// Ensures all detail fields are valid
function checkIfDetailsValid(newEmail, newUsername, password, newPassword) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  //If fields empty, warn
  if (newEmail == "" || newUsername == "") {
    Swal.fire({
      title:
        "Email and Username cannot be empty",
      icon: "warning",
      showConfirmButton: false,
      timer: 3000, // Display for 3 seconds
      timerProgressBar: true,
    });
    return false;
  } else if (password == "") {
    Swal.fire({
      title:
        "Current Password Required",
      icon: "warning",
      showConfirmButton: false,
      timer: 3000, // Display for 3 seconds
      timerProgressBar: true,
    });
    return false;
  }

  //not empty
  else if (newEmail != "" || newUsername != "" || password != "") {
    //email not corect format
    if (!emailPattern.test(newEmail)) {
      Swal.fire({
        title:
          "Please enter a valid emai",
        icon: "warning",
        showConfirmButton: false,
        timer: 3000, // Display for 3 seconds
        timerProgressBar: true,
      });
      return false;
    }
    //password not correct format
    if (!passwordPattern.test(newPassword) && newPassword != "") {
      Swal.fire({
        title:
          "Please enter a stronger password",
        icon: "warning",
        showConfirmButton: false,
        timer: 3000, // Display for 3 seconds
        timerProgressBar: true,
      });
      return false;
    }
  }
  return true;
}

// Handles different update cases
function update(
  password,
  oldPassword,
  newPassword,
  confirmPassword,
  userID,
  newEmail,
  newUsername
) {
  bycrypt.compare(password, oldPassword, function (error, isMatch) {
    if (isMatch) {
      // Password not changed
      if (
        newPassword == confirmPassword &&
        newPassword == "" &&
        confirmPassword == "" &&
        checkIfDetailsValid(newEmail, newUsername, password, newPassword)
      ) {
        putUserDetails(userID, newEmail, newUsername, oldPassword);
        Swal.fire({
          title:
            "Email and username updated",
          icon: "success",
          showConfirmButton: false,
          timer: 3000, // Display for 3 seconds
          timerProgressBar: true,
        });
        window.location.href = "http://localhost:3000/admin-home";
      }
      // Password changed and new passwords matches confirmed password
      else if (
        newPassword == confirmPassword &&
        newPassword != "" &&
        confirmPassword != "" &&
        checkIfDetailsValid(newEmail, newUsername, password, newPassword)
      ) {
        const salt = bycrypt.genSaltSync(10);
        let hashedNewPassword = bycrypt.hashSync(newPassword, salt);
        putUserDetails(userID, newEmail, newUsername, hashedNewPassword);
        Swal.fire({
          title:
            "Details updated",
          icon: "success",
          showConfirmButton: false,
          timer: 3000, // Display for 3 seconds
          timerProgressBar: true,
        });
        window.location.href = "http://localhost:3000/admin-home";
      }
      // New password doesn't match confirmed password
      else if (
        newPassword != confirmPassword &&
        checkIfDetailsValid(newEmail, newUsername, password, newPassword)
      ) {
        Swal.fire({
          title:
            "Passwords do not match",
          icon: "error",
          showConfirmButton: false,
          timer: 3000, // Display for 3 seconds
          timerProgressBar: true,
        });
      }
    } else {
      if (checkIfDetailsValid(newEmail, newUsername, password, newPassword)) {
        Swal.fire({
          title:
            "Incorrect Current Password",
          icon: "error",
          showConfirmButton: false,
          timer: 3000, // Display for 3 seconds
          timerProgressBar: true,
        });
      }
    }
  });
}

const AdminProfile = (props) => {
  // Get the username, userID, userpassword and useremail from local storage
  const userID = sessionStorage.getItem("userID");
  const username = sessionStorage.getItem("username");
  const email = sessionStorage.getItem("useremail");
  const oldPassword = sessionStorage.getItem("userpassword");
  let [password, setPassword] = useState("");
  let [newPassword, setNewPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  let [newUsername, setNewUsername] = useState("");
  let [newEmail, setNewEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    update(
      password,
      oldPassword,
      newPassword,
      confirmPassword,
      userID,
      newEmail,
      newUsername
    );
  };

  // Set local username and email
  const setUserDetails = () => {
    setNewUsername(username);
    setNewEmail(email);
  };

  // Allows current details to display when page loads
  useEffect(() => {
    setUserDetails();
  }, []);

  return (
    <div className="admin-profile-container">
      <div role="Header" className="admin-profile-navbar-container">
        <div className="admin-profile-navbar">
          <div className="admin-profile-left-side">
          <a href="https://youtu.be/dQw4w9WgXcQ" className="home-link">
                &lt;ProjectArena/&gt;
              </a>
            <div data-role="BurgerMenu" className="admin-profile-burger-menu">
              <svg viewBox="0 0 1024 1024" className="admin-profile-icon">
                <path d="M128 256h768v86h-768v-86zM128 554v-84h768v84h-768zM128 768v-86h768v86h-768z"></path>
              </svg>
            </div>
            <div className="admin-profile-links-container">
              <Link
                to="/admin-competitions"
                className="admin-profile-link1 Anchor"
              >
                COMPETITIONS
              </Link>
              <Link to="/admin-teams" className="admin-profile-link2 Anchor">
                TEAMS
              </Link>
            </div>
          </div>
          <div className="admin-profile-container1">
            <Link to="/admin-profile" className="admin-profile-navlink">
              <svg viewBox="0 0 1024 1024" className="admin-profile-icon2">
                <path d="M576 706.612v-52.78c70.498-39.728 128-138.772 128-237.832 0-159.058 0-288-192-288s-192 128.942-192 288c0 99.060 57.502 198.104 128 237.832v52.78c-217.102 17.748-384 124.42-384 253.388h896c0-128.968-166.898-235.64-384-253.388z"></path>
              </svg>
            </Link>
          </div>
          <div data-role="MobileMenu" className="admin-profile-mobile-menu">
            <div className="admin-profile-container2">
              <img
                alt="image"
                src="https://play.teleporthq.io/static/svg/default-img.svg"
                className="admin-profile-image1"
              />
              <div
                data-role="CloseMobileMenu"
                className="admin-profile-close-menu"
              >
                <svg viewBox="0 0 1024 1024" className="admin-profile-icon4">
                  <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                </svg>
              </div>
            </div>
            <div className="admin-profile-links-container1">
              <span className="admin-profile-link3 Anchor">Resources</span>
              <span className="admin-profile-link4 Anchor">Inspiration</span>
              <span className="admin-profile-link5 Anchor">Process</span>
              <span className="admin-profile-link6 Anchor">Our story</span>
            </div>
          </div>
        </div>
      </div>
      <div className="admin-profile-section-separator"></div>
      <div className="admin-profile-section-separator1"></div>
      <div className="admin-profile-section-separator2"></div>
      <div className="admin-profile-section-separator3"></div>
      <div className="admin-profile-container3" onSubmit={handleSubmit}>
        <span className="admin-profile-text">UPDATE PROFILE</span>
        <InputBoxForInfo
          data-testid="input-username"
          initialValue={username}
          buttonText="USERNAME"
          onChange={(e) => setNewUsername(e.target.value)}
        ></InputBoxForInfo>
        <InputBoxForInfo
          initialValue={email}
          buttonText="EMAIL"
          onChange={(e) => setNewEmail(e.target.value)}
        ></InputBoxForInfo>
        <InputBoxForInfo
          buttonText="CURRENT PASSWORD"
          isPassword
          onChange={(e) => setPassword(e.target.value)}
        ></InputBoxForInfo>
        <InputBoxForInfo
          buttonText="NEW PASSWORD"
          isPassword
          onChange={(e) => setNewPassword(e.target.value)}
        ></InputBoxForInfo>
        <InputBoxForInfo
          buttonText="CONFIRM PASSWORD"
          isPassword
          onChange={(e) => setConfirmPassword(e.target.value)}
        ></InputBoxForInfo>
        <Button
          type="submit"
          name="UPDATE"
          onClick={() => {
            // console.log("Register button clicked");
            update(
              password,
              oldPassword,
              newPassword,
              confirmPassword,
              userID,
              newEmail,
              newUsername
            );
          }}
          rootClassName="button-root-class-name4"
        ></Button>
        <br></br>
        <Button
          name="LOG OUT"
          onClick={() => {
            // console.log("Log out button clicked");
            sessionStorage.clear();
            window.location.href = "http://localhost:3000";
          }}
          color={"danger"}
          rootClassName="button-root-class-name4"
        ></Button>
      </div>
    </div>
  );
};

export { AdminProfile, checkIfDetailsValid, putUserDetails, update };
