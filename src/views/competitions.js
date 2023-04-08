import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import OverflowCard from "../components/OverflowCard";
import "./competitions.css";
import AccordionContent from "../components/collapse";



const GetDate= ()=>{
  return new Date();
  //console.log(CurrentTime);
}

//Differentiate between 2 dates
const GetDateDifference = (date1, date2) => {
  const Difference_In_Time = date2.getTime() - date1.getTime();
  const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  if(Difference_In_Days > 0) {
    return true; // competition is active
  } else {
    return false; // competition is not active
  }
};

//DISPLAY ACTIVE CARDS
function GenCards() {
  const [cardsData, setCardsData] = React.useState([]);
  const [isFlipped, setIsFlipped] = React.useState(false);

  const fetchCardData = () => {
    return axios
      .get("http://localhost:3002/api/get/competitions")
      .then((response) => {
        console.log(response.data);
        const data = response.data.map((data) => ({
          title: data.competition_name,
          views: data.competition_views,
          image: data.competition_image,
          description: data.competition_info,
          endDate: data.competition_enddate,
        }));
        return data;
      });
  };

  // const fetchActiveData = (cardsData) => {
  //   const CompsendDates = cardsData.map((data) => data.endDate);
  //   const newCardsData = [...cardsData];
  //   for (let i = 0; i < newCardsData.length; i++) {
  //     const sdate = GetDateDifference(new Date(CompsendDates[i]), GetDate());
  //     console.log(sdate);
  //     if (GetDateDifference(new Date(CompsendDates[i]), GetDate())) {
  //       newCardsData[i].isendDate = true;
  //     } else {
  //       newCardsData[i].isendDate = false;
  //     }
  //   }
    
  //   console.log(CompsendDates);
  //   console.log(newCardsData);
  //   return newCardsData;
  // };

  const fetchActiveData = (cardsData) => {
    const newCardsData = [...cardsData];
    const now = GetDate();
  
    const activeCards = newCardsData.filter((card) => {
      const endDate = new Date(card.endDate);
      return endDate > now;
    });
  
    return activeCards;
  };

  React.useEffect(() => {
    fetchCardData()
      .then((data) => fetchActiveData(data))
      .then((newCardsData) => {
        setCardsData(newCardsData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // React.useEffect(() => {
  //   axios
  //     .get("http://localhost:3002/api/get/competitions")
  //     .then((response) => {
  //       const data = response.data.map((data) => ({
  //         title: data.competition_name,
  //         views: data.competition_views,
  //         image: data.competition_image,
  //         description: data.competition_info,
  //         endDate: data.competition_enddate,
  //       }));
  //       setCardsData(data);
  //     });
  // }, []);

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
          {...cardData}
        />
      ))}
    </div>
  );
}


//DISPLAY INACTIVE CARDS
function InActiveGenCards() {
  const [cardsData, setCardsData] = React.useState([]);
  const [isFlipped, setIsFlipped] = React.useState(false);

  const fetchCardData = () => {
    return axios
      .get("http://localhost:3002/api/get/competitions")
      .then((response) => {
        console.log(response.data);
        const data = response.data.map((data) => ({
          title: data.competition_name,
          views: data.competition_views,
          image: data.competition_image,
          description: data.competition_info,
          endDate: data.competition_enddate,
        }));
        return data;
      });
  };

  const fetchInactiveData = (cardsData) => {
    const newCardsData = [...cardsData];
    const now = GetDate();
  
    const activeCards = newCardsData.filter((card) => {
      const endDate = new Date(card.endDate);
      return endDate <= now;
    });
  
    return activeCards;
  };

  React.useEffect(() => {
    fetchCardData()
      .then((data) => fetchInactiveData(data))
      .then((newCardsData) => {
        setCardsData(newCardsData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
          {...cardData}
        />
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
              <Link to="/about" className="contact-link3 Anchor">
                ABOUT
              </Link>
            </div>
          </div>
          <div className="competitions-right-side">
            <Link to="/login" className="competitions-cta-btn button">
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
              <Link to="/" className="home-link">
                HOME
              </Link>
              <Link to="/competitions" className="home-link1 Anchor">
                COMPETITIONS
              </Link>
              <Link to="/contact" className="home-link2 Anchor">
                CONTACT
              </Link>
              <Link to="/about" className="contact-link3 Anchor">
                ABOUT
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="competitions-section-separator"></div>
      <div className="competitions-section-separator1"></div>
      <div className="competitions-section-separator2"></div>
      <div className="competitions-section-separator3"></div>



      <AccordionContent title="Active Competition" content = <GenCards /> />
      <AccordionContent title="Inactive Competition" content = <InActiveGenCards /> />
      {/* The OverFlow cards, leave some space */}
      <br />
      {/* <GenCards /> */}
      <br />
    </div>
  );
};

export default Competitions;
