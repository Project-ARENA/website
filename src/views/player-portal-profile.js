import React from 'react'
import { Link } from 'react-router-dom'

import InputBoxForInfo from './input-box-for-info'
import Button from './button'
import './player-portal-profile.css'

const PlayerPortalProfile = (props) => {
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
              <Link
                to="/player-portal-home"
                className="player-portal-profile-link"
              >
                HOME
              </Link>
              <Link
                to="/player-portal-competitions"
                className="player-portal-profile-link1 Anchor"
              >
                COMPETITIONS
              </Link>
              <Link
                to="/player-portal-team"
                className="player-portal-profile-link2 Anchor"
              >
                tEAM
              </Link>
              <Link
                to="/player-portal-contact"
                className="player-portal-profile-link3 Anchor"
              >
                CONTACT US
              </Link>
            </div>
          </div>
          <div className="player-portal-profile-container1">
            <Link
              to="/player-portal-profile"
              className="player-portal-profile-navlink"
            >
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
              <span className="player-portal-profile-link4 Anchor">
                Resources
              </span>
              <span className="player-portal-profile-link5 Anchor">
                Inspiration
              </span>
              <span className="player-portal-profile-link6 Anchor">
                Process
              </span>
              <span className="player-portal-profile-link7 Anchor">
                Our story
              </span>
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
          text="EMAIL"
          rootClassName="input-box-for-info-root-class-name14"
        ></InputBoxForInfo>
        <InputBoxForInfo text="USERNAME"></InputBoxForInfo>
        <InputBoxForInfo text="PASSWORD"></InputBoxForInfo>
        <InputBoxForInfo text="CONFIRM PASSWORD"></InputBoxForInfo>
        <Button
          button="UPDATE"
          rootClassName="button-root-class-name3"
        ></Button>
        <div className="player-portal-profile-container4"></div>
      </div>
    </div>
  )
}

export default PlayerPortalProfile
