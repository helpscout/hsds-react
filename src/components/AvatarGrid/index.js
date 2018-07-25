// @flow
import React, { PureComponent as Component } from 'react'
import classNames from '../../utilities/classNames'
import AnimateGroup from '../AnimateGroup'
import Animate from '../Animate'
import Avatar from '../Avatar'
import type { AvatarShape, AvatarSize } from '../Avatar/types'

type Props = {
  animationEasing: string,
  animationSequence: string,
  animationStagger: number,
  center: boolean,
  children?: any,
  className?: string,
  max: number,
  shape: AvatarShape,
  size: AvatarSize,
}

class AvatarGrid extends Component<Props> {
  static defaultProps = {
    animationEasing: 'bounce',
    animationSequence: 'fade',
    animationStagger: 20,
    center: true,
    max: 9,
    shape: 'rounded',
    size: 'md',
  }

  render() {
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

    const avatars = React.Children.toArray(children).filter(
      child => child.type && child.type === Avatar
    )

    const totalAvatarCount = avatars.length
    const avatarList =
      max && totalAvatarCount > max ? avatars.slice(0, max - 1) : avatars
    const additionalAvatarCount = totalAvatarCount - avatarList.length

    const componentWrapperClassName = classNames(
      'c-AvatarGridWrapper',
      center && 'is-center'
    )
    const componentClassName = classNames('c-AvatarGrid', className)

    const additionalAvatarMarkup = additionalAvatarCount ? (
      <Animate
        key="AvatarGrid__additionalAvatarMarkup"
        easing={animationEasing}
        sequence={animationSequence}
      >
        <div className="c-AvatarGrid__item is-additional">
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

    const avatarMarkup = avatarList.map(avatar => {
      const composedAvatar = React.cloneElement(avatar, {
        shape,
        size,
      })

      return (
        <Animate
          key={avatar.key}
          easing={animationEasing}
          sequence={animationSequence}
        >
          <div className="c-AvatarGrid__item">{composedAvatar}</div>
        </Animate>
      )
    })

    return (
      <div className={componentWrapperClassName}>
        <div className="c-AvatarGridContainer">
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

export default AvatarGrid
