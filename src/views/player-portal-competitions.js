import React from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
import OverflowCard from "../components/OverflowCardPP";
const userID = localStorage.getItem('userID');
import './player-portal-competitions.css'

function GenCards() {
  const [cardsData, setCardsData] = React.useState([]);
  const [isFlipped, setIsFlipped] = React.useState(false);

  React.useEffect(() => {
    axios
      .get("http://localhost:3002/api/get/competitions")
      .then((response) => {
        //console.log(response.data);
        const data = response.data.map((data) => ({
          title: data.competition_name,
          views: data.competition_views,
          image: data.competition_image,
          description: data.competition_info,
          endDate: data.competition_enddate,
        }));
        
        // Set isRegistered property after cardsData is populated with data
        // You need to find out whether the user is registered for a competition or not - Sayf
        // For now, I'm just gonna do the first one manually as an example
        // Add the isRegistered header to the cardData object, which holds the string "isRegistered" to the first card
        const newCardsData = [];
        
        // Use Promise.all to wait for all the API requests to finish before updating the state
        Promise.all(
          data.map((cardData, index) => {
            //console.log()
            //for(let item = 0 ; item < data.length; item++){
              
              //data.forEach((item) => {
    
              //API to get the competition id
              return axios
                .get("http://localhost:3002/api/get/competitionID/" + data[index].title)
                .then(function(response){
                  //console.log(data[index].title)
                  //console.log(response.data);
                  const competition_id = response.data[0].competition_id;
                  //console.log(competition_id);
                  //API to see if the user is registered for the competition
                  return axios
                    .get("http://localhost:3002/api/get/isRegistered/" + competition_id + "/" + userID)
                    .then(function(response){
                      //console.log("I made it here")
                      const userExists = response.data;
                      //console.log(response.data);
                      if (JSON.stringify(userExists) == "[]"){
                        newCardsData.push(cardData);
                      }
                      else{
                        //console.log("I am registered for this");
                        newCardsData.push({ ...cardData, isRegistered: true });
                      }
                    });
                });
                
            //}
            
            // Remove the following code since it is not needed anymore
            // if (index == 0) {
            //   return { ...cardData, isRegistered: true };
            // } else {
            //   return cardData;
            // }
          })
        ).then(() => {
          // Now that all the API requests have finished, update the state
          setCardsData(newCardsData);
        });
      });
  }, []);
  

  //views of card
  const handleCardClick = (index) => {
    setIsFlipped(true);

    if (isFlipped) {
      axios
        .post("http://localhost:3002/api/post/competition/incViews", {
          competition_id: index + 1,
        })
        .then((response) => {
          console.log(response);
        });

      const newCardsData = [...cardsData];
      newCardsData[index].views += 1;
      setCardsData(newCardsData);

      setIsFlipped(false);
    }
  };

  //if card is clicked 
  const handleButtonClick = (index) => {
    console.log(`Button on card ${index} was clicked!`);
    // Check if the card is registered or not
    if (cardsData[index].isRegistered) {
      console.log(`User is already registered for card ${index}`);
      // Can use API route to leave competition
    } else {
      console.log(`User is not registered for card ${index}`);
      axios
                .get("http://localhost:3002/api/get/competitionIDGlobal/" + cardsData[index].title)
                .then(function(response){
                  console.log(response.data[0].competition_id);
                  const compID = response.data[0].competition_id;
                  sessionStorage.setItem('CompID', compID);
                  setTimeout(function () {
                    window.location.href = 'http://localhost:3000/player-portal-team';
                  }, 1000);
                });
      
      //console.log(cardsData[index].title);
      // Can use API route to join competition
      //Need to keep track of the competition_id
    }
    // Add your functionality for the button click here
  };

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
        <OverflowCard
          key={index}
          onClick={() => {
            handleCardClick(index);
          }}
          onButtonClick={() => {
            handleButtonClick(index);
          }}
          isRegistered={cardData.isRegistered}
          {...cardData}
        />
      ))}
    </div>
  );
}

const PlayerPortalCompetitions = (props) => {
  return (
    <div className="player-portal-competitions-container">
      <div
        data-role="Header"
        className="player-portal-competitions-navbar-container"
      >
        <div className="player-portal-competitions-navbar">
          <div className="player-portal-competitions-left-side">
            <img
              alt="image"
              src="https://play.teleporthq.io/static/svg/default-img.svg"
              className="player-portal-competitions-image"
            />
            <div
              data-role="BurgerMenu"
              className="player-portal-competitions-burger-menu"
            >
              <svg
                viewBox="0 0 1024 1024"
                className="player-portal-competitions-icon"
              >
                <path d="M128 256h768v86h-768v-86zM128 554v-84h768v84h-768zM128 768v-86h768v86h-768z"></path>
              </svg>
            </div>
            <div className="player-portal-competitions-links-container">
              <Link to="/player-portal-home" className="player-portal-competitions-link">
                HOME
              </Link>
              <Link to="/player-portal-competitions" className="player-portal-competitions-link1 Anchor">
                COMPETITIONS
              </Link>
              <Link to="/player-portal-team" className="player-portal-competitions-link2 Anchor">
                TEAM
              </Link>
              <Link to="/player-portal-contact" className="player-portal-competitions-link3 Anchor">
                CONTACT US
              </Link>
            </div>
          </div>
          <div className="player-portal-competitions-container1">
            <Link to="/player-portal-profile" className="player-portal-competitions-navlink">
              <svg
                viewBox="0 0 1024 1024"
                className="player-portal-competitions-icon2"
              >
                <path d="M576 706.612v-52.78c70.498-39.728 128-138.772 128-237.832 0-159.058 0-288-192-288s-192 128.942-192 288c0 99.060 57.502 198.104 128 237.832v52.78c-217.102 17.748-384 124.42-384 253.388h896c0-128.968-166.898-235.64-384-253.388z"></path>
              </svg>
            </Link>
          </div>
          <div
            data-role="MobileMenu"
            className="player-portal-competitions-mobile-menu"
          >
            <div className="player-portal-competitions-container2">
              <img
                alt="image"
                src="https://play.teleporthq.io/static/svg/default-img.svg"
                className="player-portal-competitions-image1"
              />
              <div
                data-role="CloseMobileMenu"
                className="player-portal-competitions-close-menu"
              >
                <svg
                  viewBox="0 0 1024 1024"
                  className="player-portal-competitions-icon4"
                >
                  <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                </svg>
              </div>
            </div>
            <div className="player-portal-competitions-links-container1">
              <Link to="/player-portal-home" className="player-portal-competitions-link">
                HOME
              </Link>
              <Link to="/player-portal-competitions" className="player-portal-competitions-link1 Anchor">
                COMPETITIONS
              </Link>
              <Link to="/player-portal-team" className="player-portal-competitions-link2 Anchor">
                TEAM
              </Link>
              <Link to="/player-portal-contact" className="player-portal-competitions-link3 Anchor">
                CONTACT US
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="player-portal-competitions-section-separator"></div>
      <div className="player-portal-competitions-section-separator1"></div>
      <div className="player-portal-competitions-section-separator2"></div>
      <div className="player-portal-competitions-section-separator3"></div>
      {/* The OverFlow cards, leave some space */}
      <br />
      <GenCards />
      <br />
    </div >
  )
}

export default PlayerPortalCompetitions
