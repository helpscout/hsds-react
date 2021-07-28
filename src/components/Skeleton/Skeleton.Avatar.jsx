import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import classNames from 'classnames'
import { AvatarUI } from './Skeleton.Avatar.css'
import { config as avatarConfig } from '../Avatar/Avatar.css'

class SkeletonAvatar extends React.PureComponent {
  render() {
    const { className, children, shape, size, ...rest } = this.props
    const componentClassName = classNames(
      'c-SkeletonAvatar',
      shape && `is-${shape}`,
      size && `is-${size}`,
      className
    )

    return <AvatarUI {...getValidProps(rest)} className={componentClassName} />
  }
}

SkeletonAvatar.defaultProps = {
  'data-cy': 'SkeletonAvatar',
  size: 'md',
  shape: 'circle',
  withAnimations: true,
}

SkeletonAvatar.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  /** Shape of the avatar. */
  shape: PropTypes.oneOf(['circle', 'rounded', 'square']),
  /** Size of the avatar. */
  size: PropTypes.oneOf(Object.keys(avatarConfig.size)),
  /** Enables animations for the component. */
  withAnimations: PropTypes.bool,
}

export default SkeletonAvatar
