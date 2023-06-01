import React from 'react'
import { Link } from 'react-router-dom'
import ParticleComponent from '../components/ParticleComponent'

import './home.css'

const Home = (props) => {
  return (
    <div className="home-container">
      <div data-role="Header" className="home-navbar-container">
        <div className="home-navbar" data-testid="navbar">
          <div className="home-left-side">
            <div data-role="BurgerMenu" className="home-burger-menu" data-testid="BurgerMenu">
              <svg viewBox="0 0 1024 1024" className="home-icon">
                <path d="M128 256h768v86h-768v-86zM128 554v-84h768v84h-768zM128 768v-86h768v86h-768z"></path>
              </svg>
            </div>
            <div className="home-links-container">
              <a href="https://youtu.be/dQw4w9WgXcQ" className="home-link">
                &lt;ProjectArena/&gt;
              </a>
              <Link to="/" className="home-link1">
                HOME
              </Link>
              <Link to="/competitions" className="home-link2 Anchor">
                COMPETITIONS
              </Link>
              <Link to="/contact" className="home-link3 Anchor">
                CONTACT
              </Link>
              <Link to="/about" className="home-link4 Anchor" data-id="about">
                ABOUT
              </Link>
            </div>
          </div>
          <div className="home-right-side">
            <Link to="/login" className="home-cta-btn" style={{whiteSpace:"normal", paddingLeft:"25px", paddingRight:"25px"}}>
              <span> LOGIN </span>
            </Link>
          </div>
          <div data-role="MobileMenu" className="home-mobile-menu">
            <div className="home-container1">
            <a href="https://youtu.be/dQw4w9WgXcQ" className="home-link">
                &lt;ProjectArena/&gt;
              </a>
              <div data-role="CloseMobileMenu" className="home-close-menu">
                <svg viewBox="0 0 1024 1024" className="home-icon2">
                  <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                </svg>
              </div>
            </div>
            <div className="home-links-container1">
            <Link to="/" className="home-link1">
                HOME
              </Link>
              <Link to="/competitions" className="home-link2 Anchor">
                COMPETITIONS
              </Link>
              <Link to="/contact" className="home-link3 Anchor">
                CONTACT
              </Link>
              <Link to="/about" className="home-link4 Anchor">
                ABOUT
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="home-section-separator"></div>
      <div className="home-section-separator1"></div>
      <div className="home-section-separator2"></div>
      <div className="home-section-separator3">
        <div className="home-hero" data-testid="hero">
          <div className="home-container2">
            <h1 className="home-text1">
              "Where Programmers Rise, Challenges Fall!"
            </h1>
            <span className="home-text2">
              <span>
              Embark on an exhilarating coding adventure where programmers triumph!
              Ignite your competitive spirit, collaborate, and conquer challenges on
              our cutting-edge platform. Climb the ranks, earn glory, and witness your
              name atop the prestigious leaderboard. Engage in thrilling battles against
              brilliant minds, and seize the moment to unleash your programming genius.
              Join the league of champions and start your journey today!
              </span>
              <span>
                {/* <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                /> */}
              </span>
              <span>
                {/* <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                /> */}
              </span>
            </span>
          </div>
          {/* <img
            alt="image"
            src="https://images.unsplash.com/photo-1547394765-185e1e68f34e?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDEzfHxjb21wdXRlcnxlbnwwfHx8fDE2NzkxNDM2ODM&amp;ixlib=rb-4.0.3&amp;w=1200"
            className="home-image1"
          /> */}
          <ParticleComponent width={600} height={600}  />
        </div>
      </div>
    </div>
  )
}

export default Home
