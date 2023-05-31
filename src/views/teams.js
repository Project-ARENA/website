import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from "react";
import TeamManager from '../components/team-manager'
import axios from "axios";
import './teams.css'
import Swal from 'sweetalert2'


const competition_id = sessionStorage.getItem('CompID');
const user_id = sessionStorage.getItem('userID');
const team_code = sessionStorage.getItem('teamCode');
let teamLocation = "Getting Information..."
let TeamStatus = ""
let TeamStatusMessage = "Getting Information..."
let ColorStatus = "black"
let startDate = ""
let nicknames = []

// Function to copy a value to clipboard
const copyToClipboard = (value) => {
  const textarea = document.createElement('textarea'); // Create a textarea element
  textarea.value = value; // Set the value to the textarea
  document.body.appendChild(textarea); // Append the textarea to the body
  textarea.select(); // Select the textarea
  document.execCommand('copy'); // Copy the selected text to clipboard
  document.body.removeChild(textarea); // Remove the textarea from the body
};

const Teams = (props) => {
  const [title, setTitle] = useState("");
  const [teamName, setTeamName] = useState("");
  const [userNicknames, setUserNicknames] = useState([]);
  const [teamCode, setTeamCode] = useState("");
  const [loading, setLoading] = React.useState(true);
  const [timeRemaining , setTimeRemaining] = useState("");
  //const [teamLocation, setTeamLocation] = useState("");


  useEffect(() => {

    const fetchData = async () => {
      try {
        //Get team details
        const teamDetailsResponse = await axios.get(`http://localhost:3002/api/get/teamDetails/${team_code}`);
        const teamName = teamDetailsResponse.data[0].team_name;
        teamLocation = teamDetailsResponse.data[0].team_location;
        TeamStatus = teamDetailsResponse.data[0].valid_team;


        // // Get the team name
        // const teamNameResponse = await axios.get(`http://localhost:3002/api/get/teamName/${user_id}/${competition_id}`);
        // const teamName = teamNameResponse.data[0].team_name;
  
        // // Get the team location
        // const teamLocationResponse = await axios.get(`http://localhost:3002/api/get/teamLocation/${teamName}/${competition_id}`);
        //  teamLocation = teamLocationResponse.data[0].team_location;
  
        // // Get the team code
        // const teamCodeResponse = await axios.get(`http://localhost:3002/api/get/teamCode/${teamName}/${competition_id}`);
        // const teamCode = teamCodeResponse.data[0].team_code;
  
        // Get the competition details
        const compDetailsResponse = await axios.get(`http://localhost:3002/api/get/compDetails/${competition_id}`);
        const title = compDetailsResponse.data[0].competition_name;
        startDate = compDetailsResponse.data[0].competition_startdate;
  
        // Get the team members
        const teamMembersResponse = await axios.post('http://localhost:3002/api/get/teamMembers', null, {
          params: {
            user_id: user_id,
            competition_id: competition_id
          }
        });
        const data = teamMembersResponse.data;

        nicknames = data.map((member) => {
          let nickname = member.user_nickname;
          if (member.is_captain) {
            nickname += ' (Captain)';
          }
          return nickname;
        });

        setUserNicknames(nicknames);

        // // Get the Team Status
        // const teamStatusResponse = await axios.get(`http://localhost:3002/api/get/teamStatus/${teamName}/${competition_id}`);
        // TeamStatus = teamStatusResponse.data[0].valid_team;
        // Update the state
        setTeamName(teamName);
        // setTeamCode(teamCode);
        setTitle(title);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();

        // Simulating an asynchronous API call
        setTimeout(() => {
          setLoading(false);
        }, 2000);

        if (loading) {
          return <div>Loading...</div>;
        }

  }, []);

  const interval = setInterval(() => {
    const targetDate = new Date(startDate);
    const currentDate = new Date();

    const timeDifference = targetDate.getTime() - currentDate.getTime();

    // Calculate remaining days, hours, minutes, and seconds
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);

    setTimeRemaining(`Competition starts in: ${days}d ${hours}h ${minutes}m ${seconds}s`);

    

    //Check if Valid Team
    //If the seconds remaining is less than 0, then the competition starts
    if ((seconds < 0) && (TeamStatus == 1)) {
      setTimeRemaining("Competition has starts");
      //Relocate the user to the competition page
      window.location.href = "http://localhost:3000/arena-main";
    }

  }, 1000); //1000ms = 1 sec
  
  // const interval2 = setInterval(async () => {
  //   try {
  //     // Get the team members
  //     const teamMembersResponse = await axios.post('http://localhost:3002/api/get/teamMembers', null, {
  //       params: {
  //         user_id: user_id,
  //         competition_id: competition_id
  //       }
  //     });
  //     const data = teamMembersResponse.data;
  
  //     const updatedNicknames = data.map((member) => {
  //       let nickname = member.user_nickname;
  //       if (member.is_captain) {
  //         nickname += ' (Captain)';
  //       }
  //       return nickname;
  //     });
  //     //Check if the nicknames have changed
  //     // if (nicknames != updatedNicknames) {
  //     //   setUserNicknames(updatedNicknames);
  //     //   console.log("Nicknames have changed");
  //     // }

      
  //   } catch (error) {
  //     // Handle any errors that occur during the API request
  //     console.error('Error occurred during API request:', error);
  //   }
  // }, 10000);
  

  if (TeamStatus === 1){
    ColorStatus = "green"
    TeamStatusMessage = "Team is Valid"
  }
  else if (TeamStatus === 0)
  {
    ColorStatus = "red"
    TeamStatusMessage = "Team is Invalid"
  }
  else if (TeamStatus === "")
  {
    ColorStatus = "red"
    TeamStatusMessage = "Team is Invalid"
  }
  
  return (
    <div className="arena-team-container">
      <div data-role="Header" className="arena-team-navbar-container">
        <div className="arena-team-navbar">
          <div className="arena-team-left-side">
          <a href="https://youtu.be/dQw4w9WgXcQ" className="home-link">
                &lt;ProjectArena/&gt;
              </a>
            <div data-role="BurgerMenu" className="arena-team-burger-menu">
              <svg viewBox="0 0 1024 1024" className="arena-team-icon">
                <path d="M128 256h768v86h-768v-86zM128 554v-84h768v84h-768zM128 768v-86h768v86h-768z"></path>
              </svg>
            </div>
            <div style={{paddingTop: "10px"}}>
              <Link to="/player-portal-competitions" className="arena-back-link">
                  <svg viewBox="0 0 1024 1024" className="arena-main-icon2">
                      <path d="M896 470v84h-604l152 154-60 60-256-256 256-256 60 60-152 154h604z"></path>
                  </svg>
              </Link>
            </div>
            <div className="arena-team-links-container">
              <Link
                to="/arena-team"
                className="arena-team-link2 Anchor"
              >
                TEAM
              </Link>
            </div>
          </div>
          <div className="arena-team-container1">
            <Link to="/player-portal-profile" className="arena-team-navlink">
              <svg viewBox="0 0 1024 1024" className="arena-team-icon4">
                <path d="M576 706.612v-52.78c70.498-39.728 128-138.772 128-237.832 0-159.058 0-288-192-288s-192 128.942-192 288c0 99.060 57.502 198.104 128 237.832v52.78c-217.102 17.748-384 124.42-384 253.388h896c0-128.968-166.898-235.64-384-253.388z"></path>
              </svg>
            </Link>
          </div>
          <div data-role="MobileMenu" className="arena-team-mobile-menu">
            <div className="arena-team-container2">
              <img
                alt="image"
                src="https://play.teleporthq.io/static/svg/default-img.svg"
                className="arena-team-image1"
              />
              <div
                data-role="CloseMobileMenu"
                className="arena-team-close-menu"
              >
                <svg viewBox="0 0 1024 1024" className="arena-team-icon6">
                  <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                </svg>
              </div>
            </div>
            <div className="arena-team-links-container1">
              <span className="arena-team-link3 Anchor">Resources</span>
              <span className="arena-team-link4 Anchor">Inspiration</span>
              <span className="arena-team-link5 Anchor">Process</span>
              <span className="arena-team-link6 Anchor">Our story</span>
            </div>
          </div>
        </div>
      </div>
      <div className="arena-team-section-separator"></div>
      <div className="arena-team-section-separator1"></div>
      <div className="arena-team-section-separator2"></div>
      <div className="arena-team-section-separator3"></div>
      <br/>
      <h1>{title}</h1>
      <h2>Team Manager</h2>

      <h3 style={{color:ColorStatus}}>Teams Status: {TeamStatusMessage}</h3>
      <h4>{timeRemaining}</h4>
      
      <TeamManager
        TeamName={teamName}
        teamMembers = {userNicknames}
        location = {teamLocation}
        onCopyClick={() => {
          Swal.fire({
            title: 'Team created!',
            text: "Team Code: " + team_code,
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Copy'
            }).then((result) => {
            if (result.isConfirmed) {
              copyToClipboard(team_code);
              
            }
          })
        }}
      />

    </div>

  )
}

export default Teams
