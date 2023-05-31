import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from "react";
import TeamManager from '../components/team-manager'
import axios from "axios";
import './arena-team.css'
import Swal from 'sweetalert2'
import { is } from 'date-fns/locale';

const competition_id = sessionStorage.getItem('CompID');
const user_id = sessionStorage.getItem('userID');
let teamLocation = ""

// Function to copy a value to clipboard
const copyToClipboard = (value) => {
  const textarea = document.createElement('textarea'); // Create a textarea element
  textarea.value = value; // Set the value to the textarea
  document.body.appendChild(textarea); // Append the textarea to the body
  textarea.select(); // Select the textarea
  document.execCommand('copy'); // Copy the selected text to clipboard
  document.body.removeChild(textarea); // Remove the textarea from the body
};

const ArenaTeam = (props) => {
  const [title, setTitle] = useState("");
  const [teamName, setTeamName] = useState("");
  const [userNicknames, setUserNicknames] = useState([]);
  const [teamCode, setTeamCode] = useState("");
  //const [teamLocation, setTeamLocation] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the team name
        const teamNameResponse = await axios.get(`http://localhost:3002/api/get/teamName/${user_id}/${competition_id}`);
        const teamName = teamNameResponse.data[0].team_name;
  
        // Get the team location
        const teamLocationResponse = await axios.get(`http://localhost:3002/api/get/teamLocation/${teamName}/${competition_id}`);
         teamLocation = teamLocationResponse.data[0].team_location;
  
        // Get the team code
        const teamCodeResponse = await axios.get(`http://localhost:3002/api/get/teamCode/${teamName}/${competition_id}`);
        const teamCode = teamCodeResponse.data[0].team_code;
  
        // Get the competition details
        const compDetailsResponse = await axios.get(`http://localhost:3002/api/get/compDetails/${competition_id}`);
        const title = compDetailsResponse.data[0].competition_name;
  
        // Get the team members
        const teamMembersResponse = await axios.post('http://localhost:3002/api/get/teamMembers', null, {
          params: {
            user_id: user_id,
            competition_id: competition_id
          }
        });
        const data = teamMembersResponse.data;

        const updatedNicknames = data.map((member) => {
          let nickname = member.user_nickname;
          if (member.is_captain) {
            nickname += ' (Captain)';
          }
          return nickname;
        });

        setUserNicknames(updatedNicknames);
        
        // Update the state
        setTeamName(teamName);
        setTeamCode(teamCode);
        setTitle(title);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  
  return (
    <div className="arena-team-container">
      <div data-role="Header" className="arena-team-navbar-container">
      <div className="arena-main-navbar">
          <div className="arena-main-left-side">
            <div data-role="BurgerMenu" className="arena-main-burger-menu">
              <svg viewBox="0 0 1024 1024" className="arena-main-icon">
                <path d="M128 256h768v86h-768v-86zM128 554v-84h768v84h-768zM128 768v-86h768v86h-768z"></path>
              </svg>
            </div>
            <a href="https://youtu.be/dQw4w9WgXcQ" className="home-link">
                &lt;ProjectArena/&gt;
              </a>

            <div style={{paddingTop: "10px"}}>
              <Link to="/player-portal-competitions" className="arena-back-link">
                  <svg viewBox="0 0 1024 1024" className="arena-main-icon2">
                      <path d="M896 470v84h-604l152 154-60 60-256-256 256-256 60 60-152 154h604z"></path>
                  </svg>
              </Link>
            </div>
            <div className="arena-main-links-container">
              <Link to="/arena-main" className="arena-main-link">
                ARENA
              </Link>
              <Link to="/arena-submissions" className="arena-submissions-link">
                SUBMISSIONS
              </Link>
              <Link to="/arena-leaderboard" className="arena-main-link1 Anchor">
                lEADERBOARD
              </Link>
              <Link to="/arena-team" className="arena-main-link2 Anchor">
                TEAM
              </Link>
            </div>
          </div>
          <div className="arena-main-container1">
            <Link to="/arena-profile" className="arena-main-navlink">
              <svg viewBox="0 0 1024 1024" className="arena-main-icon4">
                <path d="M576 706.612v-52.78c70.498-39.728 128-138.772 128-237.832 0-159.058 0-288-192-288s-192 128.942-192 288c0 99.060 57.502 198.104 128 237.832v52.78c-217.102 17.748-384 124.42-384 253.388h896c0-128.968-166.898-235.64-384-253.388z"></path>
              </svg>
            </Link>
          </div>
          <div data-role="MobileMenu" className="arena-main-mobile-menu">
            <div className="arena-main-container2">
              <img
                alt="image"
                src="https://play.teleporthq.io/static/svg/default-img.svg"
                className="arena-main-image1"
              />
              <div
                data-role="CloseMobileMenu"
                className="arena-main-close-menu"
              >
                <svg viewBox="0 0 1024 1024" className="arena-main-icon6">
                  <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                </svg>
              </div>
            </div>
            <div className="arena-main-links-container1">
              <span className="arena-main-link3 Anchor">Resources</span>
              <span className="arena-main-link4 Anchor">Inspiration</span>
              <span className="arena-main-link5 Anchor">Process</span>
              <span className="arena-main-link6 Anchor">Our story</span>
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
      
      <TeamManager
        TeamName={teamName}
        teamMembers = {userNicknames}
        location = {teamLocation}
        onCopyClick={() => {
          Swal.fire({
            title: 'Team Code',
            text: "Team Code: " + teamCode,
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Copy'
            }).then((result) => {
            if (result.isConfirmed) {
              copyToClipboard(teamCode);
              
            }
          })
        }}
      />

    </div>

  )
}

export default ArenaTeam
