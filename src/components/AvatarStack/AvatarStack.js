// @flow
import type { AvatarShape, AvatarSize } from '../Avatar/types'
import React, { PureComponent as Component } from 'react'
import Avatar from '../Avatar'
import Animate from '../Animate'
import PropProvider from '../PropProvider'
import { classNames } from '../../utilities/classNames'
import {
  namespaceComponent,
  isComponentNamed,
  getComponentKey,
} from '../../utilities/component'
import { isOdd, getMiddleIndex } from '../../utilities/number'
import { AvatarStackV2UI, ItemUI } from './styles/AvatarStack.css.js'
import { COMPONENT_KEY } from './utils'
import { COMPONENT_KEY as AVATAR_KEY } from '../Avatar/utils'

type Props = {
  animationEasing: string,
  animationSequence: string,
  animationStagger: number,
  avatarsClassName: string,
  avatarVersion: number,
  borderColor?: string,
  children?: any,
  className?: string,
  max: number,
  outerBorderColor?: string,
  shape: AvatarShape,
  showStatusBorderColor: boolean,
  size: AvatarSize,
}

class AvatarStack extends Component<Props> {
  static defaultProps = {
    animationEasing: 'ease',
    animationSequence: 'fade',
    animationStagger: 0,
    avatarVersion: 1,
    borderColor: 'white',
    max: 5,
    shape: 'circle',
    showStatusBorderColor: true,
    size: 'md',
  }

  getAvatars = () => {
    return React.Children.toArray(this.props.children).filter(child =>
      isComponentNamed(child, AVATAR_KEY)
    )
  }

  getTotalAvatarCount = () => {
    return this.getAvatars().length
  }

  getCurrentAvatarCount = () => {
    const { max } = this.props
    const count = this.getTotalAvatarCount()

    return count < max ? count : max
  }

  getAvatarList = () => {
    const { max } = this.props

    const avatars = this.getAvatars()
    const totalAvatarCount = avatars.length

    const avatarList =
      max && totalAvatarCount > max ? avatars.slice(0, max - 1) : avatars

    return avatarList
  }

  getAvatarPropsFromIndex = index => {
    const {
      avatarVersion,
      avatarsClassName,
      borderColor,
      outerBorderColor,
      shape,
      size: sizeProp,
      showStatusBorderColor,
    } = this.props
    const currentCount = this.getCurrentAvatarCount()

    let size = 'md'

    if (currentCount === 2) {
      size = 'lg'
    }
    if (currentCount === 1) {
      size = 'xl'
    }

    // Backwards compatibility with Avatar/AvatarStack (V1)
    if (avatarVersion === 1) {
      size = sizeProp
    }

    return {
      Avatar: {
        borderColor,
        className: classNames(avatarsClassName, 'c-AvatarStack__avatar'),
        outerBorderColor,
        shape,
        showStatusBorderColor,
        size,
        version: avatarVersion,
      },
    }
  }

  getAvatarStyleFromIndex = index => {
    const { avatarVersion, max } = this.props
    const currentCount = this.getCurrentAvatarCount()

    let zIndex = max - index

    // Backwards compatibility with Avatar/AvatarStack (V1)
    if (avatarVersion > 1) {
      if (currentCount > 2 && isOdd(currentCount)) {
        if (isOdd(index)) {
          zIndex = zIndex + 1
        }
        if (index === getMiddleIndex(currentCount)) {
          zIndex = zIndex + 2
        }
      }
    }

    return {
      zIndex,
    }
  }

  getAvatarMarkup = () => {
    const { animationEasing, animationSequence } = this.props

    const avatarList = this.getAvatarList()

    const avatarMarkup = avatarList.map((avatar, index) => {
      const key = getComponentKey(avatar, index)

      const avatarProps = this.getAvatarPropsFromIndex(index)
      const avatarStyles = this.getAvatarStyleFromIndex(index)

      return (
        <ItemUI className="c-AvatarStack__item" key={key} style={avatarStyles}>
          <Animate easing={animationEasing} sequence={animationSequence}>
            <PropProvider value={avatarProps}>{avatar}</PropProvider>
          </Animate>
        </ItemUI>
      )
    })

    return avatarMarkup
  }

  getAdditionalAvatarMarkup = () => {
    const {
      animationEasing,
      animationSequence,
      avatarsClassName,
      avatarVersion,
      borderColor,
      outerBorderColor,
      shape,
      showStatusBorderColor,
      size,
    } = this.props

    const avatars = this.getAvatars()
    const avatarList = this.getAvatarList()
    const totalAvatarCount = avatars.length
    const additionalAvatarCount = totalAvatarCount - avatarList.length

    return (
      !!additionalAvatarCount && (
        <Animate
          key="AvatarGrid__additionalAvatarMarkup"
          easing={animationEasing}
          sequence={animationSequence}
        >
          <ItemUI className="c-AvatarStack__item is-additional">
            <Avatar
              borderColor={borderColor}
              className={avatarsClassName}
              count={`+${additionalAvatarCount}`}
              name={`+${additionalAvatarCount}`}
              outerBorderColor={outerBorderColor}
              shape={shape}
              showStatusBorderColor={showStatusBorderColor}
              size={size}
              version={avatarVersion}
            />
          </ItemUI>
        </Animate>
      )
    )
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

    const componentClassName = classNames('c-AvatarStack', className)

    return (
      <AvatarStackV2UI
        {...rest}
        className={componentClassName}
        stagger
        staggerDelay={animationStagger}
      >
        {this.getAvatarMarkup()}
        {this.getAdditionalAvatarMarkup()}
      </AvatarStackV2UI>
    )
  }
}

namespaceComponent(COMPONENT_KEY)(AvatarStack)

export default AvatarStack
