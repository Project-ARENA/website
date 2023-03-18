import React from 'react'

import PropTypes from 'prop-types'

import './input-box-for-info.css'

const InputBoxForInfo = (props) => {
  return (
    <div className={`input-box-for-info-container ${props.rootClassName} `}>
      <span className="input-box-for-info-text">{props.text}</span>
      <input type="text" className="input-box-for-info-textinput input" />
    </div>
  )
}

InputBoxForInfo.defaultProps = {
  text: 'Surname',
  textinput_placeholder: 'placeholder',
  rootClassName: '',
}

InputBoxForInfo.propTypes = {
  text: PropTypes.string,
  textinput_placeholder: PropTypes.string,
  rootClassName: PropTypes.string,
}

export default InputBoxForInfo
