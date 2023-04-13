import React from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
import { useState } from 'react';
import './arena-submissions.css'
//import tabs from "../components/tabs"
import BasicTabs from "../components/tabs"
import { PickerOverlay } from 'filestack-react';

const competition_id = sessionStorage.getItem('CompID');

// function onSubmit(index){
//   console.log("it works?", index+1);
//   setPickerVisible(true);
// }


const ArenaSubmissions = (props) => {
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
      6. Get the competition info pdf thingy

  */
  const [pickerVisible, setPickerVisible] = useState(false);
  const submissionString = "Submission 1: 10\nSubmission 2: 1021\nSubmission 3: 102";

  //This stores contents of tab, tab number and index in the array are related
  
  const tabContent = [
    //Bruh this thing so complicated
    <div key={0}>{submissionString.split("\n").map((line, index) => <div key={index}>{line}</div>)}</div>,
    'Content for Submission 2',
    'Content for Submission 3',
    'Content for Submission 4',
    'Content for Submission 5',
    'Content for Submission 6',
  ];
  
  
  const [title, setTitle] = useState('');
  const [paragraph, setParagraph] = useState('');

  //Executes when the page is loaded
  React.useEffect(() => {
    axios
      .get("http://localhost:3002/api/get/compDetails/" + competition_id)
      .then(function (response) {
        setTitle(response.data[0].competition_name);
        setParagraph(response.data[0].competition_info);
      });
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
    <div className="arena-submissions-container">
      <div data-role="Header" className="arena-submissions-navbar-container">
        <div className="arena-submissions-navbar">
          <div className="arena-submissions-left-side">
            <img
              alt="image"
              src="https://play.teleporthq.io/static/svg/default-img.svg"
              className="arena-submissions-image"
            />
            <div
              data-role="BurgerMenu"
              className="arena-submissions-burger-menu"
            >
              <svg viewBox="0 0 1024 1024" className="arena-submissions-icon">
                <path d="M128 256h768v86h-768v-86zM128 554v-84h768v84h-768zM128 768v-86h768v86h-768z"></path>
              </svg>
            </div>
            <svg viewBox="0 0 1024 1024" className="arena-submissions-icon2">
              <path d="M896 470v84h-604l152 154-60 60-256-256 256-256 60 60-152 154h604z"></path>
            </svg>
            <div className="arena-submissions-links-container">
              <Link to="/arena-submissions" className="arena-submissions-link">
                Submissions
              </Link>
              <Link
                to="/arena-leaderboard"
                className="arena-submissions-link1 Anchor"
              >
                lEADERBOARD
              </Link>
              <Link
                to="/arena-team"
                className="arena-submissions-link2 Anchor"
              >
                TEAM
              </Link>
            </div>
          </div>
          <div className="arena-submissions-container1">
            <Link
              to="/arena-profile"
              className="arena-submissions-navlink"
            >
              <svg viewBox="0 0 1024 1024" className="arena-submissions-icon4">
                <path d="M576 706.612v-52.78c70.498-39.728 128-138.772 128-237.832 0-159.058 0-288-192-288s-192 128.942-192 288c0 99.060 57.502 198.104 128 237.832v52.78c-217.102 17.748-384 124.42-384 253.388h896c0-128.968-166.898-235.64-384-253.388z"></path>
              </svg>
            </Link>
          </div>
          <div data-role="MobileMenu" className="arena-submissions-mobile-menu">
            <div className="arena-submissions-container2">
              <img
                alt="image"
                src="https://play.teleporthq.io/static/svg/default-img.svg"
                className="arena-submissions-image1"
              />
              <div
                data-role="CloseMobileMenu"
                className="arena-submissions-close-menu"
              >
                <svg
                  viewBox="0 0 1024 1024"
                  className="arena-submissions-icon6"
                >
                  <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                </svg>
              </div>
            </div>
            <div className="arena-submissions-links-container1">
              <span className="arena-submissions-link3 Anchor">Resources</span>
              <span className="arena-submissions-link4 Anchor">
                Inspiration
              </span>
              <span className="arena-submissions-link5 Anchor">Process</span>
              <span className="arena-submissions-link6 Anchor">Our story</span>
            </div>
          </div>
        </div>
      </div>
      <div className="arena-submissions-section-separator"></div>
      <div className="arena-submissions-section-separator1"></div>
      <div className="arena-submissions-section-separator2"></div>
      <div className="arena-submissions-section-separator3"></div>
      <br/>
      <h1>{title}</h1>
      <p>{paragraph}</p>
      <br/>
      <a href="https://cdn.filestackcontent.com/cNR3dX4FRHi6PLeNzeeW" download><u>Download PDF</u></a>
      <br/>
      <br/>
      <h1>Submit your code here:</h1>
      <div className ="arena-submissions-tabs">
      <BasicTabs 
      tabContent={tabContent}
      tabCount = {6}
      onSubmit={(index)=>{
        setPickerVisible(true);
        console.log("index: " + index )
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

export default ArenaSubmissions
