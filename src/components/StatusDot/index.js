import React from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'
import { sizeTypes, statusTypes } from './propTypes'

export const propTypes = {
  borderColor: PropTypes.string,
  inline: PropTypes.bool,
  isUnread: PropTypes.bool,
  outerBorderColor: PropTypes.string,
  size: sizeTypes,
  status: statusTypes,
  style: PropTypes.object,
  title: PropTypes.string
}

const defaultProps = {
  isUnread: false,
  size: 'sm',
  status: 'online',
  style: {}
}

const StatusDot = props => {
  const {
    borderColor,
    children,
    className,
    inline,
    isUnread,
    outerBorderColor,
    status,
    size,
    style,
    title,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-StatusDot',
    inline && 'is-inline',
    size && `is-${size}`,
    status && `is-${status}`,
    isUnread && 'is-unread',
    className
  )

  const componentStyle = Object.assign(style, {
    borderColor: borderColor || null,
    boxShadow: outerBorderColor ? `0 0 0 2px ${outerBorderColor}` : null
  })

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
