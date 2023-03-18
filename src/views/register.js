import React from 'react'
import { Link } from 'react-router-dom'

import { Helmet } from 'react-helmet'

import InputBoxForInfo from '../components/input-box-for-info'
import Button from '../components/button'
import './register.css'

const Register = (props) => {
  return (
    <div className="register-container">
      <Helmet>
        <title>register - Project ARENA</title>
        <meta property="og:title" content="register - Project ARENA" />
      </Helmet>
      <div className="register-container1">
        <div className="register-container2">
          <Link to="/" className="register-navlink">
            <svg
              viewBox="0 0 877.7142857142857 1024"
              className="register-backbtn"
            >
              <path d="M519.429 797.143l58.286-58.286c14.286-14.286 14.286-37.143 0-51.429l-175.429-175.429 175.429-175.429c14.286-14.286 14.286-37.143 0-51.429l-58.286-58.286c-14.286-14.286-37.143-14.286-51.429 0l-259.429 259.429c-14.286 14.286-14.286 37.143 0 51.429l259.429 259.429c14.286 14.286 37.143 14.286 51.429 0zM877.714 512c0 242.286-196.571 438.857-438.857 438.857s-438.857-196.571-438.857-438.857 196.571-438.857 438.857-438.857 438.857 196.571 438.857 438.857z"></path>
            </svg>
          </Link>
        </div>
      </div>
      <div className="register-container3">
        <div className="register-container4">
          <span className="register-text">
            <span>Register</span>
            <br></br>
          </span>
        </div>
        <div className="register-container5">
          <InputBoxForInfo
            text="NAME"
            rootClassName="input-box-for-info-root-class-name"
          ></InputBoxForInfo>
          <InputBoxForInfo rootClassName="input-box-for-info-root-class-name1"></InputBoxForInfo>
          <InputBoxForInfo
            text="EMAIL"
            rootClassName="input-box-for-info-root-class-name2"
          ></InputBoxForInfo>
          <InputBoxForInfo
            text="USERNAME"
            rootClassName="input-box-for-info-root-class-name3"
          ></InputBoxForInfo>
          <InputBoxForInfo
            text="PASSWORD"
            rootClassName="input-box-for-info-root-class-name4"
          ></InputBoxForInfo>
          <Button
            button="Register"
            rootClassName="button-root-class-name"
          ></Button>
        </div>
        <div className="register-container6">
          <span className="register-text3">Already have an account? </span>
          <Link to="/login" className="register-navlink1 button">
            Login here
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register
