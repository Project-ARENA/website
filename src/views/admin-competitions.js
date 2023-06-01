import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DataGrid from "../components/datagridAdminCompetitions";
import "./admin-competitions.css";
import Button from "../components/button";
import "reactjs-popup/dist/index.css";
import Modal from "react-modal";
import { useState } from "react";
import InputBoxForInfo from "../components/input-box-for-info";
import { CommonlyUsedComponents as NewCalenderComp, handleChange } from "../components/NewCalenderComp.js"
import { PickerOverlay } from "filestack-react";
import "../components/modal.css";
// import { TeamSizeSelector, min, max , maxTeams} from "../components/TeamSizeSelector.js";
import InputTextArea from "../components/input-textarea.js"
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

let validcomp = false;
async function checkIfUserExists(username, setErrorMessage) {
  const response = await axios.get("http://localhost:3002/api/get/doesExist/" + compname);
  const userExists = response.data;
  // console.log(response.data);
  if (JSON.stringify(userExists) == "[]") {
    setErrorMessage('Account created successfully');
    return true;
  }
  else {
    setErrorMessage('Username already exists');
    return false;
  }
}

function getNumTestcases(testcases) {
  var numtestcases = 1;
  for (var i = 0; i < testcases.length; i++) {
    if (testcases[i] === ",") {
      numtestcases++;
    }
  }
  return numtestcases;
}

// Modal.setAppElement(el)
async function validationCompName(compname) {
  try {
    const response = await axios.get("http://localhost:3002/api/get/doesCompExist/" + compname);
    const codeResponse = response.data;

    if (JSON.stringify(codeResponse) === "[]") {
      validcomp = true;
      console.log("valid name");
      // alert("valid name");
    } else {
      console.log("invalid name");
      alert("invalid name");
    }
  } catch (error) {
    console.error(error);
  }
}



function PostCompDetails(
  compname,
  pic,
  CombinedCompStart,
  CombinedCompEnd,
  desc,
  pdf,
  testcaseNum,
  testcases,
  marker,
  CombinedRegStart,
  CombinedRegEnd,
  maxTeams,
  min,
  max,
  zip
) {
  console.log("Max Teams: " + maxTeams);
  return axios.post("http://localhost:3002/api/post/Create_comp", {
    compname: compname,
    pic: pic,
    CombinedCompStart: CombinedCompStart,
    CombinedCompEnd: CombinedCompEnd,
    desc: desc,
    pdf: pdf,
    testcaseNum: testcaseNum,
    testcases: testcases,
    marker: marker,
    CombinedRegStart: CombinedRegStart,
    CombinedRegEnd: CombinedRegEnd,
    maxTeams: maxTeams,
    min: min,
    max: max,
    zip: zip
  });
}
function validateInputs(compname, pic, CombinedCompStart, CombinedCompEnd, desc, pdf, testcases, marker, CombinedRegStart, CombinedRegEnd, maxTeams, min, max, zip) {
  // Create an array to store the names of the missing fields
  const missingFields = [];
  
  // Check if any of the required inputs are missing and add their names to the missingFields array
  if (!compname) missingFields.push('Company Name');
  if (!pic) missingFields.push('Picture');
  if (!CombinedCompStart) missingFields.push('Combined Competition Start');
  if (!CombinedCompEnd) missingFields.push('Combined Competition End');
  if (!desc) missingFields.push('Description');
  if (!pdf) missingFields.push('PDF');
  if (!testcases) missingFields.push('Test Cases');
  if (!marker) missingFields.push('Marker');
  if (!CombinedRegStart) missingFields.push('Combined Registration Start');
  if (!CombinedRegEnd) missingFields.push('Combined Registration End');
  if (!maxTeams) missingFields.push('Max Teams');
  if (!min) missingFields.push('Min');
  if (!max) missingFields.push('Max');
  if (!zip) missingFields.push('Zip');
  
  // Check if any fields are missing
  if (missingFields.length > 0) {
    const missingFieldsString = missingFields.join(', ');
    alert(`Please fill in the following required fields: ${missingFieldsString}.`);
    return false;
  }

  // Validate start and end dates for registration and competition periods
  const regStartDate = new Date(CombinedRegStart);
  const regEndDate = new Date(CombinedRegEnd);
  const compStartDate = new Date(CombinedCompStart);
  const compEndDate = new Date(CombinedCompEnd);

  if (regEndDate > compStartDate) {
    alert('Registration End Date must be before Competition Start Date.');
    return false;
  }

  if (regStartDate > regEndDate) {
    alert('Registration Start Date must be before Registration End Date.');
    return false;
  }

  if (compStartDate > compEndDate) {
    alert('Competition Start Date must be before or equal to Competition End Date.');
    return false;
  }

  if (regStartDate.toDateString() === regEndDate.toDateString() && regEndDate <= regStartDate) {
    alert('Registration period must have a later end time than the start time.');
    return false;
  }

  if (compStartDate.toDateString() === compEndDate.toDateString() && compEndDate <= compStartDate) {
    alert('Competition period must have a later end time than the start time.');
    return false;
  }

  return true;
}


