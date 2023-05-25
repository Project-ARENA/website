import React from 'react'
import { Link } from 'react-router-dom'
import DataGrid from "../components/datagridArenaLeaderboard";
import axios from "axios";
import './arena-leaderboard.css'
import { useEffect, useState } from 'react';

const competition_id = sessionStorage.getItem('CompID');
const teamName = sessionStorage.getItem('teamName');
let noTests = 0;
let testcases = "";
let testsArray = [];

// gets number test cases and team name to generate table
async function getNoTests() {
  return new Promise((resolve, reject) => {
    axios
    .get("http://localhost:3002/api/get/Testcases/" + competition_id)
    .then(function(response){
      testcases = response.data[0].testcases;
      noTests = testcases.split(",").length;
      // console.log(testcases);
      // console.log(noTests);
    });
    resolve([noTests, testcases]);
  });
}

// used to generate the table with correct data
function GenGrid(params) {
  const [rows, setData] = React.useState(Array(noTests).fill(null));
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    axios
      .get("http://localhost:3002/api/get/leaderboard/" + params.compID)
      .then((response) => {
        const data = response.data.map((data, index) => {
          const newData = {
            id: index + 1,
            team_rank: index + 1,
            team_name: data.team_name,
            team_location: data.team_location ? data.team_location : "",
            team_score: 0
          };
          let sum = 0;
          // Iterate through the key-value pairs of testcase_highest
          for (const [key, value] of Object.entries(JSON.parse(data.testcase_highest))) {
            // Dynamically create fields with key as field name and value as field value
            newData[key] = value === 0 ? '-' : value;
            sum += value;
          }
          newData.team_score = sum;
          return newData;
        });
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [params.compID]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <DataGrid rows={rows} noTests={params.no} testcases={params.tests} myTeam={params.team} pageSize={50} />;
}

const ArenaLeaderboard = (props) => {

  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      await getNoTests();
    };

    fetchData();

    axios
      .get("http://localhost:3002/api/get/compDetails/" + competition_id)
      .then(function (response) {
        setTitle(response.data[0].competition_name);
      });
  });

  testsArray = testcases.split(",");

  return (
    <div className="arena-leaderboard-container">
      <div data-role="Header" className="arena-leaderboard-navbar-container">
        <div className="arena-leaderboard-navbar">
          <div className="arena-leaderboard-left-side">
            <Link to="/player-portal-competitions" className="home-link">
                &lt;ProjectArena/&gt;
            </Link>
            <div
              data-role="BurgerMenu"
              className="arena-leaderboard-burger-menu"
              style={{paddingTop: "40px"}}
            >
              <svg viewBox="0 0 1024 1024" className="arena-leaderboard-icon">
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
          </div>
          <div className="arena-leaderboard-container1">
            <Link
              to="/arena-profile"
              className="arena-leaderboard-navlink"
            >
              <svg viewBox="0 0 1024 1024" className="arena-leaderboard-icon4">
                <path d="M576 706.612v-52.78c70.498-39.728 128-138.772 128-237.832 0-159.058 0-288-192-288s-192 128.942-192 288c0 99.060 57.502 198.104 128 237.832v52.78c-217.102 17.748-384 124.42-384 253.388h896c0-128.968-166.898-235.64-384-253.388z"></path>
              </svg>
            </Link>
          </div>
          <div data-role="MobileMenu" className="arena-leaderboard-mobile-menu">
            <div className="arena-leaderboard-container2">
              <img
                alt="image"
                src="https://play.teleporthq.io/static/svg/default-img.svg"
                className="arena-leaderboard-image1"
              />
              <div
                data-role="CloseMobileMenu"
                className="arena-leaderboard-close-menu"
              >
                <svg
                  viewBox="0 0 1024 1024"
                  className="arena-leaderboard-icon6"
                >
                  <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <h1>{title}</h1>
      <h2>Leaderboard</h2>
      <br/>
      <div className="grid-container">
        <GenGrid no={noTests} tests = {testsArray} team={teamName} compID={competition_id}/>
      </div>
    </div>
  )
}

export default ArenaLeaderboard
