import React from "react";
import { Link } from "react-router-dom";
import AccordionContent from "../components/collapse";

import "./about.css";
var GithubLogo = "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
var LinkedInLogo = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/800px-LinkedIn_logo_initials.png"
var EmailLogo = "https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/112-gmail_email_mail-512.png"
const About = (props) => {
  return (
    <div className="about-container">
      <div
        data-role="Header"
        className="about-navbar-container"
        data-testid="Header-container"
      >
        <div className="about-navbar">
          <div className="about-left-side">
            <a href="https://youtu.be/dQw4w9WgXcQ" className="home-link">
              &lt;ProjectArena/&gt;
            </a>
            <div data-role="BurgerMenu" className="about-burger-menu">
              <svg viewBox="0 0 1024 1024" className="about-icon">
                <path d="M128 256h768v86h-768v-86zM128 554v-84h768v84h-768zM128 768v-86h768v86h-768z"></path>
              </svg>
            </div>
            <div className="about-links-container">
              <Link to="/" className="about-link" data-text="HOME">
                HOME
              </Link>
              <Link to="/competitions" className="about-link1 Anchor">
                COMPETITIONS
              </Link>
              <Link to="/contact" className="about-link2 Anchor">
                CONTACT
              </Link>
              <Link to="/about" className="about-link3 Anchor">
                ABOUT
              </Link>
              {/* <Link to="/player-portal-home" className="contact-link4 Anchor">
                PLAYER PORTAL
              </Link> */}
            </div>
          </div>
          <div className="about-right-side">
            <Link to="/login" className="about-cta-btn button">
              LOGIN
            </Link>
          </div>
          <div
            data-role="MobileMenu"
            className="about-mobile-menu"
            data-testid="MobileMenu-container"
          >
            <div className="about-container1">
              <a href="https://youtu.be/dQw4w9WgXcQ" className="home-link">
                &lt;ProjectArena/&gt;
              </a>
              <div
                data-role="CloseMobileMenu"
                className="about-close-menu"
                data-testid="CloseMobileMenu-container"
              >
                <svg viewBox="0 0 1024 1024" className="about-icon2">
                  <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                </svg>
              </div>
            </div>
            <div className="about-links-container1">
              <Link to="/" className="contact-link" data-testid="home">
                HOME
              </Link>
              <Link
                to="/competitions"
                className="contact-link1 Anchor"
                data-testid="competitions"
              >
                COMPETITIONS
              </Link>
              <Link
                to="/contact"
                className="contact-link2 Anchor"
                data-testid="contact"
              >
                CONTACT
              </Link>
              <Link
                to="/about"
                className="contact-link3 Anchor"
                data-testid="about"
              >
                ABOUT
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="about-section-separator"></div>
      <div className="about-section-separator1"></div>
      <div className="about-section-separator2"></div>
      <div className="about-section-separator3"></div>

      <div className="about-group-message">
        <div className="about-container2">
          <h1 className="about-text">Lets Meet the Team</h1>
          <span className="about-text1">
            <span>
              We are a talented team of developers with diverse skills and
              abilities. We created this platform from scratch. Keep an eye out
              for the hidden surprises we&apos;ve placed on the website—happy
              hunting and programming! May the most exceptional team emerge
              victorious.
            </span>
            <span>
              <span
                dangerouslySetInnerHTML={{
                  __html: " ",
                }}
              />
            </span>
            <span>
              <span
                dangerouslySetInnerHTML={{
                  __html: " ",
                }}
              />
            </span>
          </span>
          <div className="about-container3"></div>
        </div>
        <img
          alt="image"
          src="https://www.wits.ac.za/media/wits-university/home-page/Wits%20University%20Great%20Hall%202023.png"
          className="about-image2"
          style={{borderRadius: "1%" }}
        />
      </div>
               
      {/* AboutEachPerson */}
      <div class="row">
        {/* Person 1 */}
        <div class="column">
          <div class="card">
            <img
              src="https://highlyclutch.com/wp-content/uploads/2023/03/Hasbulla.jpg"
              alt="Mu'aaz Bassa"
              style={{ width: "100%", borderRadius: "1%" }}
            />
            <div class="container">
              <h2>Mu'aaz Bassa</h2>
              <p class="title">Scrum Master</p>
              <p>
                <div className="social-links">
                  {/* GITHUB */}
                  <a
                    href="https://github.com/muaazbassa"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={GithubLogo}
                      alt="GitHub"
                      className="social-logo"
                    />
                  </a>
                  {/* LINKEDIN */}
                  <a
                    href="https://www.linkedin.com/in/muaazbassa/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={LinkedInLogo}
                      alt="LinkedIn"
                      className="social-logo"
                    />
                  </a>
                  {/* EMAIL */}
                  <a
                    href="mailto:muaazbassa@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={EmailLogo}
                      alt="Email"
                      className="social-logo"
                    />
                  </a>
                </div>
              </p>
            </div>
          </div>
        </div>
        {/* Person 2*/}
        <div class="column">
          <div class="card">
            <img
              src="https://highlyclutch.com/wp-content/uploads/2023/03/Hasbulla.jpg"
              alt="Sayfullah Jumoorty"
              style={{ width: "100%", borderRadius: "1%" }}
            />
            <div class="container">
              <h2 className="person-name">
              Sayfullah Jumoorty
              </h2>
              <p class="title">Programmer</p>
              <p>
                <div className="social-links">
                  {/* GITHUB */}
                  <a
                    href="https://github.com/SuperSayf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={GithubLogo}
                      alt="GitHub"
                      className="social-logo"
                    />
                  </a>
                  {/* LINKEDIN */}
                  <a
                    href="https://www.linkedin.com/in/sayfullah-jumoorty/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={LinkedInLogo}
                      alt="LinkedIn"
                      className="social-logo"
                    />
                  </a>
                  {/* EMAIL */}
                  <a
                    href="mailto:sayfullah.jumoorty@live.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={EmailLogo}
                      alt="Email"
                      className="social-logo"
                    />
                  </a>
                </div>
              </p>
            </div>
          </div>
        </div>
        {/* Person 3 */}
        <div class="column">
          <div class="card">
            <img
              src="https://highlyclutch.com/wp-content/uploads/2023/03/Hasbulla.jpg"
              alt="Altaaf Ally"
              style={{ width: "100%", borderRadius: "1%" }}
            />
            <div class="container">
              <h2>Altaaf Ally</h2>
              <p class="title">Programmer</p>
              <p>
                <div className="social-links">
                  {/* GITHUB */}
                  <a
                    href="https://github.com/AltaafAlly"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={GithubLogo}
                      alt="GitHub"
                      className="social-logo"
                    />
                  </a>
                  {/* LINKEDIN */}
                  <a
                    href="https://www.linkedin.com/in/muaazbassa/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={LinkedInLogo}
                      alt="LinkedIn"
                      className="social-logo"
                    />
                  </a>
                  {/* EMAIL */}
                  <a
                    href="mailto:altaaf313@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={EmailLogo}
                      alt="Email"
                      className="social-logo"
                    />
                  </a>
                </div>
              </p>
            </div>
          </div>
        </div>
        {/* Person 4 */}
        <div class="column">
          <div class="card">
            <img
              src="https://highlyclutch.com/wp-content/uploads/2023/03/Hasbulla.jpg"
              alt="Muhammed Muaaz Dawood"
              style={{ width: "100%", borderRadius: "1%" }}
            />
            <div class="container">
              <h2>Muhammed Muaaz Dawood</h2>
              <p class="title">Programmer</p>
              <p>
                <div className="social-links">
                  {/* GITHUB */}
                  <a
                    href="https://github.com/Daggy2002"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={GithubLogo}
                      alt="GitHub"
                      className="social-logo"
                    />
                  </a>
                  {/* LINKEDIN */}
                  <a
                    href="https://www.linkedin.com/in/muaazbassa/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={LinkedInLogo}
                      alt="LinkedIn"
                      className="social-logo"
                    />
                  </a>
                  {/* EMAIL */}
                  <a
                    href="mailto:momosuli8@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={EmailLogo}
                      alt="Email"
                      className="social-logo"
                    />
                  </a>
                </div>
              </p>
            </div>
          </div>
        </div>
        {/* Person 5 */}
        <div class="column">
          <div class="card">
            <img
              src="https://highlyclutch.com/wp-content/uploads/2023/03/Hasbulla.jpg"
              alt="Rayhaan Hanslod"
              style={{ width: "100%", borderRadius: "1%" }}
            />
            <div class="container">
              <h2>Rayhaan Hanslod</h2>
              <p class="title">Programmer</p>
              <p>
                <div className="social-links">
                  {/* GITHUB */}
                  <a
                    href="https://github.com/rayrsys"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={GithubLogo}
                      alt="GitHub"
                      className="social-logo"
                    />
                  </a>
                  {/* LINKEDIN */}
                  <a
                    href="https://www.linkedin.com/in/rayhaan-hanslod-02a5ab16b/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={LinkedInLogo}
                      alt="LinkedIn"
                      className="social-logo"
                    />
                  </a>
                  {/* EMAIL */}
                  <a
                    href="mailto:rayhaanhanslod6@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={EmailLogo}
                      alt="Email"
                      className="social-logo"
                    />
                  </a>
                </div>
              </p>
            </div>
          </div>
        </div>
      
        {/* Person 6 */}
        <div class="column">
          <div class="card">
            <img
              src="https://highlyclutch.com/wp-content/uploads/2023/03/Hasbulla.jpg"
              alt="Hamdullah Dadabhoy (Abdullah Karolia)"
              style={{ width: "100%", borderRadius: "1%" }}
            />
            <div class="container">
              <h2>Hamdullah Dadabhoy (Abdullah Karolia)</h2>
              <p class="title">Programmer</p>
              <p>
                <div className="social-links">
                  {/* GITHUB */}
                  <a
                    href="https://github.com/akarolia47"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={GithubLogo}
                      alt="GitHub"
                      className="social-logo"
                    />
                  </a>
                  {/* LINKEDIN */}
                  <a
                    href="https://www.linkedin.com/in/hamdullah-dadabhoy-80898a190"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={LinkedInLogo}
                      alt="LinkedIn"
                      className="social-logo"
                    />
                  </a>
                  {/* EMAIL */}
                  <a
                    href="mailto:abdullahkarolia47@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={EmailLogo}
                      alt="Email"
                      className="social-logo"
                    />
                  </a>
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* AboutEachPerson */}
    </div>
  );
};

export default About;
