import React from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
import { useState } from 'react';
import './arena-main.css'
//import tabs from "../components/tabs"
import BasicTabs from "../components/tabs"
import { PickerOverlay } from 'filestack-react';
import { sub } from 'date-fns';
import { ConstructionOutlined, ControlPointSharp } from '@mui/icons-material';
import { Tab } from '@mui/material';
import { da, hi } from 'date-fns/locale';


const competition_id = sessionStorage.getItem('CompID');
const user_id  = sessionStorage.getItem('userID');
let tabIndex = -1;
let latestSubmissionScores = [];
let newHighestSub = ""
let numTests = 0;

//Function to set the latest scores
function getLatestScores(){
    axios
            .get("http://localhost:3002/api/get/testcase_latest/" + competition_id + "/" + user_id)
            .then(function (response) {
                
                //They haveven't submitted yet
                if (response.data[0].testcase_latest == null){ 

                }

                //They have submitted
                else{
                    const latestString  = response.data[0].testcase_latest;
                    //console.log(response.data[0].testcase_latest);
                    const jsonArray = JSON.parse(latestString);

                    
                    let count = 0;
                    for (let key in jsonArray) {
                        latestSubmissionScores[count] = jsonArray[key];

                        count++
                    }

                    //console.log(latestSubmissionScores);

                }
            });
}
function getNumTestCases(){
    axios
            .get("http://localhost:3002/api/get/numTests/" + competition_id)
            .then(function (response) {
                numTests = response.data[0].no_testcases;
                //console.log("Number of testcase" + numTests);
            });
}

//! Generates a random score when the user submits
function generateRandomNumber () {
    const number = Math.floor(Math.random() * 100) + 1; // Generate a random number between 1 and 100
    return number
  };

//!Gets the teamID
function getTeamID (){
    axios
            .get("http://localhost:3002/api/get/team_name/" + competition_id + "/" + user_id)
            .then(function (response) {
                sessionStorage.setItem('teamName', response.data[0].team_name);
            });
}

//! Gets the testCases for the competition
function getCompTestCases(linkForPDF){
    axios
            .get("http://localhost:3002/api/get/compTestCases/" + competition_id)
            .then(function (response) {
                linkForPDF = response.data[0].competition_testcases;
                //console.log(linkForPDF)
            });
}

