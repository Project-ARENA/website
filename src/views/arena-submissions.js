import React from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
import { useState, useEffect } from 'react';
import './arena-submissions.css'
import DataGrid from "../components/dataGridSubmissions";

const competition_id = sessionStorage.getItem('CompID');
const user_id  = sessionStorage.getItem('userID');
const team_code  = sessionStorage.getItem('teamCode');
let testcases = "";

function getTests() {
  return new Promise((resolve, reject) => {
    axios
    .get("http://localhost:3002/api/get/Testcases/" + competition_id)
    .then(function(response){
      testcases = response.data[0].testcases;
    });
    resolve(testcases);
  });
}

const ArenaSubmissions = (props) => {
  const [numTests, setNumTests] = useState(0);
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  useEffect(() => {

    const fetchData = async () => {
      await getTests();
    };
    fetchData();

    axios.get(`http://localhost:3002/api/get/numTests/${competition_id}`)
      .then(response => {
        setNumTests(response.data[0].no_testcases); 
      });
      
    axios.get(`http://localhost:3002/api/get/testcase_prev/${team_code}`)
    .then(response => {
      const historyJSON = JSON.parse(response.data[0].testcase_prev);
      const newData = Object.values(historyJSON).map(testcaseObj => {
        const testcaseData = [];
        for (let i = 1; i <= numTests; i++) {
          const testcaseValue = testcaseObj[`testcase_${i}`];
          testcaseData.push(testcaseValue === 0 ? '-' : testcaseValue);
        }
        return testcaseData;
      });
      setData(newData);
      // console.log(newData);
    });
    

    axios
    .get("http://localhost:3002/api/get/compDetails/" + competition_id)
    .then(function (response) {
      setTitle(response.data[0].competition_name);
      
    });
  
  }, [competition_id, user_id, numTests]);
  let testsArray = testcases.split(",");
  
  return (
    <div className="arena-submissions-container">
      <div data-role="Header" className="arena-submissions-navbar-container">
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
      <div className="arena-submissions-section-separator"></div>
      <div className="arena-submissions-section-separator1"></div>
      <div className="arena-submissions-section-separator2"></div>
      <div className="arena-submissions-section-separator3"></div>
      <br />
      <h1>{title}</h1>
      <h2>Submissions History</h2>
      <br/>
      <div>
      <DataGrid numColumns={numTests} testcases={testsArray} data={data} />
    </div>
    </div >
    
  )
}

export default ArenaSubmissions