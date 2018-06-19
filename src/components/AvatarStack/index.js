// @flow
import React, { PureComponent as Component } from 'react'
import Avatar from '../Avatar'
import AnimateGroup from '../AnimateGroup'
import Animate from '../Animate'
import classNames from '../../utilities/classNames'
import { standardSizeTypes } from '../../constants/propTypes'
import type { AvatarShape, AvatarSize } from '../Avatar/types'

type Props = {
  animationEasing: string,
  animationSequence: string,
  animationStagger: number,
  avatarsClassName: string,
  borderColor: string,
  children?: any,
  className?: string,
  max: number,
  shape: AvatarShape,
  size: AvatarSize,
}

class AvatarStack extends Component<Props> {
  static defaultProps = {
    animationEasing: 'ease',
    animationSequence: 'fade',
    animationStagger: 0,
    borderColor: 'white',
    max: 5,
    shape: 'circle',
    size: 'md',
  }

  render() {
    const {
      animationEasing,
      animationSequence,
      animationStagger,
      avatarsClassName,
      borderColor,
      children,
      className,
      max,
      shape,
      size,
      ...rest
    } = this.props

    const avatars = React.Children.toArray(children).filter(
      child => child.type && child.type === Avatar
    )

    const totalAvatarCount = avatars.length
    const avatarList =
      max && totalAvatarCount > max ? avatars.slice(0, max - 1) : avatars
    const additionalAvatarCount = totalAvatarCount - avatarList.length

    const componentClassName = classNames('c-AvatarStack', className)

    const additionalAvatarMarkup = additionalAvatarCount ? (
      <Animate
        key="AvatarGrid__additionalAvatarMarkup"
        easing={animationEasing}
        sequence={animationSequence}
      >
        <div className="c-AvatarStack__item is-additional">
          <Avatar
            borderColor={borderColor}
            className={avatarsClassName}
            count={`+${additionalAvatarCount}`}
            name={`+${additionalAvatarCount}`}
            shape={shape}
            size={size}
          />
        </div>
      </Animate>
    ) : null

    const avatarMarkup = avatarList.map((avatar, index) => {
      const zIndex = avatarList.length - index + 1
      const composedAvatar = React.cloneElement(avatar, {
        borderColor,
        className: classNames(avatar.props.className, avatarsClassName),
        shape,
        size,
      })

      return (
        <Animate
          key={avatar.key}
          easing={animationEasing}
          sequence={animationSequence}
          style={{ ...avatar.style, zIndex }}
        >
          <div className="c-AvatarStack__item">{composedAvatar}</div>
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

export default AvatarStack
