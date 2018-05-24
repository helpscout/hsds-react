import React from 'react'
import PropTypes from 'prop-types'
import Avatar from '../Avatar'
import { shapeTypes, sizeTypes } from '../Avatar/propTypes'
import classNames from '../../utilities/classNames'

/**
 * A enhanced wrapper that for Avatar, allowing for an easier way to indicate
 * Avatar state.
 */
const StatusAvatar = props => {
  const { className, isOnline, ...rest } = props

  const componentClassName = classNames(
    'c-StatusAvatar',
    isOnline ? 'is-online' : 'is-offline',
    className
  )

  const status = isOnline ? 'online' : 'offline'
  const statusIcon = isOnline ? 'tick-small' : 'cross-small'

  return (
    <Avatar
      {...rest}
      className={componentClassName}
      status={status}
      statusIcon={statusIcon}
    />
  )
}

StatusAvatar.propTypes = {
  /**
   * Determines the status icon, and represents Avatar online state.
   */
  isOnline: PropTypes.bool,
  /**
   * Shape of the avatar.
   */
  shape: shapeTypes,
  /**
   * Size of the avatar.
   */
  size: sizeTypes,
}

StatusAvatar.defaultProps = {
  isOnline: true,
  shape: 'rounded',
  size: 'smmd',
}

export default StatusAvatar
