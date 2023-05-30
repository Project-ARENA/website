import { Input } from "@mui/material";
import React, { useState } from "react";
import Button from '../components/button';
import "./team-manager.css";
import Swal from "sweetalert2";
import axios from "axios";
import { useEffect } from "react";
import { Padding } from "@mui/icons-material";

const user_id = sessionStorage.getItem('userID');
const team_code = sessionStorage.getItem('teamCode');

const onButtonDelete = (e) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You are about to delete the team!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Delete",
  }).then(async (result) => {
    if (result.isConfirmed) {
      axios.post(`http://localhost:3002/api/post/delete/team/${team_code}`, {
        team_code: team_code,
      });

        Swal.fire("Deleted!", "Team has been deleted!", "success").then(() => {
          window.location.href = 'http://localhost:3000/player-portal-competitions'
        });
    }
  });
};

const onButtonLeave = (e) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You are about to leave the team!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Leave",
  }).then(async (result) => {
    if (result.isConfirmed) {
      axios.post(`http://localhost:3002/api/post/leave/team/${user_id}/${team_code}`, {
      user_id: user_id,  
      team_code: team_code,
      });
      window.location.href = 'http://localhost:3000/player-portal-competitions'

    }
  });
};

export default function TeamManager(props) {
  const { rootClassName, TeamName, teamMembers, location, onCopyClick} = props;
  const [isCaptain, setCaptain] = useState(false);

  useEffect (() => {
    axios.get(`http://localhost:3002/api/get/doesCodeExist/${team_code}`)
    .then((response) => {
      if (user_id == response.data[0].user_id) {
        console.log("User is captain");
        setCaptain(true);
      }
      });
  }, []);
  return (
    <div className="team-manager-container">
      <div className="team-manager-container1">
        <span className="team-manager-text"></span>
        
      </div>
      <h1 className="team-manager-text1">{TeamName}</h1>
      <br/>
      <h2>Team Members</h2>
      <br/>
      {teamMembers.map((member, index) => (
        <div key={index} style={{marginBottom: "5px"}}>
          <span className={`team-manager-text${index+2}`}>{member}</span>
        </div>
      ))}
      <br/>
      <span className="team-manager-location">Location: {location}</span>

      {/* Buttons*/}
      <Button
        id={"copy-button"}
        className="team-manager-copy-button"
        name="Copy Team Code"
        onClick={onCopyClick}
        />

      {/* <div style={{paddingBottom: "5px" }}> */}
        {isCaptain && (
        <Button
          id={"delete-button"}
          className="team-manager-delete-button"
          name={"Delete team"}
          onClick={onButtonDelete}
          style={{ marginTop: "25px" }}
          color={"danger"}
        />
        )}
      {/* </div> */}
      
      {!isCaptain && (
      <Button
        id={"leave-button"}
        className="team-manager-delete-button"
        name={"Leave Team"}
        onClick={onButtonLeave}
        style={{ marginTop: "25px" }}
        color={"danger"}
      />
      )}

    </div>
  );
}
