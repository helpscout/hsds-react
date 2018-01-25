import React from 'react'
import PropTypes from 'prop-types'
import { sizeTypes } from './propTypes'
import classNames from '../../utilities/classNames'
import { stateTypes, textShadeTypes } from '../../constants/propTypes'

export const propTypes = {
  allCaps: PropTypes.bool,
  block: PropTypes.bool,
  className: PropTypes.string,
  center: PropTypes.bool,
  disableSelect: PropTypes.bool,
  faint: PropTypes.bool,
  lineHeightReset: PropTypes.bool,
  linkStyle: PropTypes.bool,
  muted: PropTypes.bool,
  noWrap: PropTypes.bool,
  selector: PropTypes.oneOf(['span', 'pre', 'samp']),
  shade: textShadeTypes,
  size: sizeTypes,
  state: stateTypes,
  subtle: PropTypes.bool,
  truncate: PropTypes.bool,
  wordWrap: PropTypes.bool
}

const defaultProps = {
  center: false,
  disableSelect: false,
  linkStyle: false,
  selector: 'span',
  truncate: false
}

const Text = props => {
  const {
    allCaps,
    block,
    children,
    className,
    center,
    disableSelect,
    faint,
    lineHeightReset,
    linkStyle,
    muted,
    noWrap,
    selector,
    shade,
    size,
    state,
    subtle,
    truncate,
    wordWrap,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-Text',
    allCaps && 'is-all-caps',
    block && 'is-block',
    center && 'is-center',
    disableSelect && 'is-disableSelect',
    faint && 'is-faint',
    muted && 'is-muted',
    noWrap && 'is-no-wrap',
    lineHeightReset && 'is-line-height-reset',
    linkStyle && 'is-linkStyle',
    selector && `is-${selector}`,
    shade && `is-${shade}`,
    size && `is-${size}`,
    state && `is-${state}`,
    subtle && 'is-subtle',
    truncate && 'is-truncate',
    wordWrap && 'is-word-wrap',
    className
  )

  return React.createElement(
    selector,
    {
      ...rest,
      className: componentClassName
    },
    children
  )
}

Text.propTypes = propTypes
Text.defaultProps = defaultProps

export default Text
