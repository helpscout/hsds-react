// @flow
import type { AvatarShape, AvatarSize } from '../Avatar/types'
import React, { PureComponent as Component } from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Avatar from '../Avatar'
import Animate from '../Animate'
import styled from '../styled'
import { classNames } from '../../utilities/classNames.ts'
import {
  namespaceComponent,
  isComponentNamed,
} from '../../utilities/component.ts'
import avatarGridWrapperCSS from './styles/AvatarGridWrapper.css.js'
import avatarGridContainerCSS from './styles/AvatarGridContainer.css.js'
import avatarGridCSS from './styles/AvatarGrid.css.js'
import { COMPONENT_KEY } from './utils'
import { COMPONENT_KEY as AVATAR_KEY } from '../Avatar/utils'

type Props = {
  animationEasing: string,
  animationSequence: string,
  borderColor?: string,
  center: boolean,
  children?: any,
  className?: string,
  max: number,
  outerBorderColor?: string,
  shape: AvatarShape,
  showStatusBorderColor: boolean,
  size: AvatarSize,
}

const AvatarGridWrapper = styled('div')(avatarGridWrapperCSS)
const AvatarGridContainer = styled('div')(avatarGridContainerCSS)
const AvatarGridComponent = styled('div')(avatarGridCSS)

class AvatarGrid extends Component<Props> {
  static defaultProps = {
    animationEasing: 'bounce',
    animationSequence: 'fade',
    borderColor: 'transparent',
    center: true,
    max: 9,
    shape: 'rounded',
    showStatusBorderColor: true,
    size: 'md',
  }

  render() {
    const {
      animationEasing,
      animationSequence,
      borderColor,
      center,
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
            borderColor={borderColor}
            count={`+${additionalAvatarCount}`}
            light
            name={`+${additionalAvatarCount}`}
            outerBorderColor={outerBorderColor}
            shape={shape}
            showStatusBorderColor={showStatusBorderColor}
            size={size}
          />
        </div>
      </Animate>
    ) : null

    const avatarMarkup = avatarList.map(avatar => {
      const composedAvatar = React.cloneElement(avatar, {
        borderColor,
        outerBorderColor,
        shape,
        showStatusBorderColor,
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
          <AvatarGridComponent
            {...getValidProps(rest)}
            className={componentClassName}
          >
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
