import React from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'
import Centralize from '../Centralize'
import Icon from '../Icon'
import { sizeTypes, statusTypes } from './propTypes'

export const propTypes = {
  borderColor: PropTypes.string,
  icon: PropTypes.string,
  inline: PropTypes.bool,
  isUnread: PropTypes.bool,
  outerBorderColor: PropTypes.string,
  size: sizeTypes,
  status: statusTypes,
  style: PropTypes.object,
  title: PropTypes.string,
}

const defaultProps = {
  isUnread: false,
  size: 'sm',
  status: 'online',
  style: {},
}

const StatusDot = props => {
  const {
    borderColor,
    children,
    className,
    icon,
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
    icon && 'is-icon',
    inline && 'is-inline',
    isUnread && 'is-unread',
    size && `is-${size}`,
    status && `is-${status}`,
    className
  )

  const componentStyle = Object.assign(style, {
    borderColor: borderColor || null,
    boxShadow: outerBorderColor ? `0 0 0 2px ${outerBorderColor}` : null,
  })

  const tooltipTitle = title || `Is ${status}`

  const iconMarkup = icon ? (
    <Centralize>
      <div className="c-StatusDot__icon">
        <Icon name={icon} size="20" />
      </div>
    </Centralize>
  ) : null

  return (
    <div
      className={componentClassName}
      style={componentStyle}
      title={tooltipTitle}
      {...rest}
    >
      {iconMarkup}
    </div>
  )
}

StatusDot.propTypes = propTypes
StatusDot.defaultProps = defaultProps
StatusDot.displayName = 'StatusDot'

export default StatusDot
