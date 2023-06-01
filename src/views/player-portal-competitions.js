import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OverflowCard from "../components/OverflowCardPP";
const userID = sessionStorage.getItem("userID");
import "./player-portal-competitions.css";
import AccordionContent from "../components/collapse";
import Swal from "sweetalert2";

const GetDate = () => {
  return new Date();
  //console.log(CurrentTime);
};
let TeamStatus = "";

function getTeamDetails(user_id, comp_id) {
  axios
    .get("http://localhost:3002/api/get/teamCodeAlt/" + user_id + "/" + comp_id)
    .then(async function (response) {
      sessionStorage.setItem("teamCode", response.data[0].team_code);
      sessionStorage.setItem("teamName", response.data[0].team_name);
      const teamDetailsResponse = await axios.get(
        `http://localhost:3002/api/get/teamDetails/${response.data[0].team_code}`
      );
      TeamStatus = teamDetailsResponse.data[0].valid_team;
      sessionStorage.setItem("teamStatus", teamDetailsResponse.data[0].valid_team);
    });
}

function GenCards() {
  const [cardsData, setCardsData] = React.useState([]);
  const [isFlipped, setIsFlipped] = React.useState(false);
  const [activeData, setActiveData] = React.useState([]);
  const [inactiveData, setInactiveData] = React.useState([]);
  const [registeredData, setRegisteredData] = React.useState([]);

  const fetchCardData = () => {
    return axios
      .get("http://localhost:3002/api/get/competitions")
      .then((response) => {
        //console.log(response.data);
        const data = response.data.map((data) => ({
          competition_id: data.competition_id,
          title: data.competition_name,
          views: data.competition_views,
          image: data.competition_image,
          description: data.competition_info,
          startDate: data.competition_startdate,
          endDate: data.competition_enddate,
          registration_startdate: data.registration_startdate,
          registration_enddate: data.registration_enddate,
        }));
        return data;
      });
  };

  const fetchRegisterData = (userID, cardsData) => {
    return axios
      .get(`http://localhost:3002/api/get/competition/registered/${userID}`)
      .then((response) => {
        const registeredComps = response.data.map(
          (data) => data.competition_id
        );
        const newCardsData = cardsData.map((cardData) => {
          if (registeredComps.includes(cardData.competition_id)) {
            return {
              ...cardData,
              isRegistered: true,
            };
          }
          return {
            ...cardData,
            isRegistered: false,
          };
        });
        return newCardsData;
      });
  };

  const fetchActiveData = (cardsData) => {
    const newCardsData = [...cardsData];
    const now = GetDate();

    const activeCards = newCardsData.filter((card) => {
      const endDate = new Date(card.endDate);
      return endDate > now;
    });

    // Sort by end date
    activeCards.sort((a, b) => {
      const dateA = new Date(a.endDate);
      const dateB = new Date(b.endDate);
      return dateA - dateB;
    });

    // If the card is not between the start and end date, set the isDisabled property to true
    activeCards.forEach((card) => {
      const startDate = new Date(card.registration_startdate);
      const endDate = new Date(card.registration_enddate);
      if (now < startDate || now > endDate) {
        card.isDisabled = true;
      }
    });

    return activeCards;
  };

  const fetchInactiveData = (cardsData) => {
    const newCardsData = [...cardsData];
    const now = GetDate();

    const InactiveCards = newCardsData.filter((card) => {
      const endDate = new Date(card.endDate);
      return endDate <= now;
    });

    // Sort by start date
    InactiveCards.sort((a, b) => {
      const dateA = new Date(a.endDate);
      const dateB = new Date(b.endDate);
      return dateB - dateA;
    });

    // Set the isInactive property to true
    InactiveCards.forEach((card) => {
      card.isInactive = true;
    });

    return InactiveCards;
  };

  const fetchOnlyRegisteredData = (cardsData) => {
    const newCardsData = [...cardsData];

    const registeredCards = newCardsData.filter((card) => {
      return card.isRegistered;
    });

    // Sort by end date
    registeredCards.sort((a, b) => {
      const dateA = new Date(a.endDate);
      const dateB = new Date(b.endDate);
      return dateA - dateB;
    });

    return registeredCards;
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCardData();
        const newCardsData = await fetchRegisterData(userID, data);
        const activeData = await fetchActiveData(newCardsData);
        const inactiveData = await fetchInactiveData(newCardsData);
        const registeredData = await fetchOnlyRegisteredData(activeData);
        setCardsData(newCardsData);
        setActiveData(activeData);
        setInactiveData(inactiveData);
        setRegisteredData(registeredData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  //views of card
  const handleCardClick = async (competition_id) => {
    setIsFlipped(true);

    if (isFlipped) {
      try {
        const response = axios.post(
          "http://localhost:3002/api/post/competition/incViews",
          { competition_id }
        );

        const newCardsData = cardsData.map((cardData) => {
          if (cardData.competition_id === competition_id) {
            return {
              ...cardData,
              views: cardData.views + 1,
            };
          }
          return cardData;
        });
        setCardsData(newCardsData);
        setActiveData(fetchActiveData(newCardsData));
        setInactiveData(fetchInactiveData(newCardsData));

        // Remove all inactive cards from newCardsData and cards greater than today's date
        const newCardsData2 = newCardsData.filter((card) => {
          const endDate = new Date(card.endDate);
          return endDate > GetDate();
        });

        setRegisteredData(fetchOnlyRegisteredData(newCardsData2));

        console.log(response);
        setIsFlipped(false);
      } catch (error) {
        console.error(error);
      }
    }
  };
  const handleButton1Click = async (competition_id) => {
    // Check if the card is registered or not
    const cardData = cardsData.find(
      (cardData) => cardData.competition_id === competition_id
    );
    try {
      const response = await axios.get(
        "http://localhost:3002/api/get/competitionIDGlobal/" + cardData.title
      );

      // console.log(response.data[0].competition_id);
      const compID = response.data[0].competition_id;
      sessionStorage.setItem("CompID", compID);
      setTimeout(function () {
        window.location.href = "http://localhost:3000/player-portal-team";
      }, 1000);

      // Can use API route to join competition
      // Need to keep track of the competition_id
      const newCardsData = cardsData.map((cardData) => {
        if (cardData.competition_id === competition_id) {
          return {
            ...cardData,
            isRegistered: true,
          };
        }
        return cardData;
      });
      setCardsData(newCardsData);
    } catch (error) {
      console.error(error);
    }
  };

  // Handles "Enter Arena" button click
  const handleButton2Click = (competition_id, comp_startDate) => {
    const compID = competition_id;
    sessionStorage.setItem("CompID", compID);
    getTeamDetails(userID, compID);
    //get team status
    const TeamStatus = sessionStorage.getItem("teamStatus");
    // console.log("team: ",TeamStatus);

    //Get Current date
    var today = new Date();
    console.log(today);

    //Get start date of competition
    // Check if competition has started
    console.log(comp_startDate);
    var startDate = new Date(comp_startDate);
    console.log(startDate);
    
    if (today < startDate) {
      Swal.fire({
        title:
          "Competition has not started, you will be redirected to the teams page until the competition starts.",
        icon: "warning",
        showConfirmButton: false,
        timer: 3000, // Display for 3 seconds
        timerProgressBar: true,
      });

      setTimeout(() => {
        // Redirect to login page after a delay
        window.location.href = "http://localhost:3000/teams";
      }, 3000); // Delay duration in milliseconds

      // alert(startDate);
    } else 
    if (TeamStatus === "0" || TeamStatus === "") {
      Swal.fire({
        title:
          "You do not have a valid team, you will be redirected to the teams page until you have a valid team.",
        icon: "warning",
        showConfirmButton: false,
        timer: 3000, // Display for 3 seconds
        timerProgressBar: true,
      });

      setTimeout(() => {
        // Redirect to login page after a delay
        window.location.href = "http://localhost:3000/teams";
      }, 3000); // Delay duration in milliseconds
    } else {
      setTimeout(function () {
        window.location.href = "http://localhost:3000/arena-main";
      }, 1000);
    }
    // console.log(`Enter Arena clicked for competition ${competition_id}`);
  };

  const handleButton3Click = (competition_id) => {
    const compID = competition_id;
    sessionStorage.setItem("CompID", compID);
    getTeamDetails(userID, compID);

    setTimeout(function () {
      window.location.href = "http://localhost:3000/leaderboard";
    }, 1000);
    // console.log(`Enter Arena clicked for competition ${competition_id}`);
  };

  const username = sessionStorage.getItem("username");

  // Get user details from database, to make displaying it easier
  const getUserDetails = () => {
    axios
      .get("http://localhost:3002/api/get/userDetails/" + username)
      .then(function (response) {
        sessionStorage.setItem("userID", response.data[0].user_id);
        sessionStorage.setItem("useremail", response.data[0].user_email);
        sessionStorage.setItem("userpassword", response.data[0].user_password);
      });
  };

  window.onload = getUserDetails();

  function getActiveCards() {
    return (
      <div
        data-testid="card"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          maxWidth: "1024px",
          margin: "0 auto",
          justifyContent: "center",
        }}
      >
        {activeData.map((activeData) => {
          if (!activeData.isRegistered) {
            return (
              <OverflowCard
                key={activeData.competition_id}
                onClick={() => {
                  handleCardClick(activeData.competition_id);
                }}
                onButton1Click={() => {
                  handleButton1Click(activeData.competition_id);
                }}
                onButton2Click={() => {
                  handleButton2Click(
                    activeData.competition_id,
                    activeData.startDate
                  );
                }}
                onButton3Click={() => {
                  handleButton3Click(activeData.competition_id);
                }}
                isRegistered={activeData.isRegistered}
                {...activeData}
              />
            );
          }
          return null;
        })}
      </div>
    );
  }

  function getInactiveCards() {
    return (
      <div
        data-testid="card"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          maxWidth: "1024px",
          margin: "0 auto",
          justifyContent: "center",
        }}
      >
        {inactiveData.map((inactiveData) => (
          <OverflowCard
            key={inactiveData.competition_id}
            onClick={() => {
              handleCardClick(inactiveData.competition_id);
            }}
            onButton1Click={() => {
              handleButton1Click(inactiveData.competition_id);
            }}
            onButton2Click={() => {
              handleButton2Click(
                inactiveData.competition_id,
                inactiveData.startDate
              );
            }}
            onButton3Click={() => {
              handleButton3Click(inactiveData.competition_id);
            }}
            isRegistered={inactiveData.isRegistered}
            {...inactiveData}
            isDisabled={true}
          />
        ))}
      </div>
    );
  }

  function getRegisteredCards() {
    return (
      <div
        data-testid="card"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          maxWidth: "1024px",
          margin: "0 auto",
          justifyContent: "center",
        }}
      >
        {registeredData.map((registeredData) => (
          <OverflowCard
            key={registeredData.competition_id}
            onClick={() => {
              handleCardClick(registeredData.competition_id);
            }}
            onButton1Click={() => {
              handleButton1Click(registeredData.competition_id);
            }}
            onButton2Click={() => {
              handleButton2Click(
                registeredData.competition_id,
                registeredData.startDate
              );
            }}
            onButton3Click={() => {
              handleButton3Click(registeredData.competition_id);
            }}
            isRegistered={registeredData.isRegistered}
            {...registeredData}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      data-testid="card"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        maxWidth: "1024px",
        margin: "0 auto",
        justifyContent: "center",
      }}
    >
      <AccordionContent
        title="Your Registered Competitions"
        content={getRegisteredCards()}
      />

      <AccordionContent
        title="Available Competitions"
        content={getActiveCards()}
      />

      <AccordionContent
        title="Past Competitions"
        content={getInactiveCards()}
      />
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
            <Link to="/player-portal-competitions" className="home-link">
              &lt;ProjectArena/&gt;
            </Link>
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
              <Link
                to="/player-portal-competitions"
                className="player-portal-competitions-link1 Anchor"
              >
                COMPETITIONS
              </Link>
            </div>
          </div>
          <div className="player-portal-competitions-container1">
            <Link
              to="/player-portal-profile"
              className="player-portal-competitions-navlink"
            >
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
              <Link
                to="/player-portal-competitions"
                className="player-portal-competitions-link1 Anchor"
              >
                COMPETITIONS
              </Link>
              <Link
                to="/player-portal-team"
                className="player-portal-competitions-link2 Anchor"
              >
                TEAM
              </Link>
              <Link
                to="/player-portal-contact"
                className="player-portal-competitions-link3 Anchor"
              >
                CONTACT US
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* The OverFlow cards, leave some space */}
      <br />
      <GenCards />
      <br />
    </div>
  );
};

export default PlayerPortalCompetitions;
