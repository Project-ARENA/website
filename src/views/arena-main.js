import React from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
import { useState } from 'react';
import './arena-main.css'
//import tabs from "../components/tabs"
import BasicTabs from "../components/tabs"
import { PickerOverlay } from 'filestack-react';


const competition_id = sessionStorage.getItem('CompID');

//! Generates a random score when the user submits
function generateRandomNumber () {
    const number = Math.floor(Math.random() * 100) + 1; // Generate a random number between 1 and 100
    return number
  };

//! Gets the testCases for the competition
function getCompTestCases(linkForPDF){
    axios
            .get("http://localhost:3002/api/get/compTestCases/" + competition_id)
            .then(function (response) {
                linkForPDF = response.data[0].competition_testcases;

                console.log(linkForPDF)
            });
}


const ArenaMain = (props) => {
    /* 
       ! NEED TO DO THE FOLLOWING:
       1. Create the database for this:
          -submission number
          -competition id
          -team id
          -submission score
        (This way we can know which team has uploaded, for which competition and which submission)
        2. Create an api to get the submission history
        2.1 Figure out how to make the submission history go down :(
        3. Figure out how to organize that based on competition id so i don't have to get shouting from Sayf for making too many API calls
        4. Create an API to add the link for the teams submission
        5. Create an api to send the highest score to the team_details table
        !DONE
        6. Get the competition info pdf thingy 
        !Kinda done, need to ask Sayf how to reload a compnent
        7. Generate a random score when the user uploads
  
    */
    const [pickerVisible, setPickerVisible] = useState(false);
    const maintring = "Submission 1: 10\nSubmission 2: 1021\nSubmission 3: 102";

    //This stores contents of tab, tab number and index in the array are related

    let tabContent = [];
    const [title, setTitle] = useState('');
    const [paragraph, setParagraph] = useState('');
    let tabIndex = -1;
    let linkForPDF =""
    let scoreRandom = 0;

    //Executes when the page is loaded
    React.useEffect(() => {
        axios
            .get("http://localhost:3002/api/get/compDetails/" + competition_id)
            .then(function (response) {
                setTitle(response.data[0].competition_name);
                setParagraph(response.data[0].competition_info);
            });
            
            //Sets the link for the competition testcases
            getCompTestCases(linkForPDF);
    });


    //Sets the pickerVisible to false, so you can actually click it again
    const handleClosePicker = () => {
        setPickerVisible(false);
    };
    //Returns the url for the file uploaded
    const handleUploadDone = (res) => {
        console.log(res.filesUploaded[0].url);
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
                    tabContent={tabContent}
                    tabCount={6}
                    onSubmit={(index) => {
                        setPickerVisible(true);
                        tabIndex = index;
                    }}
                />
                {pickerVisible && (
                    <PickerOverlay
                        key="picker-overlay"
                        apikey={process.env.REACT_APP_API_KEY_FILESTACK}
                        onUploadDone={(res) => {
                            handleUploadDone(res);
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

  