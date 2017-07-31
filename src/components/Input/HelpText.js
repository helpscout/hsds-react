import React from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'

const propTypes = {
  className: PropTypes.string,
  state: PropTypes.string
}

const HelpText = props => {
  const {
    state
  } = props

  const className = classNames(
    'c-InputHelpText',
    state && `is-${state}`,
    props.className
  )

  return (
    <div className={className}>
      {props.children}
    </div>
  )
}

HelpText.propTypes = propTypes

export default HelpText
