import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import "./arena-main.css";
//import tabs from "../components/tabs"
import BasicTabs from "../components/tabs";
import { PickerOverlay } from "filestack-react";
import { set, sub, subHours } from "date-fns";
import {
  ConstructionOutlined,
  ControlPointSharp,
  DisabledByDefault,
} from "@mui/icons-material";
import { Tab } from "@mui/material";
import Modal from "react-modal";
import "../components/modal.css";
import { da, hi } from "date-fns/locale";
import Button from "../components/button";
import InputTextArea from "../components/input-textarea";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Swal from "sweetalert2";

const competition_id = sessionStorage.getItem("CompID");
const user_id = sessionStorage.getItem("userID");
let tabIndex = -1;
let latestSubmissionScores = [0];
let subHistory = [0];
let highestSubArray = [0];
let newHighestSub = "";
let numTests = 0;
let testcases = "";
let uploadedTXT = false;
let uploadedZIP = false;
let linkForPDF = "";
let TXTLink = "";
let ZIPLink = "";
let Mark = 0;
let team_code = sessionStorage.getItem("teamCode");
let testcaseName = "";
let endDate = "";
let sampleInOutLink = "";

async function handleUploadTXTDone(res, setTXTFileName, setAlertMsg, setShowTXTAlert) {
  TXTLink = res.filesUploaded[0].url;

  //Join the string "Text file uploaded" with the filename
  setTXTFileName("Text file uploaded: " + res.filesUploaded[0].filename);
  // console.log(testcaseName);
  const trimmedStr = testcaseName.trim();
  // console.log(trimmedStr);
  try {
    const response = await axios.post(
      "http://localhost:3002/api/get/uploadTest/score",
      {
        textFileUrl: res.filesUploaded[0].url,
        competitionId: competition_id,
        testcaseName: testcaseName.trim(),
      }
    );
    Mark = response.data;
    //Check if mark is a number
    if (isNaN(Mark)) {
      // console.log("Mark is not a number");
      setAlertMsg(Mark);
      setShowTXTAlert(true);
      uploadedTXT = false;
    }
    else {
      // console.log("Mark is a number");
    }
    // console.log(Mark);
  } catch (error) {
    uploadedTXT = false;
    setAlertMsg(error.response.data);
    setShowTXTAlert(true);
    console.error(error);
  }
}

function handleUploadZIPDone(res, setZIPFileName) {
  ZIPLink = res.filesUploaded[0].url;

  //Join the string "ZIP file uploaded" with the filename
  setZIPFileName("ZIP file uploaded: " + res.filesUploaded[0].filename);
  // console.log(res.filesUploaded[0].filename);
}

async function getLatestScores() {
  return new Promise((resolve, reject) => {
    axios
      .get("http://localhost:3002/api/get/testcase_latest/" + team_code)
      .then(function (response) {
        const latestString = response.data[0].testcase_latest;
        const jsonArray = JSON.parse(latestString);

        let count = 0;
        for (let key in jsonArray) {
          latestSubmissionScores[count] = jsonArray[key];
          count++;
        }

        resolve(latestSubmissionScores); // Resolve the promise inside the `then` block
      })
      .catch(function (error) {
        reject(error);
      });
  });
}

// Get the number of test cases for the competition
function getNumTestCases() {
  axios
    .get("http://localhost:3002/api/get/numTests/" + competition_id)
    .then(function (response) {
      numTests = response.data[0].no_testcases;
    });
}

//! Generates a random score when the user submits
function generateRandomNumber() {
  const number = Math.floor(Math.random() * 100) + 1; // Generate a random number between 1 and 100
  return number;
}

function getTeamID() {
  return new Promise((resolve, reject) => {
    axios
      .get(
        "http://localhost:3002/api/get/team_name/" +
          competition_id +
          "/" +
          user_id
      )
      .then(function (response) {
        sessionStorage.setItem("teamName", response.data[0].team_name);
        resolve(); // Resolve the promise without any value
      })
      .catch(function (error) {
        reject(error); // Reject the promise with the error
      });
  });
}

