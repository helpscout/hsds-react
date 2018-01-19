import React, {PureComponent as Component} from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'
import AnimateGroup from '../AnimateGroup'
import Animate from '../Animate'
import {
  default as Avatar,
  propTypes as avatarTypes
} from '../Avatar'
import { standardSizeTypes } from '../../constants/propTypes'

export const propTypes = {
  animationEasing: PropTypes.string,
  animationSequence: PropTypes.string,
  animationStagger: PropTypes.number,
  center: PropTypes.bool,
  max: PropTypes.number,
  shape: avatarTypes.shape,
  size: standardSizeTypes
}

const defaultProps = {
  animationEasing: 'bounce',
  animationSequence: 'fade',
  animationStagger: 20,
  center: true,
  max: 9,
  shape: 'rounded',
  size: 'md'
}

class AvatarGrid extends Component {
  render () {
    const {
      animationEasing,
      animationSequence,
      animationStagger,
      center,
      children,
      className,
      max,
      shape,
      size,
      ...rest
    } = this.props

    const avatars = React.Children
      .toArray(children)
      .filter(child => child.type && child.type === Avatar)

    const totalAvatarCount = avatars.length
    const avatarList = max ? avatars.slice(0, max) : avatars
    const additionalAvatarCount = totalAvatarCount - avatarList.length

    const componentWrapperClassName = classNames(
      'c-AvatarGridWrapper',
      center && 'is-center'
    )
    const componentClassName = classNames(
      'c-AvatarGrid',
      className
    )

    const additionalAvatarMarkup = additionalAvatarCount ? (
      <Animate
        key='AvatarGrid__additionalAvatarMarkup'
        easing={animationEasing}
        sequence={animationSequence}
      >
        <div className='c-AvatarGrid__item is-additional'>
          <Avatar
            count={`+${additionalAvatarCount}`}
            light
            name={`+${additionalAvatarCount}`}
            shape={shape}
            size={size}
          />
        </div>
      </Animate>
    ) : null

    const avatarMarkup = avatarList.map((avatar) => {
      const composedAvatar = React.cloneElement(avatar, {
        shape,
        size
      })

      return (
        <Animate
          key={avatar.key}
          easing={animationEasing}
          sequence={animationSequence}
        >
          <div className='c-AvatarGrid__item'>
            {composedAvatar}
          </div>
        </Animate>
      )
    })

    return (
      <div className={componentWrapperClassName}>
        <div className='c-AvatarGridContainer'>
          <AnimateGroup
            className={componentClassName}
            stagger
            staggerDelay={animationStagger}
            {...rest}
          >
            {avatarMarkup}
            {additionalAvatarMarkup}
          </AnimateGroup>
        </div>
      </div>
    )
  }
}

AvatarGrid.propTypes = propTypes
AvatarGrid.defaultProps = defaultProps
AvatarGrid.displayName = 'AvatarGrid'

export default AvatarGrid
