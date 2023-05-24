import React from 'react'
import { Link } from 'react-router-dom'

import './home.css'

const Home = (props) => {
  return (
    <div className="home-container">
      <div data-role="Header" className="home-navbar-container">
        <div className="home-navbar">
          <div className="home-left-side">
            <div data-role="BurgerMenu" className="home-burger-menu">
              <svg viewBox="0 0 1024 1024" className="home-icon">
                <path d="M128 256h768v86h-768v-86zM128 554v-84h768v84h-768zM128 768v-86h768v86h-768z"></path>
              </svg>
            </div>
            <div className="home-links-container">
              <Link to="/home" className="home-link">
                &lt;ProjectArena/&gt;
              </Link>
              <Link to="/home" className="home-link1">
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
          <div className="home-right-side">
            <Link to="/login" className="home-cta-btn button">
              <span>LOGIN</span>
            </Link>
          </div>
          <div data-role="MobileMenu" className="home-mobile-menu">
            <div className="home-container1">
              <img
                alt="image"
                src="https://play.teleporthq.io/static/svg/default-img.svg"
                className="home-image"
              />
              <div data-role="CloseMobileMenu" className="home-close-menu">
                <svg viewBox="0 0 1024 1024" className="home-icon2">
                  <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                </svg>
              </div>
            </div>
            <div className="home-links-container1">
              <span className="home-link5 Anchor">Resources</span>
              <span className="home-link6 Anchor">Inspiration</span>
              <span className="home-link7 Anchor">Process</span>
              <span className="home-link8 Anchor">Our story</span>
            </div>
          </div>
        </div>
      </div>
      <div className="home-section-separator"></div>
      <div className="home-section-separator1"></div>
      <div className="home-section-separator2"></div>
      <div className="home-section-separator3">
        <div className="home-hero">
          <div className="home-container2">
            <h1 className="home-text1">
              Welcome to our online platform for competitive programming!
            </h1>
            <span className="home-text2">
              <span>
                Our platform offers a competitive space for programmers to
                showcase their skills and participate in challenges. Join or
                create a team and submit your solutions to earn a score, with
                the top performers showcased on the leaderboard. Test your
                skills against other talented programmers and join us today to
                start competing!
              </span>
              <span>
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
              <span>
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
            </span>
          </div>
          <img
            alt="image"
            src="https://images.unsplash.com/photo-1547394765-185e1e68f34e?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDEzfHxjb21wdXRlcnxlbnwwfHx8fDE2NzkxNDM2ODM&amp;ixlib=rb-4.0.3&amp;w=1200"
            className="home-image1"
          />
        </div>
      </div>
    </div>
  )
}

export default Home