//! Gets the testCases for the competition
function getCompTestCases() {
  return new Promise((resolve, reject) => {
    axios
      .get("http://localhost:3002/api/get/Testcases/" + competition_id)
      .then(function (response) {
        testcases = response.data[0].testcases;
        resolve(testcases);
      })
      .catch(function (error) {
        console.error(error);
        reject(error);
      });
  });
}

// Get competition pdf link
function getLinkForPDF() {
  return new Promise((resolve, reject) => {
    axios
      .get("http://localhost:3002/api/get/compTestCases/" + competition_id)
      .then(function (response) {
        const linkForPDF = response.data[0].competition_testcases;
        resolve(linkForPDF);
      })
      .catch(function (error) {
        console.error(error);
        reject(error);
      });
  });
}

// Identify highest submission score for each testcase
async function getHighest() {
  return new Promise(async (resolve, reject) => {
    await axios
      .get("http://localhost:3002/api/get/testcase_highest/" + team_code)
      .then(function (response) {
        const latestString = response.data[0].testcase_highest;
        const jsonArray = JSON.parse(latestString);
        let count = 0;
        for (let key in jsonArray) {
          highestSubArray[count] = jsonArray[key];
          count++;
        }
        resolve(highestSubArray); // Resolve the promise with the highestSubArray
      });
    // .catch(function (error) {
    //   // reject(error); // Reject the promise with the error
    // });
  });
}