function ScoredHigher() {
    let isHigher = false;
    return new Promise((resolve, reject) => {
      axios.get("http://localhost:3002/api/get/testcase_highest/" + competition_id + "/" + user_id)
        .then(function (response) {
          if (response.data[0].testcase_highest == null) {
            console.log("haven't submitted yet")
            isHigher = true;
          } else {
            console.log("they have submitted before")
            const latestString = response.data[0].testcase_highest;
            const jsonArray = JSON.parse(latestString);
            let highestSub = [];
            let count = 0;
            for (let key in jsonArray) {
              highestSub[count] = jsonArray[key];
              count++
            }
            for (let i = 0; i < latestSubmissionScores.length; i++) {
              console.log(latestSubmissionScores[i] + " " + highestSub[i])
              if (latestSubmissionScores[i] > highestSub[i]) {
                //Change only the one that is higher
                highestSub[i] = latestSubmissionScores[i];
                isHigher = true;
              }
            }
            const obj = {};
            highestSub.map((value, index) => {
              obj[`testcase_${index + 1}`] = value;
            });
            const newHighestSub = JSON.stringify(obj);
            console.log(newHighestSub);
            resolve([isHigher, newHighestSub]); // Resolve the promise with both values
          }
        })
        .catch(reject);
    });
  }
  
  async function postHighestScore() {
    try {
      const [isHigher, newHighestSub] = await ScoredHigher();
      console.log(newHighestSub);
  
      if (isHigher) {
        const response = await axios.post("http://localhost:3002/api/post/highestScore/team", {
          team_name: sessionStorage.getItem('teamName'),
          testcase_highest: newHighestSub
        });
        return response;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }
  
  

async function uploadSubmissions(){
    //Make the JSON String thing
    //console.log(latestSubmissionScores);
    const obj = {};

    latestSubmissionScores.map((value, index) => {
    obj[`testcase_${index + 1}`] = value;
    });

    //Upload to submission history:
    axios
            .get("http://localhost:3002/api/get/testcase_prev/" + competition_id + "/" + user_id)
            .then(function (response) {
                console.log(response.data[0].testcase_prev)
                const data = JSON.parse(response.data[0].testcase_prev);
                const nextKey = Object.keys(data).length.toString();
                const updatedData = {...data, [nextKey]: obj};
                const updatedDataString = JSON.stringify(updatedData);
                console.log(updatedDataString);
                axios.post("http://localhost:3002/api/post/testcasePrev/team", {
                        team_name: sessionStorage.getItem('teamName'),
                        testcase_prev: updatedDataString
                });
            });

    const newSub = JSON.stringify(obj);
    //Upload to latest
    axios.post("http://localhost:3002/api/post/latestScore/team", {
        team_name: sessionStorage.getItem('teamName'),
        testcase_latest: newSub
  });

  //Check if greater, then upload to highest
  //console.log(ScoredHigher())
  await postHighestScore();

    //Upload to submission history

    

//     axios.post("http://localhost:3002/api/post/submission", {
//         submission_score: score,
//         submission_number: subNum,
//         submission_link: URL,
//         competition_id: competition_id,
//         team_name: sessionStorage.getItem('teamID')
//   });
}

const ArenaMain = (props) => {
    /* 
       ! NEED TO DO THE FOLLOWING:
       !Done
       1. Create the database for this:
          -submission number
          -competition id
          -team id
          -submission score
        (This way we can know which team has uploaded, for which competition and which submission)
        2. Create an api to get the submission history
        2.1 Figure out how to make the submission history go down :(
        3. Figure out how to organize that based on competition id so i don't have to get shouting from Sayf for making too many API calls
        !Done
        4. Create an API to add the link for the teams submission
        5. Create an api to send the highest score to the team_details table
        !DONE
        6. Get the competition info pdf thingy 
        !Kinda done, need to ask Sayf how to reload a compnent
        7. Generate a random score when the user uploads
  
    */
    const [pickerVisible, setPickerVisible] = useState(false);
    //const [no_testcases, setNoTests] = useState(0);

    // // get number of test cases
    // function numTestCases () {
    // axios.get("http://localhost:3002/api/get/numTests/" + competition_id)
    // .then(function (response) {
    //   setNoTests(response.data[0].no_testcases);
    // });
    // }
    
    // numTestCases();
    

    //This stores contents of tab, tab number and index in the array are related
    const [title, setTitle] = useState('');
    const [paragraph, setParagraph] = useState('');

    let linkForPDF =""
    
    //Executes when the page is loaded
    React.useEffect(() => {
        getNumTestCases(numTests);
        axios
            .get("http://localhost:3002/api/get/compDetails/" + competition_id)
            .then(function (response) {
                setTitle(response.data[0].competition_name);
                setParagraph(response.data[0].competition_info);
            });
            
            //Sets the link for the competition testcases
            getCompTestCases(linkForPDF);
            getTeamID();
            getLatestScores();
            
    });

    //latestSubmissionScores = latestSubmissionScores.slice(0,numTests);
    //console.log(latestSubmissionScores);

    //Sets the pickerVisible to false, so you can actually click it again
    const handleClosePicker = () => {
        setPickerVisible(false);
    };
    //Returns the url for the file uploaded
    const handleUploadDone = (res) => {
        //console.log(res.filesUploaded[0].url);
    };
    return (
        <div className="arena-main-container">
            <div data-role="Header" className="arena-main-navbar-container">
                <div className="arena-main-navbar">
                    <div className="arena-main-left-side">
                        <img
                            alt="image"
                            src="https://play.teleporthq.io/static/svg/default-img.svg"
                            className="arena-main-image"
                        />
                        <div
                            data-role="BurgerMenu"
                            className="arena-main-burger-menu"
                        >
                            <svg viewBox="0 0 1024 1024" className="arena-main-icon">
                                <path d="M128 256h768v86h-768v-86zM128 554v-84h768v84h-768zM128 768v-86h768v86h-768z"></path>
                            </svg>
                        </div>
                        <svg viewBox="0 0 1024 1024" className="arena-main-icon2">
                            <path d="M896 470v84h-604l152 154-60 60-256-256 256-256 60 60-152 154h604z"></path>
                        </svg>
                        <div className="arena-main-links-container">
                            <Link to="/arena-main" className="arena-main-link">
                                ARENA
                            </Link>
                            <Link to="/arena-submissions" className="arena-submissions-link">
                                SUBMISSIONS
                            </Link>
                            <Link
                                to="/arena-leaderboard"
                                className="arena-main-link1 Anchor"
                            >
                                lEADERBOARD
                            </Link>
                            <Link
                                to="/arena-team"
                                className="arena-main-link2 Anchor"
                            >
                                TEAM
                            </Link>
                        </div>
                    </div>
                    <div className="arena-main-container1">
                        <Link
                            to="/arena-profile"
                            className="arena-main-navlink"
                        >
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
                                <svg
                                    viewBox="0 0 1024 1024"
                                    className="arena-main-icon6"
                                >
                                    <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                                </svg>
                            </div>
                        </div>
                        <div className="arena-main-links-container1">
                            <span className="arena-main-link3 Anchor">Resources</span>
                            <span className="arena-main-link4 Anchor">
                                Inspiration
                            </span>
                            <span className="arena-main-link5 Anchor">Process</span>
                            <span className="arena-main-link6 Anchor">Our story</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="arena-main-section-separator"></div>
            <div className="arena-main-section-separator1"></div>
            <div className="arena-main-section-separator2"></div>
            <div className="arena-main-section-separator3"></div>
            <br />
            <h1>{title}</h1>
            <p>{paragraph}</p>
            <br />
            <a href={linkForPDF} download><u>Download PDF</u></a>
            <br />
            <br />
            <h1>Submit your code here:</h1>
            <div className="arena-main-tabs">
                <BasicTabs
                    tabContent={latestSubmissionScores}
                    tabCount={numTests}
                    onSubmit={(index) => {
                        setPickerVisible(true);
                        tabIndex = index+1;
                        //console.log(tabIndex);
                       
                    }}
                />
                {pickerVisible && (
                    <PickerOverlay
                        key="picker-overlay"
                        apikey={process.env.REACT_APP_API_KEY_FILESTACK}
                        onUploadDone={(res) => {
                            handleUploadDone(res);

                            //This sets the new score
                            latestSubmissionScores[tabIndex-1] = generateRandomNumber();
                            //console.log(latestSubmissionScores);
                            uploadSubmissions();
                            
                        }}
                        pickerOptions={{
                            onClose: () => {
                                handleClosePicker();
                            }
                        }}
                    />
                )}
            </div>
        </div>

    )
}

export default ArenaMain

  