// @flow
import type { AvatarShape, AvatarSize } from '../Avatar/types'
import React, { PureComponent as Component } from 'react'
import Avatar from '../Avatar'
import AnimateGroup from '../AnimateGroup'
import Animate from '../Animate'
import { classNames } from '../../utilities/classNames.ts'
import {
  namespaceComponent,
  isComponentNamed,
} from '../../utilities/component.ts'
import { AvatarListWrapperUI } from './styles/AvatarList.css.js'
import { COMPONENT_KEY } from './utils'
import { COMPONENT_KEY as AVATAR_KEY } from '../Avatar/utils'

type Props = {
  animationEasing: string,
  animationSequence: string,
  animationStagger: number,
  avatarsClassName: string,
  borderColor?: string,
  children?: any,
  className?: string,
  max: number,
  outerBorderColor?: string,
  shape: AvatarShape,
  showStatusBorderColor: boolean,
  size: AvatarSize,
}

class AvatarList extends Component<Props> {
  static defaultProps = {
    animationEasing: 'ease',
    animationSequence: 'fade',
    animationStagger: 10,
    max: 4,
    shape: 'rounded',
    showStatusBorderColor: false,
    size: 'sm',
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
      outerBorderColor,
      shape,
      showStatusBorderColor,
      size,
      ...rest
    } = this.props

    const avatars = React.Children.toArray(children).filter(child =>
      isComponentNamed(child, AVATAR_KEY)
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
          borderColor={borderColor}
          className={avatarsClassName}
          count={`+${additionalAvatarCount}`}
          light
          outerBorderColor={outerBorderColor}
          name={`+${additionalAvatarCount}`}
          shape={shape}
          showStatusBorderColor={showStatusBorderColor}
          size={size}
        />
      </Animate>
    ) : null

    const avatarMarkup = avatarList.map(avatar => {
      const composedAvatar = React.cloneElement(avatar, {
        borderColor,
        className: classNames(avatar.props.className, avatarsClassName),
        outerBorderColor,
        shape,
        showStatusBorderColor,
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
          {...rest}
          className={componentClassName}
          stagger
          staggerDelay={animationStagger}
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
