import React from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'
import { truncateMiddle } from '../../utilities/strings'
import { truncateTypes } from './propTypes'

const propTypes = {
  children: PropTypes.string,
  ellipsis: PropTypes.node,
  limit: PropTypes.number,
  end: PropTypes.number,
  start: PropTypes.number,
  type: truncateTypes
}

const defaultProps = {
  children: '',
  ellipsis: '…',
  limit: 0,
  type: 'auto'
}

const Truncate = props => {
  const {
    children,
    className,
    ellipsis,
    limit,
    type,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-Truncate',
    type && `is-${type}`,
    className
  )

  let truncateStart
  let truncateEnd

  switch (type) {
    case 'start':
      truncateStart = 0
      truncateEnd = limit
      break
    case 'middle':
      truncateStart = Math.floor(limit / 2)
      truncateEnd = Math.floor(limit / 2)
      break
    default:
      truncateStart = limit
      truncateEnd = 0
  }

  const word = type !== 'auto' ? truncateMiddle(
    children,
    truncateStart,
    truncateEnd,
    ellipsis
  ) : children

  return (
    <span className={componentClassName} {...rest}>
      {word}
    </span>
  )
}

Truncate.propTypes = propTypes
Truncate.defaultProps = defaultProps

export default Truncate
