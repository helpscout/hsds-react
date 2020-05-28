import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '../../utilities/classNames'
import { AvatarUI } from './Skeleton.Avatar.css'
import { config as avatarConfig } from '../Avatar/Avatar.css'

class SkeletonAvatar extends React.PureComponent {
  static displayName = 'Skeleton.Avatar'
  static defaultProps = {
    size: 'md',
    shape: 'circle',
    withAnimations: true,
  }

  render() {
    const { className, children, shape, size, ...rest } = this.props

    const componentClassName = classNames(
      'c-SkeletonAvatar',
      shape && `is-${shape}`,
      size && `is-${size}`,
      className
    )

    return <AvatarUI {...rest} className={componentClassName} />
  }
}

SkeletonAvatar.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Shape of the avatar. */
  shape: PropTypes.oneOf(['circle', 'rounded', 'square']),
  /** Size of the avatar. */
  size: PropTypes.oneOf(Object.keys(avatarConfig.size)),
  /** Enables animations for the component. */
  withAnimations: PropTypes.bool,
}

export default SkeletonAvatar
