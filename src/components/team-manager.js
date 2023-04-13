import { Input } from "@mui/material";
import React, { useState } from "react";
import Button from '../components/button';
import InputBoxForInfo from "./input-box-for-info";
import "./team-manager.css";

export default function TeamManager(props) {
  const { rootClassName, TeamName,TeamMember1,TeamMember2,TeamMember3,TeamMember4, LonClick,Ldisabled, DName, DonClick,Ddisabled } = props;
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="team-manager-container">
      <div className="team-manager-container1">
        <span className="team-manager-text">TeamManager</span>
      </div>
      <h1 className="team-manager-text1">{TeamName}</h1>
      <span className="team-manager-text2">{TeamMember1}</span>
      <span className="team-manager-text3">{TeamMember2}</span>
      <span className="team-manager-text4">{TeamMember3}</span>
      <span className="team-manager-text5">{TeamMember4}</span>
      <span className="team-manager-location">Location:</span>
      <select>
        <option value="Gauteng">Gauteng</option>
        <option value="KwaZulu-Natal">KwaZulu-Natal</option>
        <option value="Western Cape">Western Cape</option>
      </select>
      <Button
            className="team-manager-location-button"
            name="Update Location"
            disabled = {Ldisabled}
            onClick={() => LonClick(inputValue)}
        />
      <Button
            className="team-manager-delete-button"
            name={DName}
            disabled = {Ddisabled}
            onClick={() => DonClick(inputValue)}
        />
    </div>
    // <div className={`team-input-box ${rootClassName}`}>
    //   <div className="team-input-box-container" data-testid="team-input">
    //     <div className="team-input-box-container1">
    //       <span className="team-input-box-text">{title}</span>
    //     </div>
    //     <h1 className="team-input-box-text1">{label}</h1>
    //     <div className="Sayf">
    //       <InputBoxForInfo
    //         buttonText="Team Name"
    //         value={inputValue}
    //         onChange={handleInputChange}
    //         placeholder="Enter your input"
    //         data-testid="team-input"
    //       />
    //       <Button
    //         className="team-input-box-button"
    //         name={name}
    //         disabled = {disabled}
    //         onClick={() => onClick(inputValue)}
    //       />
    //     </div>
    //     <br />
    //     <span className="team-input-box-text">{code}</span>
    //   </div>
    // </div>
  );
}
