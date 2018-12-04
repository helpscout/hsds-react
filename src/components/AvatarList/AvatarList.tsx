import * as React from 'react'
import { AvatarShape, AvatarSize } from '../Avatar/types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Avatar from '../Avatar'
import Animate from '../Animate'
import PropProvider, { propConnect } from '../PropProvider'
import { classNames } from '../../utilities/classNames'
import {
  namespaceComponent,
  isComponentNamed,
  getComponentKey,
} from '../../utilities/component'
import { AvatarListWrapperUI } from './styles/AvatarList.css.js'
import { COMPONENT_KEY } from './utils'
import { COMPONENT_KEY as AVATAR_KEY } from '../Avatar/utils'

export interface Props {
  animationEasing: string
  animationSequence: string
  avatarsClassName: string
  borderColor?: string
  children?: any
  className?: string
  max: number
  outerBorderColor?: string
  shape: AvatarShape
  showStatusBorderColor: boolean
  size: AvatarSize
}

export class AvatarList extends React.PureComponent<Props> {
  static defaultProps = {
    animationEasing: 'ease',
    animationSequence: 'fade',
    max: 4,
    shape: 'rounded',
    showStatusBorderColor: false,
    size: 'sm',
  }

  getAvatars = () => {
    return React.Children.toArray(this.props.children).filter(child =>
      isComponentNamed(child, AVATAR_KEY)
    )
  }

  getTotalAvatarCount = () => {
    return this.getAvatars().length
  }

  getAvatarList = () => {
    const { max } = this.props

    const avatars = this.getAvatars()
    const totalAvatarCount = this.getTotalAvatarCount()

    return max && totalAvatarCount > max ? avatars.slice(0, max - 1) : avatars
  }

  getAvatarProps = () => {
    const {
      avatarsClassName,
      borderColor,
      outerBorderColor,
      shape,
      showStatusBorderColor,
      size,
    } = this.props

    return {
      borderColor,
      className: avatarsClassName,
      outerBorderColor,
      shape,
      showStatusBorderColor,
      size,
    }
  }

  getAvatarsMarkup = () => {
    const { animationEasing, animationSequence } = this.props

    const avatarList = this.getAvatarList()

    return avatarList.map((avatar, index) => {
      return (
        <Animate
          className="c-AvatarList__item c-List__item"
          easing={animationEasing}
          key={getComponentKey(avatar, index)}
          sequence={animationSequence}
        >
          {avatar}
        </Animate>
      )
    })
  }

  getAdditionalAvatarMarkup = () => {
    const { animationEasing, animationSequence, outerBorderColor } = this.props

    const avatarList = this.getAvatarList()
    const additionalAvatarCount = this.getTotalAvatarCount() - avatarList.length

    return additionalAvatarCount ? (
      <Animate
        key="AvatarList__additionalAvatarMarkup"
        className="c-AvatarList__item c-List__item"
        easing={animationEasing}
        sequence={animationSequence}
      >
        <Avatar
          {...this.getAvatarProps()}
          count={`+${additionalAvatarCount}`}
          light
          outerBorderColor={outerBorderColor}
          name={`+${additionalAvatarCount}`}
        />
      </Animate>
    ) : null
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
      'c-AvatarList',
      'c-List',
      'c-List--inline',
      'c-List--xs',
      'is-display-flex',
      'is-inline-sm',
      className
    )

    return (
      <AvatarListWrapperUI className="c-AvatarListWrapper">
        <PropProvider value={{ [AVATAR_KEY]: { ...this.getAvatarProps() } }}>
          <div {...getValidProps(rest)} className={componentClassName}>
            {this.getAvatarsMarkup()}
            {this.getAdditionalAvatarMarkup()}
          </div>
        </PropProvider>
      </AvatarListWrapperUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY)(AvatarList)

export default propConnect(COMPONENT_KEY)(AvatarList)
