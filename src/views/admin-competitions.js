import React from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
import DataGrid from "../components/datagrid";
import './admin-competitions.css'
import Button from '../components/button'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Modal from 'react-modal';
import { useState } from 'react';
import InputBoxForInfo from "../components/input-box-for-info";

import { PickerOverlay } from 'filestack-react';
import CalenderComp from '../components/CalenderComp.js';

import { render } from "react-dom";
import { useForm } from "react-cool-form";

import "./styles.scss";
// const model =()=>{
//   return(
//     <div>

//     </div>
//   )
// }

const Field = ({ label, id, error, ...rest }) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <input id={id} {...rest} />
    {error && <p>{error}</p>}
  </div>
);

function CompetitionModal() {
  const [visible, setVisible] = useState(false);
  const [compname, setCompname] = useState('');
  const [picture, setPicture] = useState(null);
  const [Calendar,setCalender] = useState('');
}

function GenGrid() {
  const [rows, setData] = React.useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  React.useEffect(() => {
    axios
      .get("http://localhost:3002/api/get/competitions")
      .then((response) => {
        const data = response.data.map((data, index) => ({
          id: index + 1,
          competition_id: data.competition_id,
          competition_name: data.competition_name,
          competition_views: data.competition_views,
          competition_image: data.competition_image,
          competition_leaderboard: data.competition_leaderboard,
          competition_startdate: data.competition_startdate,
          competition_enddate: data.competition_enddate,
          competition_info: data.competition_info,
          competition_testcases: data.competition_testcases,
        }));
        setData(data);
      });
  }, []);

  const columns = [
    { field: 'competition_id', headerName: 'ID', width: 150 },
    { field: 'competition_name', headerName: 'Title', width: 150 },
    { field: 'competition_views', headerName: 'Views', width: 150 },
    { field: 'competition_image', headerName: 'Image', width: 150 },
    { field: 'competition_leaderboard', headerName: 'Leaderboard', width: 150 },
    { field: 'competition_startdate', headerName: 'Start Date', width: 150 },
    { field: 'competition_enddate', headerName: 'End Date', width: 150 },
    { field: 'competition_info', headerName: 'Info', width: 150 },
    { field: 'competition_testcases', headerName: 'Test Cases', width: 150 },
  ];

  return <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
}

const AdminCompetitions = (props) => {
  const [compname, setCompname] = useState("");
  const [visible, setvisible] = useState(false)
  const [pickerVisible, setPickerVisible] = useState(false);

  const handleUploadDone = (res) => {
    console.log(res.filesUploaded[0].url);
  };

  const handleClosePicker = () => {
    setPickerVisible(false); // Hide the picker
  };
  

  
  const { form, use } = useForm({
    // (Strongly advise) Provide the default values just like we use React state
    defaultValues: { username: "", email: "", password: "" },
    // The event only triggered when the form is valid
    onSubmit: (values) => alert(JSON.stringify(values, undefined, 2))
  });
  // We can enable the "errorWithTouched" option to filter the error of an un-blurred field
  // Which helps the user focus on typing without being annoyed by the error message
  const errors = use("errors", { errorWithTouched: true });

  return (

    <div className="admin-competitions-container">
      <div className="admin-competitions-button-container">
        <div className="custom-modal">
          <Modal isOpen={visible} style={{ content: { width: '70%', height: '70%', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }, overlay: { zIndex: 1000 } }} >

            <h1>Create a Competition</h1>

            <form ref={form} noValidate>
      <Field
        label="Competition Name"
        id="username"
        name="username"
        // Support built-in validation
        required
        error={errors.username}
      />
      <Button name="Upload Team Picture"
              onClick={() => {
                setPickerVisible(true);
                console.log("Picker clicked");
              }}
            />

{pickerVisible && (
 <div className="center">
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
</div>
)}
            <CalenderComp>

            </CalenderComp>
      <input type="submit" />
    </form>
    <Button
                name="Close"
                onClick={() => {
                  setvisible(false)
                  setPickerVisible(false);
                  console.log("button clicked");
                }}
              // rootClassName="button-root-class-name2"
              />
          </Modal>
        </div>


      </div>
      <div data-role="Header" className="admin-competitions-navbar-container">
        <div className="admin-competitions-navbar">
          <div className="admin-competitions-left-side">
            <img
              alt="image"
              src="https://play.teleporthq.io/static/svg/default-img.svg"
              className="admin-competitions-image"
            />
            <div
              data-role="BurgerMenu"
              className="admin-competitions-burger-menu"
            >
              <svg viewBox="0 0 1024 1024" className="admin-competitions-icon">
                <path d="M128 256h768v86h-768v-86zM128 554v-84h768v84h-768zM128 768v-86h768v86h-768z"></path>
              </svg>
            </div>
            <div className="admin-competitions-links-container">
              <Link to="/admin-home" className="admin-competitions-link">
                HOME
              </Link>
              <Link to="/admin-competitions" className="admin-competitions-link1 Anchor">
                COMPETITIONS
              </Link>
              <Link to="/admin-teams" className="admin-competitions-link2 Anchor">
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
              <Link to="/admin-competitions" className="admin-competitions-link1 Anchor">
                COMPETITIONS
              </Link>
              <Link to="/admin-teams" className="admin-competitions-link2 Anchor">
                TEAMS
              </Link>
            </div>
          </div>
        </div>
      </div>



      <div className="grid-container">
        <GenGrid />
      </div>

      <Button  name="Create Competition"
          onClick={() => {
            setvisible(true)
            console.log("button clicked");
          }}
        // rootClassName="button-root-class-name2"
        />
    </div>

  )
}
export default AdminCompetitions