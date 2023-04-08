import React from 'react'
import { Link } from 'react-router-dom'

import './arena-leaderboard.css'

const ArenaLeaderboard = (props) => {
  return (
    <div className="arena-leaderboard-container">
      <div data-role="Header" className="arena-leaderboard-navbar-container">
        <div className="arena-leaderboard-navbar">
          <div className="arena-leaderboard-left-side">
            <img
              alt="image"
              src="https://play.teleporthq.io/static/svg/default-img.svg"
              className="arena-leaderboard-image"
            />
            <div
              data-role="BurgerMenu"
              className="arena-leaderboard-burger-menu"
            >
              <svg viewBox="0 0 1024 1024" className="arena-leaderboard-icon">
                <path d="M128 256h768v86h-768v-86zM128 554v-84h768v84h-768zM128 768v-86h768v86h-768z"></path>
              </svg>
            </div>
            <svg viewBox="0 0 1024 1024" className="arena-leaderboard-icon2">
              <path d="M896 470v84h-604l152 154-60 60-256-256 256-256 60 60-152 154h604z"></path>
            </svg>
            <div className="arena-leaderboard-links-container">
              <Link to="/player-portal-home" className="arena-leaderboard-link">
                Submissions
              </Link>
              <Link
                to="/player-portal-competitions"
                className="arena-leaderboard-link1 Anchor"
              >
                lEADERBOARD
              </Link>
              <Link
                to="/player-portal-team"
                className="arena-leaderboard-link2 Anchor"
              >
                tEAM
              </Link>
            </div>
          </div>
          <div className="arena-leaderboard-container1">
            <Link
              to="/player-portal-profile"
              className="arena-leaderboard-navlink"
            >
              <svg viewBox="0 0 1024 1024" className="arena-leaderboard-icon4">
                <path d="M576 706.612v-52.78c70.498-39.728 128-138.772 128-237.832 0-159.058 0-288-192-288s-192 128.942-192 288c0 99.060 57.502 198.104 128 237.832v52.78c-217.102 17.748-384 124.42-384 253.388h896c0-128.968-166.898-235.64-384-253.388z"></path>
              </svg>
            </Link>
          </div>
          <div data-role="MobileMenu" className="arena-leaderboard-mobile-menu">
            <div className="arena-leaderboard-container2">
              <img
                alt="image"
                src="https://play.teleporthq.io/static/svg/default-img.svg"
                className="arena-leaderboard-image1"
              />
              <div
                data-role="CloseMobileMenu"
                className="arena-leaderboard-close-menu"
              >
                <svg
                  viewBox="0 0 1024 1024"
                  className="arena-leaderboard-icon6"
                >
                  <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                </svg>
              </div>
            </div>
            <div className="arena-leaderboard-links-container1">
              <span className="arena-leaderboard-link3 Anchor">Resources</span>
              <span className="arena-leaderboard-link4 Anchor">
                Inspiration
              </span>
              <span className="arena-leaderboard-link5 Anchor">Process</span>
              <span className="arena-leaderboard-link6 Anchor">Our story</span>
            </div>
          </div>
        </div>
      </div>
      <div className="arena-leaderboard-section-separator"></div>
      <div className="arena-leaderboard-section-separator1"></div>
      <div className="arena-leaderboard-section-separator2"></div>
      <div className="arena-leaderboard-section-separator3"></div>
    </div>
  )
}

export default ArenaLeaderboard
