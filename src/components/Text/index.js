import React from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'

const propTypes = {
  className: PropTypes.string,
  disableSelect: PropTypes.bool,
  faint: PropTypes.bool,
  muted: PropTypes.bool,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  state: PropTypes.string,
  subtle: PropTypes.bool,
  truncate: PropTypes.bool
}
const defaultProps = {
  disableSelect: false,
  truncate: false
}

const Text = props => {
  const {
    disableSelect,
    faint,
    muted,
    size,
    state,
    subtle,
    truncate
  } = props

  const className = classNames(
    'c-Text',
    disableSelect && 'is-disableSelect',
    faint && 'is-faint',
    muted && 'is-muted',
    size && `is-${size}`,
    state && `is-${state}`,
    subtle && 'is-subtle',
    truncate && 'is-truncate',
    props.className
  )

  return (
    <span className={className}>
      {props.children}
    </span>
  )
}

Text.propTypes = propTypes
Text.defaultProps = defaultProps

export default Text
