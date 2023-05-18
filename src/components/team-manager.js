import { Input } from "@mui/material";
import React, { useState } from "react";
import Button from '../components/button';
import "./team-manager.css";

export default function TeamManager(props) {
  const { rootClassName, TeamName, teamMembers, location, DName, Ddisabled, onCopyClick } = props;

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
        id={"delete-button"}
        className="team-manager-delete-button"
        name={DName}
        disabled={Ddisabled}
        style={{ marginTop: "25px" }}
      />
      <br/>
      <Button
        id={"copy-button"}
        className="team-manager-copy-button"
        name="Copy Team Code"
        onClick={onCopyClick}
        />
    </div>
  );
}