function GenGrid() {
  const [rows, setData] = React.useState([]);

  React.useEffect(() => {
    axios.get("http://localhost:3002/api/get/competitions").then((response) => {
      const data = response.data.map((data, index) => ({
        id: index + 1,
        competition_id: data.competition_id,
        competition_name: data.competition_name,
        competition_views: data.competition_views,
        registration_startdate: data.registration_startdate,
        registration_enddate: data.registration_enddate,
        competition_startdate: data.competition_startdate,
        competition_enddate: data.competition_enddate,
        competition_no_testcases: data.no_testcases,
        max_teams: data.max_teams,
        teamsize_max: data.teamsize_max,
        teamsize_min: data.teamsize_min,
        competition_description: data.competition_info,
        competition_marker: data.competition_marker,
        competition_pdf: data.competition_testcases,
        competition_zip: data.testcases_zip,
        competition_picture: data.competition_image,
        competition_testcases: data.testcases
      }));
      setData(data);
    });
  }, []);

  return (
    <DataGrid rows={rows} pageSize={25} autoHeight={true}/>
  );
}

const AdminCompetitions = (props) => {
  // const [validcomp, setvalidcomp] = useState(false);
  const [compname, setCompname] = useState("");
  const [testcases, setTestCases] = useState("");
  const [desc, setdesc] = useState("");
  const [pic, setpic] = useState("");
  const [pdf, setpdf] = useState("");
  const [zip, setzip] = useState("");
  const [marker, setmarker] = useState("");
  const [picName, setpicName] = useState("");
  const [pdfName, setpdfName] = useState("");
  const [zipName, setzipName] = useState("");
  const [markerName, setmarkerName] = useState("");
  const [RegStart, setRegStart] = useState(null);
  const [RegEnd, setRegEnd] = useState(null);
  const [RegStartTime, setRegStartTime] = useState(null);
  const [RegEndTime, setRegEndTime] = useState(null);
  const [CompStart, setCompStart] = useState(null);
  const [CompEnd, setCompEnd] = useState(null);
  const [CompStartTime, setCompStartTime] = useState(null);
  const [CompEndTime, setCompEndTime] = useState(null);
  const [min, setmin] = useState(1);
  const [max, setmax] = useState(10);
  const [maxTeams, setmaxTeams] = useState(50);
  let CombinedRegStart = RegStart + " " + RegStartTime;
  let CombinedRegEnd = RegEnd + " " + RegEndTime;
  let CombinedCompStart = CompStart + " " + CompStartTime;
  let CombinedCompEnd = CompEnd + " " + CompEndTime;

  const [visible, setvisible] = useState(false);
  const [pickerVisible, setPickerVisible] = useState(false);
  const username = sessionStorage.getItem('username');

  function handleminChange(event) {
    setmin(event.target.value);
  }

  function handlemaxChange(event) {
    setmax(event.target.value);
  }

  function handlemaxTeamsChange(event) {
    setmaxTeams(event.target.value);
  }
  
  // Get user details from database, to make displaying it easier
  const getUserDetails = () => {
    axios
      .get("http://localhost:3002/api/get/userDetails/" + username)
      .then(function (response) {
        sessionStorage.setItem('userID', (response.data)[0].user_id);
        sessionStorage.setItem('useremail', (response.data)[0].user_email);
        sessionStorage.setItem('userpassword',(response.data)[0].user_password);
      });
  }

  window.onload = getUserDetails();

  const handleUploadDone = (res) => {
  //   console.log(res.filesUploaded[0].url); // Print the URL of the uploaded file
  // console.log(res.filesUploaded[0].mimetype); // Print the MIME type of the uploaded file

  if (res.filesUploaded[0].mimetype === "image/png" ||
    res.filesUploaded[0].mimetype === "image/jpeg" ||
    res.filesUploaded[0].mimetype === "image/jpg") {
    setpic(res.filesUploaded[0].url);
    setpicName("Picture uploaded: " + res.filesUploaded[0].filename);
  }
  if (res.filesUploaded[0].mimetype === "application/pdf") {
    setpdf(res.filesUploaded[0].url);
    setpdfName("PDF uploaded: " + res.filesUploaded[0].filename);
  }
  if (res.filesUploaded[0].mimetype === "text/x-python") {
    setmarker(res.filesUploaded[0].url);
    setmarkerName("Marker uploaded: " + res.filesUploaded[0].filename);
  }
  if (res.filesUploaded[0].mimetype === "application/zip" ||
    res.filesUploaded[0].mimetype ===  "application/x-zip-compressed") {
    setzip(res.filesUploaded[0].url);
    // console.log(zip);
    setzipName("ZIP uploaded: " + res.filesUploaded[0].filename);
  }
  };

  const handleClosePicker = () => {
    setPickerVisible(false); // Hide the picker
  };

  return (
    <div className="admin-competitions-container" style={{ marginLeft: 6, marginBottom: 10, marginTop: 5 }}>
      <Modal 
        isOpen={visible}
        style={{
          content: {
            width: "100%",
            height: "100%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            overflowY: "scroll",
            // maxHeight: "100vh"
          },
          overlay: { zIndex: 1000 },
        }}
      >
        
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h1 style={{ color: "#457B9D" }}>Create Competition</h1>
          <br/>

          <InputBoxForInfo
          buttonText="Competition Name"
          onChange={(e) => {
          setCompname(e.target.value);
          // console.log("Compname value:", e.target.value);
          }}
          />

          <br/>

          <h3 style={{ color: "#457B9D" }}>Team Size</h3>

          <div style={{ marginLeft: 6, marginBottom: 10, marginTop: 5 }}>
            <Box
              sx={{
              display: 'grid',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '15px',
              }}>
                <TextField
                  label="Max number of teams"
                  type="number"
                  inputProps={{ min: 1 }}
                  value={maxTeams}
                  onChange={handlemaxTeamsChange}
                />

               <h3 style={{ color: "#457B9D", textAlign: "center",marginBottom: "1px"   }}>Team Size</h3>
            
                <TextField
                  label="Minimum team size"
                  type="number"
                  inputProps={{ min: 1 }}
                  value={min}
                  onChange={handleminChange}
                />

                <TextField
                  label="Maximum team size"
                  type="number"
                  inputProps={{ min: 1 }}
                  value={max}
                  onChange={handlemaxChange}
                />

                <br />
            
                {/* {teamMembers.map((member, index) => (
                  <div key={index} style={{ marginBottom: "5px" }}>
                    <span className={`team-manager-text${index + 2}`}>{member}</span>
                  </div>
                ))} */}
              </Box>
          </div>

          <h3 style={{ color: "#457B9D", textAlign: "center"  }}>Test Case Names</h3>

          <InputTextArea 
            label="testcase 1, testcase 2, etc..."
            onChange={(e) => setTestCases(e.target.value)}
          ></InputTextArea>

          <br/>

          <h3 style={{ color: "#457B9D" }}>Uploads</h3>

          <div style={{ marginLeft: 6, marginBottom: 10, marginTop: 5 }}>
            <Button
              name="Upload Competition Picture"
              color="primary"
              onClick={() => {
                setPickerVisible(true);
              }}
            />
          </div>
          <p>{picName}</p>

          <div style={{ marginLeft: 6, marginBottom: 10, marginTop: 5 }}>
            <Button
              name="Upload Competition PDF"
              color="primary"
              onClick={() => {
                setPickerVisible(true);
              }}
            />
          </div>
          <p>{pdfName}</p>

          <div style={{ marginLeft: 6, marginBottom: 10, marginTop: 5 }}>
            <Button
              name="Upload Marker Script"
              color="primary"
              onClick={() => {
                setPickerVisible(true);
              }}
            />
          </div>
          <p>{markerName}</p>
          <div style={{ marginLeft: 6, marginBottom: 10, marginTop: 5 }}>
            <Button
              name="Upload Input's Zip"
              color="primary"
              onClick={() => {
                setPickerVisible(true);
              }}
            />
          </div>
          <p>{zipName}</p>
          
          {pickerVisible && (
            <div
              className="center"
              style={{ marginLeft: 6, marginBottom: 10, marginTop: 5 }}
            >
              <PickerOverlay
                key="picker-overlay"
                apikey={process.env.REACT_APP_API_KEY_FILESTACK}
                onUploadDone={(res) => {
                  handleUploadDone(res);
                }}
                pickerOptions={{
                  onClose: () => {
                    handleClosePicker();
                  },
                }}
              />
            </div>
          )}
          <br/>
          <h3 style={{ color: "#457B9D" }}>Registration Period Details</h3>

          <div style={{ marginLeft: 6, marginBottom: 10, marginTop: 5 }}>  
            <NewCalenderComp
              date1_label="Registration Opening Date"
              date2_label="Registration Closing Date"
              time1_label="Registration Opening Time"
              time2_label="Registration Closing Time"
              onStartDateChange={(date) => {setRegStart(date)}}
              onEndDateChange={(date) => {setRegEnd(date)}}
              onStartTimeChange={(date) => {setRegStartTime(date)}}
              onEndTimeChange={(date) => {setRegEndTime(date)}}
            ></NewCalenderComp>
          </div>

          <br/>
          <h3 style={{ color: "#457B9D" }}>Competing Period Details</h3>

          <div style={{ marginLeft: 6, marginBottom: 10, marginTop: 5 }}>  
            <NewCalenderComp
              date1_label="Competing Opening Date"
              date2_label="Competing Closing Date"
              time1_label="Competing Opening Time"
              time2_label="Competing Closing Time"
              onStartDateChange={(date) => {setCompStart(date)}}
              onEndDateChange={(date) => {setCompEnd(date)}}
              onStartTimeChange={(date) => {setCompStartTime(date)}}
              onEndTimeChange={(date) => {setCompEndTime(date)}}
            ></NewCalenderComp>
          </div>

          <br/>
          <h3 style={{ color: "#457B9D" }}>Competition Description</h3>

          <InputTextArea 
          label="Competition Description"
          onChange={(e) => {
          setdesc(e.target.value);
          }}
          ></InputTextArea>


          <div style={{ marginLeft: 6, marginBottom: 10, marginTop: 5 }}>
            <Button
              name="Create"
              color="success"
              onClick={async () => {
                  // Validate inputs before making the API call

                if (!validateInputs(compname, pic, CombinedCompStart, CombinedCompEnd, desc, pdf, testcases, marker, CombinedRegStart, CombinedRegEnd, maxTeams, min, max, zip))
                {
                  return; // Stop further execution if validation fails
                }
                else
                {
                  await validationCompName(compname);
                  
                  if(validcomp==true)
                  {
                    validcomp=false
                    PostCompDetails(
                      compname,
                      pic,
                      CombinedCompStart,
                      CombinedCompEnd,
                      desc,
                      pdf,
                      getNumTestcases(testcases),
                      testcases,
                      marker,
                      CombinedRegStart,
                      CombinedRegEnd,
                      maxTeams,
                      min,
                      max,
                      zip
                    );
                    setvisible(false);
                    setPickerVisible(false);
                    window.location.reload(false);
                  }
                }
        
                  // console.log("Create button clicked");
                  // console.log("Competition Name is:" + compname);
                  // console.log("Number of teams is " + maxTeams);
                  // console.log("Team min is:" + min);
                  // console.log("Team max is:" + max);
                  // console.log("Test cases are:" + testcases);
                  // console.log("Num testcases is:" + getNumTestcases(testcases));
                  // console.log("pic link is:" + pic);
                  // console.log("pdf link is:" + pdf);
                  // console.log("marker link is:" + marker);
                  // console.log("regStartDate: " + CombinedRegStart);
                  // console.log("regEndDate: " + CombinedRegEnd);
                  // console.log("compStartDate: " + CombinedCompStart);
                  // console.log("compEndDate: " + CombinedCompEnd);
                  // console.log("Desc: " + desc);
                }}
            />
          </div>

          <div style={{ marginLeft: 6, marginTop: 5 }}>
            <Button
              name="Close"
              onClick={() => {
                setvisible(false);
                setPickerVisible(false);
                // console.log("button clicked");
              }}
              color="danger"
            />
          </div>
        </div>
      </Modal>
      <div data-role="Header" className="admin-competitions-navbar-container">
        <div className="admin-competitions-navbar">
          <div className="admin-competitions-left-side">
          <a href="https://youtu.be/dQw4w9WgXcQ" className="home-link">
                &lt;ProjectArena/&gt;
              </a>
            <div
              data-role="BurgerMenu"
              className="admin-competitions-burger-menu"
            >
              <svg viewBox="0 0 1024 1024" className="admin-competitions-icon">
                <path d="M128 256h768v86h-768v-86zM128 554v-84h768v84h-768zM128 768v-86h768v86h-768z"></path>
              </svg>
            </div>
            <div className="admin-competitions-links-container">
              <Link
                to="/admin-competitions"
                className="admin-competitions-link1 Anchor"
              >
                COMPETITIONS
              </Link>
              <Link
                to="/admin-teams"
                className="admin-competitions-link2 Anchor"
              >
                TEAMS
              </Link>
            </div>
          </div>
          <div className="admin-competitions-container1">
            <Link to="/admin-profile" className="admin-competitions-navlink">
              <svg viewBox="0 0 1024 1024" className="admin-competitions-icon2">
                <path d="M576 706.612v-52.78c70.498-39.728 128-138.772 128-237.832 0-159.058 0-288-192-288s-192 128.942-192 288c0 99.060 57.502 198.104 128 237.832v52.78c-217.102 17.748-384 124.42-384 253.388h896c0-128.968-166.898-235.64-384-253.388z"></path>
              </svg>
            </Link>
          </div>
          <div
            data-role="MobileMenu"
            className="admin-competitions-mobile-menu"
          >
            <div className="admin-competitions-container2">
              <img
                alt="image"
                src="https://play.teleporthq.io/static/svg/default-img.svg"
                className="admin-competitions-image1"
              />
              <div
                data-role="CloseMobileMenu"
                className="admin-competitions-close-menu"
              >
                <svg
                  viewBox="0 0 1024 1024"
                  className="admin-competitions-icon4"
                >
                  <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                </svg>
              </div>
            </div>
            <div className="admin-competitions-links-container1">
              <Link to="/admin-home" className="admin-competitions-link">
                HOME
              </Link>
              <Link
                to="/admin-competitions"
                className="admin-competitions-link1 Anchor"
              >
                COMPETITIONS
              </Link>
              <Link
                to="/admin-teams"
                className="admin-competitions-link2 Anchor"
              >
                TEAMS
              </Link>
            </div>
          </div>
        </div>
      </div>
      <h1 className="admin-competitions-title" style={{paddingTop:"25px"}}>Competitions</h1>
      <div className="grid-container" style={{height: "800px"}}>
        <GenGrid />
      </div>

      <Button
        name="Create Competition"
        onClick={() => {
          setvisible(true);
          // console.log("button clicked");
        }}
        // rootClassName="button-root-class-name2"
      />
      <br/>
    </div>
  );
};
export default AdminCompetitions;
