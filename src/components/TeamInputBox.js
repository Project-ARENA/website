import React from "react";

import Button from '../components/button'
import InputBoxForInfo from "./input-box-for-info";
import "./TeamInputBox.css";

export default function TeamInputBox(props) {
  const { rootClassName, title, label, buttonText , name, onClick, code} = props;
  return (
    <div className={`team-input-box ${rootClassName} `}>
      <div className="team-input-box-container">
        <div className="team-input-box-container1">
            <span className="team-input-box-text">{title}</span>
        </div>
        <h1 className="team-input-box-text1">{label}</h1>
        <div className = "Sayf">
        <InputBoxForInfo buttonText={buttonText}></InputBoxForInfo>
        <Button className="team-input-box-button"
          name={name}
          onClick={onClick}
        ></Button>
        </div>
        <br></br>
        <span className="team-input-box-text">{code}</span>
      </div>
    </div>
  );
}
