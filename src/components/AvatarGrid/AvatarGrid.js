// @flow
import type { AvatarShape, AvatarSize } from '../Avatar/types'
import React, { PureComponent as Component } from 'react'
import Avatar from '../Avatar'
import Animate from '../Animate'
import styled from '../styled'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import avatarGridWrapperCSS from './styles/AvatarGridWrapper.css.js'
import avatarGridContainerCSS from './styles/AvatarGridContainer.css.js'
import avatarGridCSS from './styles/AvatarGrid.css.js'
import { COMPONENT_KEY } from './utils'

type Props = {
  animationEasing: string,
  animationSequence: string,
  center: boolean,
  children?: any,
  className?: string,
  max: number,
  shape: AvatarShape,
  size: AvatarSize,
}

const AvatarGridWrapper = styled('div')(avatarGridWrapperCSS)
const AvatarGridContainer = styled('div')(avatarGridContainerCSS)
const AvatarGridComponent = styled('div')(avatarGridCSS)

class AvatarGrid extends Component<Props> {
  static defaultProps = {
    animationEasing: 'bounce',
    animationSequence: 'fade',
    center: true,
    max: 9,
    shape: 'rounded',
    size: 'md',
  }

  render() {
    const {
      animationEasing,
      animationSequence,
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
      <AvatarGridWrapper className={componentWrapperClassName}>
        <AvatarGridContainer className="c-AvatarGridContainer">
          <AvatarGridComponent className={componentClassName} {...rest}>
            {avatarMarkup}
            {additionalAvatarMarkup}
          </AvatarGridComponent>
        </AvatarGridContainer>
      </AvatarGridWrapper>
    )
  }
}

namespaceComponent(COMPONENT_KEY)(AvatarGrid)

export default AvatarGrid
