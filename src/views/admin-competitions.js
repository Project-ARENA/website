import React from 'react'
import { Link } from 'react-router-dom'

import './admin-competitions.css'

const AdminCompetitions = (props) => {
  return (
    <div className="admin-competitions-container">
      <div data-role="Header" className="admin-competitions-navbar-container">
        <div className="admin-competitions-navbar">
          <div className="admin-competitions-left-side">
            <img
              alt="image"
              src="https://play.teleporthq.io/static/svg/default-img.svg"
              className="admin-competitions-image"
            />
            <div
              data-role="BurgerMenu"
              className="admin-competitions-burger-menu"
            >
              <svg viewBox="0 0 1024 1024" className="admin-competitions-icon">
                <path d="M128 256h768v86h-768v-86zM128 554v-84h768v84h-768zM128 768v-86h768v86h-768z"></path>
              </svg>
            </div>
            <div className="admin-competitions-links-container">
              <Link to="/admin-home" className="admin-competitions-link">
                HOME
              </Link>
              <Link to="/admin-competitions" className="admin-competitions-link1 Anchor">
                COMPETITIONS
              </Link>
              <Link to="/admin-teams" className="admin-competitions-link2 Anchor">
                TEAMS
              </Link>
            </div>
          </div>
          <div className="admin-competitions-container1">
            <Link to="/admin-profile" className="admin-competitions-navlink">
              <svg viewBox="0 0 1024 1024" className="admin-competitions-icon2">
                <path d="M576 706.612v-52.78c70.498-39.728 128-138.772 128-237.832 0-159.058 0-288-192-288s-192 128.942-192 288c0 99.060 57.502 198.104 128 237.832v52.78c-217.102 17.748-384 124.42-384 253.388h896c0-128.968-166.898-235.64-384-253.388z"></path>
              </svg>
            </Link>
          </div>
          <div
            data-role="MobileMenu"
            className="admin-competitions-mobile-menu"
          >
            <div className="admin-competitions-container2">
              <img
                alt="image"
                src="https://play.teleporthq.io/static/svg/default-img.svg"
                className="admin-competitions-image1"
              />
              <div
                data-role="CloseMobileMenu"
                className="admin-competitions-close-menu"
              >
                <svg
                  viewBox="0 0 1024 1024"
                  className="admin-competitions-icon4"
                >
                  <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                </svg>
              </div>
            </div>
            <div className="admin-competitions-links-container1">
            <Link to="/admin-home" className="admin-competitions-link">
                HOME
              </Link>
              <Link to="/admin-competitions" className="admin-competitions-link1 Anchor">
                COMPETITIONS
              </Link>
              <Link to="/admin-teams" className="admin-competitions-link2 Anchor">
                TEAMS
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="admin-competitions-section-separator"></div>
      <div className="admin-competitions-section-separator1"></div>
      <div className="admin-competitions-section-separator2"></div>
      <div className="admin-competitions-section-separator3"></div>
    </div>
  )
}

export default AdminCompetitions
