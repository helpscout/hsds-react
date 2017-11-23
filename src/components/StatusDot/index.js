import React from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'
import { statusTypes } from './propTypes'

export const propTypes = {
  borderColor: PropTypes.string,
  isUnread: PropTypes.bool,
  status: statusTypes,
  title: PropTypes.string
}

const defaultProps = {
  isUnread: false,
  status: 'online'
}

const StatusDot = props => {
  const {
    borderColor,
    children,
    className,
    isUnread,
    status,
    style,
    title,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-StatusDot',
    status && `is-${status}`,
    isUnread && 'is-unread',
    className
  )

  const componentStyle = borderColor ? Object.assign({}, style, {
    borderColor
  }) : style

  const tooltipTitle = title || `Is ${status}`

  return (
    <div
      className={componentClassName}
      style={componentStyle}
      title={tooltipTitle}
      {...rest}
    />
  )
}

StatusDot.propTypes = propTypes
StatusDot.defaultProps = defaultProps
StatusDot.displayName = 'StatusDot'

export default StatusDot