// Calculate if the latest submission score is higher than the highest submission score
function ScoredHigher() {
  let isHigher = false;
  return new Promise((resolve, reject) => {
    axios
      .get("http://localhost:3002/api/get/testcase_highest/" + team_code)
      .then(function (response) {
        const latestString = response.data[0].testcase_highest;
        const jsonArray = JSON.parse(latestString);
        let highestSub = [];
        let count = 0;
        for (let key in jsonArray) {
          highestSub[count] = jsonArray[key];
          count++;
        }
        for (let i = 0; i < latestSubmissionScores.length; i++) {
          if (latestSubmissionScores[i] >= highestSub[i]) {
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
        resolve([isHigher, newHighestSub]); // Resolve the promise with both values
      })
      .catch(reject);
  });
}

// Update the highest submission zip code in the database
async function postLatestLinks(){

  axios.get("http://localhost:3002/api/get/testcaseLinks/" + team_code)
    .then(response => {
      const data = response.data;
      // console.log(data);
      // Assuming the response data is an array with a single object
      const testCaseHighest = JSON.parse(data[0].testcase_links);

      // Modify the desired index with the ZIPLink value
      testCaseHighest[`testcase_${tabIndex}`] = ZIPLink;

      // Convert the modified object back to a string
      const modifiedTestCaseHighest = JSON.stringify(testCaseHighest);

      // Output the modified string
      // console.log(modifiedTestCaseHighest);

      // Post the modified string to the database
      axios.post("http://localhost:3002/api/post/updateTestcaseLinks", {
        team_code: team_code,
        testcase_links: modifiedTestCaseHighest

      }).then(response => {
        // console.log(response);
      }
      ).catch(error => {
        // console.log(error);
      }
      )

    })

  
}

// Update the highest submission score in the database
async function postHighestScore() {
  try {
    const [isHigher, newHighestSub] = await ScoredHigher();

    if (isHigher) {
      postLatestLinks();
      const response = await axios.post(
        "http://localhost:3002/api/post/highestScore/team",
        {
          team_name: sessionStorage.getItem("teamName"),
          testcase_highest: newHighestSub,
        }
      );
      return response;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}

async function uploadSubmissions() {
  //Make the JSON String thing
  const obj = {};
  const obj1 = {};

  latestSubmissionScores.map((value, index) => {
    obj[`testcase_${index + 1}`] = value;
  });

  //Seperate one for submission history
  latestSubmissionScores.map((value, index) => {
    if (index != tabIndex - 1) {
      obj1[`testcase_${index + 1}`] = 0;
    } else {
      obj1[`testcase_${index + 1}`] = value;
    }
  });

  const newSub = JSON.stringify(obj);
  const subHist = JSON.stringify(obj1);
  //Upload to submission history:
  axios
    .get("http://localhost:3002/api/get/testcase_prev/" + team_code)
    .then(function (response) {
      if (response.data[0].testcase_prev == null) {
        const originalObject = JSON.parse(subHist);
        const newObject = { 0: originalObject };
        const newString = JSON.stringify(newObject);
        axios.post("http://localhost:3002/api/post/testcasePrev/team", {
          team_name: sessionStorage.getItem("teamName"),
          testcase_prev: newString,
        });
      } else {
        const data = JSON.parse(response.data[0].testcase_prev);
        const nextKey = Object.keys(data).length.toString();
        const updatedData = { ...data, [nextKey]: obj1 };
        const updatedDataString = JSON.stringify(updatedData);
        axios.post("http://localhost:3002/api/post/testcasePrev/team", {
          team_name: sessionStorage.getItem("teamName"),
          testcase_prev: updatedDataString,
        });
      }
    });

  //Upload to latest
  axios.post("http://localhost:3002/api/post/latestScore/team", {
    team_name: sessionStorage.getItem("teamName"),
    testcase_latest: newSub,
  });

  //await postLatestLinks();
  await postHighestScore();
}

function getEndDate (){
  axios.get("http://localhost:3002/api/get/compEndDate/" + competition_id)
  .then(function (response) {
    endDate = response.data[0].competition_enddate;
    // console.log(response.data[0].competition_enddate);
  }
  )
}

function getSampleInOut(){
  return new Promise((resolve, reject) => {
    axios.get("http://localhost:3002/api/get/sampleOutput/" + competition_id)
    .then(function (response) {
      sampleInOutLink = response.data[0].testcases_zip;
      resolve(sampleInOutLink);
    }
    )
  });
}

const ArenaMain = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [pickerTXTVisible, setTXTPickerVisible] = useState(false);
  const [pickerZIPVisible, setZIPPickerVisible] = useState(false);
  const [showTXTAlert, setShowTXTAlert] = useState(false);
  const [timeRemaining , setTimeRemaining] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  //This stores contents of tab, tab number and index in the array are related
  const [title, setTitle] = useState("");
  const [paragraph, setParagraph] = useState("");

  //These store the names of the files that we uplaoded
  const [txtFileName, setTXTFileName] = useState("");
  const [zipFileName, setZIPFileName] = useState("");

  // const [uploadedTXT, setUploadTXT] = useState(false);
  // const [uploadedZIP, setUploadZIP] = useState(false);

  const [disabled, setDisabled] = useState(true);
  React.useEffect(() => {
    const fetchData = async () => {
      await getCompTestCases();
      setIsLoaded(true);
      getSampleInOut()
      getLatestScores();
      getHighest();
      getEndDate();
      getNumTestCases(numTests);
      axios
        .get("http://localhost:3002/api/get/compDetails/" + competition_id)
        .then(function (response) {
          setTitle(response.data[0].competition_name);
          setParagraph(response.data[0].competition_info);
        });
      //Sets the link for the competition testcases
      getTeamID();
    };
    const interval = setInterval(() => {
      const targetDate = new Date(endDate);
      const currentDate = new Date();

      const timeDifference = targetDate.getTime() - currentDate.getTime();

      // Calculate remaining days, hours, minutes, and seconds
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);

      setTimeRemaining(`Remaining time: ${days}d ${hours}h ${minutes}m ${seconds}s`);

      
      //If there is one minute remaining, then show the alert
      if (minutes == 1 && seconds == 1 && hours == 0) {
        setAlertMsg("You have 1 minute remaining!")
        setShowTXTAlert(true);
      }

      //If there is 30 minutes remaining, then show the alert
      if (minutes == 30 && seconds == 1 && hours == 0) {
        setAlertMsg("You have 30 minutes remaining!")
        setShowTXTAlert(true);
      }

      //If there is 1 hour remaining, then show the alert
      if (hours == 1 && minutes == 0 && seconds == 1) {
        setAlertMsg("You have 1 hour remaining!")
        setShowTXTAlert(true);
      }


      //If the seconds remaining is less than 0, then the competition is over
      if (seconds < 0 && minutes == 0 && hours == 0) {
        setTimeRemaining("Competition has ended");
        //Relocate the user to the competition page
        window.location.href = "http://localhost:3000/player-portal-competitions";
      }


    }, 1000); //1000ms = 1 sec
    fetchData();
  }, []);

  const [isLoaded, setIsLoaded] = React.useState(false);

  //Sets the pickerVisible to false, so you can actually click it again

  //Returns the url for the file uploaded
  const handleUploadDone = (res) => {};
  return (
    <div className="arena-main-container">
      <Modal
        isOpen={modalVisible}
        style={{
          content: {
            width: "90%",
            height: "90%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            overflowY: "scroll",
          },
          overlay: { zIndex: 1000 },
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            height: "100%",
            marginLeft: 200,
            marginRight: 200,
          }}
        >
          <h1>{testcaseName}</h1>
          <h1>Submit your solutions</h1>
          <br />
          <h3>Instructions:</h3>
          <p>
            To submit your solution, make sure you have both a .txt file and a
            .zip file. The .txt file should contain the output of your code,
            while the .zip file should contain your actual code. Look for
            separate "Upload" buttons for each file on the submission page.
            Click the "Upload" button for the .txt file, select the file from
            your local computer, and wait for the upload to complete. Next,
            click the "Upload" button for the .zip file, select the file from
            your local computer, and wait for the upload to complete. You may
            also add any comments to your submission before submitting it.
            Review your submission and click the "Submit" button. If any errors
            occur, correct them before proceeding.
          </p>

          {pickerTXTVisible && (
            <div
              className="center"
              style={{ marginLeft: 6, marginBottom: 10, marginTop: 5 }}
            >
              <PickerOverlay
                key="picker-overlay"
                apikey={process.env.REACT_APP_API_KEY_FILESTACK}
                onUploadDone={(res) => {
                  
                  if (res.filesUploaded[0].mimetype === "text/plain") {
                    handleUploadTXTDone(res, setTXTFileName, setAlertMsg, setShowTXTAlert);
                    uploadedTXT = true;
                    //Checks if both are uploaded
                    if (uploadedZIP == true && uploadedTXT == true) {
                      setDisabled(false);
                    }
                  } else {
                    setAlertMsg("Please upload a .txt file");
                    setShowTXTAlert(true);
                  }
                  setTXTPickerVisible(false);
                }}
                pickerOptions={{
                  onClose: () => {
                    setTXTPickerVisible(false);
                  },
                }}
              />
            </div>
          )}

          {pickerZIPVisible && (
            <div
              className="center"
              style={{ marginLeft: 6, marginBottom: 10, marginTop: 5 }}
            >
              <PickerOverlay
                key="picker-overlay"
                apikey={process.env.REACT_APP_API_KEY_FILESTACK}
                onUploadDone={(res) => {
                  handleUploadZIPDone(res, setZIPFileName);
                  uploadedZIP = true;
                  // Checks if both are uploaded
                  if (uploadedZIP && uploadedTXT) {
                    setDisabled(false);
                  }
                  setZIPPickerVisible(false);
                }}
                pickerOptions={{
                  onClose: () => {
                    setZIPPickerVisible(false);
                  },
                }}
              />
            </div>
          )}

          <br />
          <Button
            name="Upload txt file"
            style={{
              alignItems: "center",
            }}
            onClick={() => {
              setTXTPickerVisible(true);
            }}
          ></Button>
          <p>{txtFileName}</p>
          <br />
          <Button
            name="Upload Zip File"
            style={{
              alignItems: "center",
            }}
            onClick={() => {
              setZIPPickerVisible(true);
            }}
          ></Button>
          <p>{zipFileName}</p>
          <br />
          <Button
            name="Submit"
            disabled={disabled}
            style={{
              color: "black",
              alignItems: "center",
            }}
            onClick={() => {
              //This sets the new score
              latestSubmissionScores[tabIndex - 1] = Mark;
              uploadSubmissions();
              setTimeout(function () {
                window.location.reload(false);
              }, 3000);
            }}
          ></Button>
          <br />
          <Button
            name="Close"
            onClick={() => {
              setModalVisible(false);
            }}
            color={"danger"}
            // style={{backgroundColor: "rgba(255, 0, 0, 0.5)", color: "black"}}
          ></Button>
        </div>
      </Modal>
      {showTXTAlert && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
          }}
        >
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert
              severity="error"
              onClose={() => {
                setShowTXTAlert(false);
              }}
            >
              {alertMsg}
            </Alert>
          </Stack>
        </div>
      )}
      <div data-role="Header" className="arena-main-navbar-container">
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
      <div className="arena-main-section-separator"></div>
      <div className="arena-main-section-separator1"></div>
      <div className="arena-main-section-separator2"></div>
      <div className="arena-main-section-separator3"></div>
      <br />
      <h1 style={{ textAlign: "center" }}>{title}</h1>
      <h2 style={{ textAlign: "center" }}>Arena</h2>
      <br />
      <p
        style={{
          textAlign: "center",
          overflowWrap: "break-word",
          width: "800px",
        }}
      >
        {paragraph}
      </p>
      <br />
      <a
        href="#"
        onClick={async (event) => {
          event.preventDefault(); // This prevents the default behavior of the link
          const link = event.currentTarget;
          if (link) {
            link.style.cursor = "wait"; // Set the cursor to 'wait'
            const pdfLink = await getLinkForPDF();
            window.open(pdfLink);
            setTimeout(() => {
              link.style.cursor = "default"; // Set the cursor back to default after a delay
            }, 1000); // Change the delay time as needed
          }
        }}
        target="_blank"
        rel="noopener noreferrer"
      >
        <u>Download PDF</u>
      </a>
      <a
        href="#"
        onClick={async (event) => {
          event.preventDefault(); // This prevents the default behavior of the link
          const link = event.currentTarget;
          if (link) {
            link.style.cursor = "wait"; // Set the cursor to 'wait'
            const inOutLink = await getSampleInOut();
            window.open(inOutLink);
            setTimeout(() => {
              link.style.cursor = "default"; // Set the cursor back to default after a delay
            }, 1000); // Change the delay time as needed
          }
        }}
        target="_blank"
        rel="noopener noreferrer"
      >
        <u>Download Sample Input</u>
      </a>
      <br />
      <h4>{timeRemaining}</h4>
      <br />
      <h1>Submit your code here:</h1>
      <div className="arena-main-tabs">
        <div>
          {isLoaded && (
            <BasicTabs
              tabContent={latestSubmissionScores}
              tabContent2={highestSubArray}
              tabCount={numTests}
              labels={testcases.split(",")}
              onSubmit={(index) => {
                testcaseName = testcases.split(",")[index];
                tabIndex = index + 1;
                //Sets the modal to visible
                setModalVisible(true);
              }}
            />
          )}
        </div>
        {/* {pickerVisible && (
          <PickerOverlay
            key="picker-overlay"
            apikey={process.env.REACT_APP_API_KEY_FILESTACK}
            onUploadDone={(res) => {
              handleUploadDone(res);

              //This sets the new score
              latestSubmissionScores[tabIndex - 1] = generateRandomNumber();
              uploadSubmissions();
              setTimeout(function () {
                window.location.reload(false);
              }, 550);
              
            }}
            pickerOptions={{
              onClose: () => {
                handleClosePicker();
              },
            }}
          />
        )} */}
      </div>
    </div>
  );
};

export {
  ArenaMain,
  getLatestScores,
  getHighest,
  getNumTestCases,
  handleUploadTXTDone,
  handleUploadZIPDone,
};
