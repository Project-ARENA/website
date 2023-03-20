import React from 'react'
import { Link } from 'react-router-dom'

import InputBoxForInfo from "../components/input-box-for-info";
import Button from "../components/button";
import './admin-profile.css'

const AdminProfile = (props) => {

  // const handleUpdate = () => {
  //   // Do something with the input values
  //   console.log(
  //     `Name: ${name}, Surname: ${surname} Email: ${email}, Username: ${username}, Password: ${hashedPassword}`
  //   );
  //   // postDetails();
   
  // };


  return (
    <div className="admin-profile-container">
      <div data-role="Header" className="admin-profile-navbar-container">
        <div className="admin-profile-navbar">
          <div className="admin-profile-left-side">
            <img
              alt="image"
              src="https://play.teleporthq.io/static/svg/default-img.svg"
              className="admin-profile-image"
            />
            <div data-role="BurgerMenu" className="admin-profile-burger-menu">
              <svg viewBox="0 0 1024 1024" className="admin-profile-icon">
                <path d="M128 256h768v86h-768v-86zM128 554v-84h768v84h-768zM128 768v-86h768v86h-768z"></path>
              </svg>
            </div>
            <div className="admin-profile-links-container">
              <Link to="/player-portal-home" className="admin-profile-link">
                HOME
              </Link>
              <Link
                to="/player-portal-competitions"
                className="admin-profile-link1 Anchor"
              >
                COMPETITIONS
              </Link>
              <Link
                to="/player-portal-team"
                className="admin-profile-link2 Anchor"
              >
                tEAMS
              </Link>
            </div>
          </div>
          <div className="admin-profile-container1">
            <Link to="/player-portal-profile" className="admin-profile-navlink">
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
      <div className="admin-profile-container3">
        <span className="admin-profile-text">UPDATE PROFILE</span>
        <InputBoxForInfo buttonText="EMAIL"></InputBoxForInfo>
        <InputBoxForInfo 
            buttonText="USERNAME">
        </InputBoxForInfo>
        <InputBoxForInfo buttonText="PASSWORD" isPassword></InputBoxForInfo>
        <InputBoxForInfo buttonText="CONFIRM PASSWORD" isPassword></InputBoxForInfo>
        <Button
        name="UPDATE"
        onClick={() => {
          console.log("Register button clicked");
          // handleUpdate();
        }}
          // button="UPDATE"
          rootClassName="button-root-class-name4"
        ></Button>
        <div className="admin-profile-container4"></div>
      </div>
    </div>
  )
}

export default AdminProfile
