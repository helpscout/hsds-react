import React from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/constants'

const propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object
}
const defaultProps = {
  onClick: noop,
  style: {}
}

const Overlay = props => {
  const { onClick, style } = props

  const className = classNames('c-Overlay', props.className)

  return (
    <div className={className} style={style} role='dialog' onClick={onClick}>
      {props.children}
    </div>
  )
}

Overlay.propTypes = propTypes
Overlay.defaultProps = defaultProps

export default Overlay
