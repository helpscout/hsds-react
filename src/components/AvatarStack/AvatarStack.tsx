import * as React from 'react'
import { AvatarShape, AvatarSize } from '../Avatar/types'
import Avatar from '../Avatar/index'
import Animate from '../Animate/index'
import PropProvider from '../PropProvider/index'
import { classNames } from '../../utilities/classNames'
import {
  namespaceComponent,
  isComponentNamed,
  getComponentKey,
} from '../../utilities/component'
import { isOdd, getMiddleIndex } from '../../utilities/number'
import { AvatarStackUI, AvatarStackLayeringUI, ItemUI } from './AvatarStack.css'
import { COMPONENT_KEY } from './utils'
import { COMPONENT_KEY as AVATAR_KEY } from '../Avatar/utils'

export interface Props {
  animationDuration: number
  animationEasing: string
  animationSequence: string
  avatarsClassName?: string
  avatarVersion: number
  borderColor?: string
  children?: any
  className?: string
  max: number
  outerBorderColor?: string
  shape: AvatarShape
  showStatusBorderColor: boolean
  size?: AvatarSize
}

export class AvatarStack extends React.PureComponent<Props> {
  static defaultProps = {
    animationDuration: 300,
    animationEasing: 'ease',
    animationSequence: 'fade',
    avatarVersion: 1,
    borderColor: 'white',
    max: 5,
    shape: 'circle',
    showStatusBorderColor: true,
  }

  /**
   * Stacks the avatars in a way where the center avatar is at the highest
   * layer
   *
   * @returns {boolean}
   */
  shouldLayerStack = () => {
    const { avatarVersion, size } = this.props

    // Layer stacking is only supported for AvatarStack V2+
    return !size && avatarVersion > 1
  }

  getAvatars = () => {
    return React.Children.toArray(this.props.children).filter(child =>
      isComponentNamed(child, AVATAR_KEY)
    )
  }

  getTotalAvatarCount() {
    return this.getAvatars().length
  }

  getCurrentAvatarCount = () => {
    const { max } = this.props
    const count = this.getTotalAvatarCount()

    return count < max ? count : max
  }

  getAvatarList() {
    const { max } = this.props

    const avatars = this.getAvatars()
    const totalAvatarCount = avatars.length
    const sliceAt = this.shouldLayerStack() ? max : max - 1

    const avatarList =
      max && totalAvatarCount > max ? avatars.slice(0, sliceAt) : avatars

    return avatarList
  }

  getAvatarSize = () => {
    const { size: sizeProp } = this.props

    const currentCount = this.getCurrentAvatarCount()
    const shouldLayerStack = this.shouldLayerStack()

    if (!shouldLayerStack) return sizeProp

    let size = 'md'

    if (currentCount === 2) {
      size = 'lg'
    }
    if (currentCount === 1) {
      size = 'xl'
    }

    return size
  }

  getAvatarPropsFromIndex = index => {
    const {
      avatarVersion,
      avatarsClassName,
      borderColor,
      outerBorderColor,
      shape,
      showStatusBorderColor,
    } = this.props

    return {
      Avatar: {
        borderColor,
        className: classNames(avatarsClassName, 'c-AvatarStack__avatar'),
        outerBorderColor,
        shape,
        showStatusBorderColor,
        size: this.getAvatarSize(),
        version: avatarVersion,
      },
    }
  }

  getAvatarStyleFromIndex = index => {
    const { max } = this.props
    const currentCount = this.getCurrentAvatarCount()
    const shouldLayerStack = this.shouldLayerStack()

    let zIndex = max - index

    if (!shouldLayerStack) return { zIndex }

    if (currentCount > 2 && isOdd(currentCount)) {
      if (isOdd(index)) {
        zIndex = zIndex + 1
      }
      if (index === getMiddleIndex(currentCount)) {
        zIndex = zIndex + 2
      }
    }

    return {
      zIndex,
    }
  }

  renderAvatars() {
    const { animationDuration, animationEasing, animationSequence } = this.props

    const avatarList = this.getAvatarList()
    const componentClassName = classNames(
      this.shouldLayerStack() && 'is-withLayerStack',
      'c-AvatarStack__item'
    )

    const avatarMarkup = avatarList.map((avatar, index) => {
      const key = getComponentKey(avatar, index)

      const avatarProps = this.getAvatarPropsFromIndex(index)
      const avatarStyles = this.getAvatarStyleFromIndex(index)

      return (
        <ItemUI className={componentClassName} key={key} style={avatarStyles}>
          <Animate
            duration={animationDuration}
            easing={animationEasing}
            sequence={animationSequence}
          >
            <PropProvider value={avatarProps}>{avatar}</PropProvider>
          </Animate>
        </ItemUI>
      )
    })

    return avatarMarkup
  }

  renderAdditionalAvatars() {
    const {
      animationDuration,
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

    if (this.shouldLayerStack()) return

    const avatars = this.getAvatars()
    const avatarList = this.getAvatarList()
    const totalAvatarCount = avatars.length
    const additionalAvatarCount = totalAvatarCount - avatarList.length

    return (
      !!additionalAvatarCount && (
        <Animate
          key="AvatarGrid__additionalAvatarMarkup"
          duration={animationDuration}
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

  getAvatarStackComponent = () => {
    return this.shouldLayerStack() ? AvatarStackLayeringUI : AvatarStackUI
  }

  render() {
    const {
      animationEasing,
      animationSequence,
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

    const componentClassName = classNames(
      'c-AvatarStack',
      this.shouldLayerStack() && 'is-withLayerStack',
      className
    )

    const Component = this.getAvatarStackComponent()

    return (
      <Component {...rest} className={componentClassName}>
        {this.renderAvatars()}
        {this.renderAdditionalAvatars()}
      </Component>
    )
  }
}

namespaceComponent(COMPONENT_KEY)(AvatarStack)

export default AvatarStack
