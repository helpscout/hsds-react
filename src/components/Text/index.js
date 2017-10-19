import React from 'react'
import PropTypes from 'prop-types'
import { sizeTypes } from './propTypes'
import classNames from '../../utilities/classNames'
import { stateTypes } from '../../constants/propTypes'

export const propTypes = {
  className: PropTypes.string,
  disableSelect: PropTypes.bool,
  faint: PropTypes.bool,
  lineHeightReset: PropTypes.bool,
  muted: PropTypes.bool,
  size: sizeTypes,
  state: stateTypes,
  subtle: PropTypes.bool,
  truncate: PropTypes.bool,
  wordWrap: PropTypes.bool
}

const defaultProps = {
  disableSelect: false,
  truncate: false
}

const Text = props => {
  const {
    children,
    className,
    disableSelect,
    faint,
    lineHeightReset,
    muted,
    size,
    state,
    subtle,
    truncate,
    wordWrap,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-Text',
    disableSelect && 'is-disableSelect',
    faint && 'is-faint',
    muted && 'is-muted',
    lineHeightReset && 'is-line-height-reset',
    size && `is-${size}`,
    state && `is-${state}`,
    subtle && 'is-subtle',
    truncate && 'is-truncate',
    wordWrap && 'is-word-wrap',
    className
  )

  return (
    <span className={componentClassName} {...rest}>
      {children}
    </span>
  )
}

Text.propTypes = propTypes
Text.defaultProps = defaultProps

export default Text
