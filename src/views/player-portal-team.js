import React from 'react'
import { Link } from 'react-router-dom'

import './player-portal-team.css'

const PlayerPortalTeam = (props) => {
  return (
    <div className="player-portal-team-container">
      <div data-role="Header" className="player-portal-team-navbar-container">
        <div className="player-portal-team-navbar">
          <div className="player-portal-team-left-side">
            <img
              alt="image"
              src="https://play.teleporthq.io/static/svg/default-img.svg"
              className="player-portal-team-image"
            />
            <div
              data-role="BurgerMenu"
              className="player-portal-team-burger-menu"
            >
              <svg viewBox="0 0 1024 1024" className="player-portal-team-icon">
                <path d="M128 256h768v86h-768v-86zM128 554v-84h768v84h-768zM128 768v-86h768v86h-768z"></path>
              </svg>
            </div>
            <div className="player-portal-team-links-container">
              <Link to="/player-portal-home" className="player-portal-team-link">
                HOME
              </Link>
              <Link to="/player-portal-competitions" className="player-portal-team-link1 Anchor">
                COMPETITIONS
              </Link>
              <Link to="/player-portal-team" className="player-portal-team-link2 Anchor">
                TEAM
              </Link>
              <Link to="/player-portal-contact" className="player-portal-team-link3">
                <span className="Anchor">CONTACT US</span>
                <br></br>
              </Link>
            </div>
          </div>
          <div className="player-portal-team-container1">
            <Link to="/player-portal-profile" className="player-portal-team-navlink">
              <svg viewBox="0 0 1024 1024" className="player-portal-team-icon2">
                <path d="M576 706.612v-52.78c70.498-39.728 128-138.772 128-237.832 0-159.058 0-288-192-288s-192 128.942-192 288c0 99.060 57.502 198.104 128 237.832v52.78c-217.102 17.748-384 124.42-384 253.388h896c0-128.968-166.898-235.64-384-253.388z"></path>
              </svg>
            </Link>
          </div>
          <div
            data-role="MobileMenu"
            className="player-portal-team-mobile-menu"
          >
            <div className="player-portal-team-container2">
              <img
                alt="image"
                src="https://play.teleporthq.io/static/svg/default-img.svg"
                className="player-portal-team-image1"
              />
              <div
                data-role="CloseMobileMenu"
                className="player-portal-team-close-menu"
              >
                <svg
                  viewBox="0 0 1024 1024"
                  className="player-portal-team-icon4"
                >
                  <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                </svg>
              </div>
            </div>
            <div className="player-portal-team-links-container1">
            <Link to="/player-portal-home" className="player-portal-team-link">
                HOME
              </Link>
              <Link to="/player-portal-competitions" className="player-portal-team-link1 Anchor">
                COMPETITIONS
              </Link>
              <Link to="/player-portal-team" className="player-portal-team-link2 Anchor">
                TEAM
              </Link>
              <Link to="/player-portal-contact" className="player-portal-team-link3">
                CONTACT US
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="player-portal-team-section-separator"></div>
      <div className="player-portal-team-section-separator1"></div>
      <div className="player-portal-team-section-separator2"></div>
      <div className="player-portal-team-section-separator3"></div>
    </div>
  )
}

export default PlayerPortalTeam
