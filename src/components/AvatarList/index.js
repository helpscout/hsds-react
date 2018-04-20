import React, {PureComponent as Component} from 'react'
import PropTypes from 'prop-types'
import {
  default as Avatar,
  propTypes as avatarTypes
} from '../Avatar'
import AnimateGroup from '../AnimateGroup'
import Animate from '../Animate'
import classNames from '../../utilities/classNames'
import { standardSizeTypes } from '../../constants/propTypes'

export const propTypes = {
  animationEasing: PropTypes.string,
  animationSequence: PropTypes.string,
  animationStagger: PropTypes.number,
  avatarsClassName: PropTypes.string,
  max: PropTypes.number,
  shape: avatarTypes.shape,
  size: standardSizeTypes
}

const defaultProps = {
  animationEasing: 'ease',
  animationSequence: 'fade',
  animationStagger: 10,
  max: 4,
  shape: 'rounded',
  size: 'sm'
}

class AvatarList extends Component {
  render () {
    const {
      animationEasing,
      animationSequence,
      animationStagger,
      avatarsClassName,
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
    const avatarList = max && totalAvatarCount > max
      ? avatars.slice(0, (max - 1))
      : avatars
    const additionalAvatarCount = totalAvatarCount - avatarList.length

    const componentClassName = classNames(
      'c-AvatarList',
      'c-List',
      'c-List--inline',
      'c-List--xs',
      'is-display-flex',
      'is-inline-sm',
      className
    )

    const additionalAvatarMarkup = additionalAvatarCount ? (
      <Animate
        key='AvatarList__additionalAvatarMarkup'
        className='c-AvatarList__item c-List__item'
        easing={animationEasing}
        sequence={animationSequence}
      >
        <Avatar
          className={avatarsClassName}
          count={`+${additionalAvatarCount}`}
          light
          name={`+${additionalAvatarCount}`}
          shape={shape}
          size={size}
        />
      </Animate>
    ) : null

    const avatarMarkup = avatarList.map((avatar) => {
      const composedAvatar = React.cloneElement(avatar, {
        className: classNames(avatar.props.className, avatarsClassName),
        shape,
        size
      })
      return (
        <Animate
          className='c-AvatarList__item c-List__item'
          easing={animationEasing}
          key={avatar.key}
          sequence={animationSequence}
        >
          {composedAvatar}
        </Animate>
      )
    })

    return (
      <AnimateGroup
        className={componentClassName}
        stagger
        staggerDelay={animationStagger}
        {...rest}
      >
        {avatarMarkup}
        {additionalAvatarMarkup}
      </AnimateGroup>
    )
  }
}

AvatarList.propTypes = propTypes
AvatarList.defaultProps = defaultProps
AvatarList.displayName = 'AvatarList'

export default AvatarList
