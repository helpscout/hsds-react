// @flow
import type { AvatarShape, AvatarSize } from '../Avatar/types'
import React, { PureComponent as Component } from 'react'
import Avatar from '../Avatar'
import AnimateGroup from '../AnimateGroup'
import Animate from '../Animate'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { AvatarListWrapperUI } from './styles/AvatarList.css.js'
import { COMPONENT_KEY } from './utils'

type Props = {
  animationEasing: string,
  animationSequence: string,
  animationStagger: number,
  avatarsClassName: string,
  children?: any,
  className?: string,
  max: number,
  shape: AvatarShape,
  size: AvatarSize,
}

class AvatarList extends Component<Props> {
  static defaultProps = {
    animationEasing: 'ease',
    animationSequence: 'fade',
    animationStagger: 10,
    max: 4,
    shape: 'rounded',
    size: 'sm',
  }

  render() {
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

    const avatars = React.Children.toArray(children).filter(
      child => child.type && child.type === Avatar
    )

    const totalAvatarCount = avatars.length
    const avatarList =
      max && totalAvatarCount > max ? avatars.slice(0, max - 1) : avatars
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
        key="AvatarList__additionalAvatarMarkup"
        className="c-AvatarList__item c-List__item"
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

    const avatarMarkup = avatarList.map(avatar => {
      const composedAvatar = React.cloneElement(avatar, {
        className: classNames(avatar.props.className, avatarsClassName),
        shape,
        size,
      })
      return (
        <Animate
          className="c-AvatarList__item c-List__item"
          easing={animationEasing}
          key={avatar.key}
          sequence={animationSequence}
        >
          {composedAvatar}
        </Animate>
      )
    })

    return (
      <AvatarListWrapperUI className="c-AvatarListWrapper">
        <AnimateGroup
          className={componentClassName}
          stagger
          staggerDelay={animationStagger}
          {...rest}
        >
          {avatarMarkup}
          {additionalAvatarMarkup}
        </AnimateGroup>
      </AvatarListWrapperUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY)(AvatarList)

export default AvatarList
