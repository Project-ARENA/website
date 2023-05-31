import { useState } from "react";
import Box from "@mui/material/Box";
import InputBoxForInfo from "../components/input-box-for-info";
import { DataGrid } from "@mui/x-data-grid";
import Modal from "react-modal";
import Button from "../components/button";
import axios from "axios";
import Swal from "sweetalert2";
import { TeamSizeSelector, min, max , maxTeams as TeamsMax} from "../components/TeamSizeSelector.js";
import { CommonlyUsedComponents as NewCalenderComp, handleChange } from "../components/NewCalenderComp.js"
import InputTextArea from "../components/input-textarea.js";
import { PickerOverlay } from "filestack-react";

let validcomp = false;

function validationCompName(compname){
  axios
    .get("http://localhost:3002/api/get/doesCompExist/" + compname)
    .then(function (response) {
      const codeResponse = response.data;

      if (JSON.stringify(codeResponse) == "[]") {
        validcomp=true;
        console.log("valid name");
        // alert("valid name");
      } else {
        console.log("invalid name");
        alert("invalid name");
      }
    });
};

export default function CustomDataGrid({ rows }) {
  const [clickedRowDelete, setClickedRowDelete] = useState();
  const [clickedRowEdit, setClickedRowEdit] = useState();
  const [visible, setvisible] = useState(false);

  const [rowID, setRowID] = useState(null);
  const [compID, setcompID] = useState("");
  const [compname, setCompname] = useState("");
  const [RegStart, setRegStart] = useState("");
  const [RegEnd, setRegEnd] = useState("");
  const [RegStartTime, setRegStartTime] = useState(null);
  const [RegEndTime, setRegEndTime] = useState(null);
  const [CompStart, setCompStart] = useState("");
  const [CompEnd, setCompEnd] = useState("");
  const [CompStartTime, setCompStartTime] = useState(null);
  const [CompEndTime, setCompEndTime] = useState(null);
  const [testcases, setTestCases] = useState("");
  const [noTestcases, setNoTestCases] = useState("");
  const [maxNoTeams, setmaxNoTeams] = useState("");
  const [teamMin, setTeamMin] = useState("");
  const [teamMax, setTeamMax] = useState("");
  const [desc, setdesc] = useState("");
  const [pic, setpic] = useState("");
  const [pdf, setpdf] = useState("");
  const [marker, setmarker] = useState("");
  const [zip, setzip] = useState("");
  const [picName, setpicName] = useState("");
  const [pdfName, setpdfName] = useState("");
  const [zipName, setzipName] = useState("");
  const [markerName, setmarkerName] = useState("");
  let CombinedRegStart = RegStart + " " + RegStartTime;
  let CombinedRegEnd = RegEnd + " " + RegEndTime;
  let CombinedCompStart = CompStart + " " + CompStartTime;
  let CombinedCompEnd = CompEnd + " " + CompEndTime;

  const [pickerVisible, setPickerVisible] = useState(false);

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
      setzipName("ZIP uploaded: " + res.filesUploaded[0].filename);
    }
    };

    const onButtonEdit = (e, row) => {
      e.stopPropagation();
      setClickedRowEdit(row);
    
      setRowID(row.id);
      setcompID(row.competition_id);
      setdesc(row.competition_description)
      setCompname(row.competition_name);
      setRegStart(row.registration_startdate);
      setRegEnd(row.registration_enddate);
      setCompStart(row.competition_startdate);
      setCompEnd(row.competition_enddate);
      setNoTestCases(row.competition_no_testcases);
      setmaxNoTeams(row.max_teams);
      setTeamMax(row.teamsize_max);
      setTeamMin(row.teamsize_min);
      setpicName("Picture uploaded: " + row.competition_picture);
      setpdfName("PDF uploaded: " + row.competition_pdf);
      setmarkerName("Marker uploaded: " + row.competition_marker);
      setzipName("ZIP uploaded: " + row.competition_zip);
    
      setvisible(true);
    };
    
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
    
      return true;
    }
  //TODO: Change to update competition details
  const onButtonEditSubmit = async (e) => {

    try {
      const response = await axios.post(
        "http://localhost:3002/api/post/update/competition",
        {
          competition_name: compname,
          competition_image: pic,
          competition_startdate: CombinedCompStart,
          competition_enddate: CombinedCompEnd,
          competition_info:desc,
          competition_testcases:pdf ,
          no_testcases :noTestcases,
          testcases:testcases,
          competition_marker:marker,
          registration_startdate:CombinedRegStart,
          registration_enddate:CombinedCompEnd,
          max_teams: TeamsMax,
          teamsize_min: min,
          teamsize_max: max,
          competition_id:compID
        }
      );
      console.log(response.data);

      window.location.reload(false);

      setvisible(false);
    } catch (error) {
      console.error(error);
    }
  };

  const onButtonDelete = async (e, row) => {
    e.stopPropagation();
    setClickedRowDelete(row);
    // console.log(row.competition_id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // console.log(row.competition_id);
        axios.post("http://localhost:3002/api/post/remove/competition", {
          comp_id: row.competition_id,
        });

        Swal.fire("Deleted!", "Row has been deleted.", "success").then(() => {
          window.location.reload(false);
        });
      }
    });
  };

  const columns = [
    { field: "competition_id", headerName: "ID", width: 50 },
    { field: "competition_name", headerName: "Title", width: 120 },
    { field: "competition_views", headerName: "Views", width: 80 },
    { field: "registration_startdate", headerName: "Registration Starts", width: 170 },
    { field: "registration_enddate", headerName: "Registration Ends", width: 170 },
    { field: "competition_startdate", headerName: "Competition Starts", width: 170 },
    { field: "competition_enddate", headerName: "Competition Ends", width: 170 },
    { field: "competition_no_testcases", headerName: "No. Tests", width: 100 },
    {
      field: "deleteButton",
      headerName: "Actions",
      description: "Actions column.",
      sortable: false,
      width: 300,
      renderCell: (params) => {
        return (
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              name="Edit"
              onClick={(e) => onButtonEdit(e, params.row)}
            >
              Edit Details
            </Button>

            <Button
              name="Delete"
              onClick={(e) => onButtonDelete(e, params.row)}
              color="danger"
            >
              Delete Team
            </Button>

          </Box>
        );
      },
    },
  ];
  const handleClosePicker = () => {
    setPickerVisible(false); // Hide the picker
  };
  return (
    <Box sx={{ height: 700, width: "100%" }}>
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
          initialValue={compname}
          />

          <br/>

          <h3 style={{ color: "#457B9D" }}>Team Size</h3>

          <div style={{ marginLeft: 6, marginBottom: 10, marginTop: 5 }}>
            <TeamSizeSelector />
          </div>

          <h3 style={{ color: "#457B9D", textAlign: "center"  }}>Test Case Names</h3>

          <InputTextArea 
            label="testcase 1, testcase 2, etc..."
            onChange={(e) => setTestCases(e.target.value)}
            initialValue={testcases}
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
          initialValue={desc}
          ></InputTextArea>


          <div style={{ marginLeft: 6, marginBottom: 10, marginTop: 5 }}>
            <Button
              name="Modify"
              color="success"
              onClick={() => {
                // Validate inputs before making the API call
              if (!validateInputs(compname, pic, CombinedCompStart, CombinedCompEnd, desc, pdf, testcases, marker, CombinedRegStart, CombinedRegEnd, maxTeams, min, max, zip)) {
              return; // Stop further execution if validation fails
              }
              else{
                validationCompName(compname);
                if(validcomp==true){
                  validcomp=false
                  setvisible(false);
                  setPickerVisible(false);
                  onButtonEditSubmit();
                  // PostCompDetails(
                  //   compname,
                  //   pic,
                  //   CombinedCompStart,
                  //   CombinedCompEnd,
                  //   desc,
                  //   pdf,
                  //   getNumTestcases(testcases),
                  //   testcases,
                  //   marker,
                  //   CombinedRegStart,
                  //   CombinedRegEnd,
                  //   maxTeams,
                  //   min,
                  //   max,
                  //   zip
                  // );
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
      <Box sx={{ height: "100%", width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 50,
              },
            },
          }}
          pageSizeOptions={[50]}
        />
      </Box>
    </Box>
  );
}
