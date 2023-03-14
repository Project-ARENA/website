import React from 'react'

import { Helmet } from 'react-helmet'

import './home.css'

const Home = (props) => {
  return (
    <div className="home-container">
      <Helmet>
        <title>Project ARENA</title>
        <meta property="og:title" content="Project ARENA" />
      </Helmet>
      <div data-role="Header" className="home-navbar-container">
        <div className="home-navbar">
          <div className="home-left-side">
            <img
              alt="image"
              src="https://play.teleporthq.io/static/svg/default-img.svg"
              className="home-image"
            />
            <div data-role="BurgerMenu" className="home-burger-menu">
              <svg viewBox="0 0 1024 1024" className="home-icon">
                <path d="M128 256h768v86h-768v-86zM128 554v-84h768v84h-768zM128 768v-86h768v86h-768z"></path>
              </svg>
            </div>
            <div className="home-links-container">
              <span className="home-link">A</span>
              <span className="home-link1 Anchor">B</span>
              <span className="home-link2 Anchor">C</span>
              <span className="home-link3 Anchor">D</span>
            </div>
          </div>
          <div className="home-right-side">
            <button className="home-cta-btn button">PROJECT ARENA</button>
          </div>
          <div data-role="MobileMenu" className="home-mobile-menu">
            <div className="home-container1">
              <img
                alt="image"
                src="https://play.teleporthq.io/static/svg/default-img.svg"
                className="home-image1"
              />
              <div data-role="CloseMobileMenu" className="home-close-menu">
                <svg viewBox="0 0 1024 1024" className="home-icon2">
                  <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                </svg>
              </div>
            </div>
            <div className="home-links-container1">
              <span className="home-link4 Anchor">Resources</span>
              <span className="home-link5 Anchor">Inspiration</span>
              <span className="home-link6 Anchor">Process</span>
              <span className="home-link7 Anchor">Our story</span>
            </div>
          </div>
        </div>
      </div>
      <div className="home-section-separator"></div>
      <div className="home-section-separator1"></div>
      <div className="home-section-separator2"></div>
      <div className="home-section-separator3"></div>
    </div>
  )
}

export default Home
