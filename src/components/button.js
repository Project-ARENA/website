import React from 'react'

import PropTypes from 'prop-types'

import './button.css'

const Button = (props) => {
  return (
    <div className={`button-container ${props.rootClassName} `}>
      <button className="button-button button">{props.button}</button>
    </div>
  )
}

Button.defaultProps = {
  button: 'LOGIN',
  rootClassName: '',
}

Button.propTypes = {
  button: PropTypes.string,
  rootClassName: PropTypes.string,
}

export default Button
