import React from "react";
import { Link } from "react-router-dom";

import { Helmet } from "react-helmet";

import OverflowCard from "../components/OverflowCard";

import "./competitions.css";

function GenCards() {
  const cardsData = [
    {
      imageUrl:
        "https://www.youthvillage.co.za/wp-content/uploads/2018/03/wits-logo-687x405.jpg",
      competitionName: "Competition 1",
      companyName: "Company 1",
      views: 42,
      time: "2 hours",
    },
    {
      imageUrl:
        "https://www.youthvillage.co.za/wp-content/uploads/2018/03/wits-logo-687x405.jpg",
      competitionName: "Competition 2",
      companyName: "Company 2",
      views: 23,
      time: "1 hour",
    },
    {
      imageUrl:
        "https://www.youthvillage.co.za/wp-content/uploads/2018/03/wits-logo-687x405.jpg",
      competitionName: "Competition 3",
      companyName: "Company 3",
      views: 12,
      time: "30 minutes",
    },
    {
      imageUrl:
        "https://www.youthvillage.co.za/wp-content/uploads/2018/03/wits-logo-687x405.jpg",
      competitionName: "Competition 4",
      companyName: "Company 4",
      views: 42,
      time: "2 hours",
    },
    {
      imageUrl:
        "https://www.youthvillage.co.za/wp-content/uploads/2018/03/wits-logo-687x405.jpg",
      competitionName: "Competition 5",
      companyName: "Company 5",
      views: 23,
      time: "10 hours",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        maxWidth: "1024px",
        margin: "0 auto",
        justifyContent: "center",
      }}
    >
      {cardsData.map((cardData, index) => (
        <OverflowCard key={index} {...cardData} />
      ))}
    </div>
  );
}

const Competitions = (props) => {
  return (
    <div className="competitions-container">
      <Helmet>
        <title>Competitions - Project ARENA</title>
        <meta property="og:title" content="Competitions - Project ARENA" />
      </Helmet>
      <div data-role="Header" className="competitions-navbar-container">
        <div className="competitions-navbar">
          <div className="competitions-left-side">
            <img
              alt="image"
              src="https://play.teleporthq.io/static/svg/default-img.svg"
              className="competitions-image"
            />
            <div data-role="BurgerMenu" className="competitions-burger-menu">
              <svg viewBox="0 0 1024 1024" className="competitions-icon">
                <path d="M128 256h768v86h-768v-86zM128 554v-84h768v84h-768zM128 768v-86h768v86h-768z"></path>
              </svg>
            </div>
            <div className="competitions-links-container">
              <Link to="/" className="competitions-link">
                HOME
              </Link>
              <Link to="/competitions" className="competitions-link1 Anchor">
                COMPETITIONS
              </Link>
              <Link to="/contact" className="competitions-link2 Anchor">
                CONTACT
              </Link>
              <span className="competitions-link3 Anchor">ABOUT</span>
            </div>
          </div>
          <div className="competitions-right-side">
            <Link to="/register" className="competitions-cta-btn button">
              PROJECT PORTAL
            </Link>
          </div>
          <div data-role="MobileMenu" className="competitions-mobile-menu">
            <div className="competitions-container1">
              <img
                alt="image"
                src="https://play.teleporthq.io/static/svg/default-img.svg"
                className="competitions-image1"
              />
              <div
                data-role="CloseMobileMenu"
                className="competitions-close-menu"
              >
                <svg viewBox="0 0 1024 1024" className="competitions-icon2">
                  <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                </svg>
              </div>
            </div>
            <div className="competitions-links-container1">
              <span className="competitions-link4 Anchor">Resources</span>
              <span className="competitions-link5 Anchor">Inspiration</span>
              <span className="competitions-link6 Anchor">Process</span>
              <span className="competitions-link7 Anchor">Our story</span>
            </div>
          </div>
        </div>
      </div>
      <div className="competitions-section-separator"></div>
      <div className="competitions-section-separator1"></div>
      <div className="competitions-section-separator2"></div>
      <div className="competitions-section-separator3"></div>

      {/* The OverFlow cards, leave some space */}
      <br />
      <GenCards />
      <br />
    </div>
  );
};

export default Competitions;
