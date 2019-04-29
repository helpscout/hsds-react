import * as React from 'react'
import { AvatarShape, AvatarSize } from '../Avatar/Avatar.types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import propConnect from '../PropProvider/propConnect'
import Avatar from '../Avatar/index'
import Animate from '../Animate/index'
import styled from '../styled/index'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent, isComponentNamed } from '../../utilities/component'
import avatarGridWrapperCSS from './styles/AvatarGridWrapper.css'
import avatarGridContainerCSS from './styles/AvatarGridContainer.css'
import avatarGridCSS from './styles/AvatarGrid.css'
import { COMPONENT_KEY } from './AvatarGrid.utils'
import { COMPONENT_KEY as AVATAR_KEY } from '../Avatar/Avatar.utils'

type Props = {
  animationEasing: string
  animationSequence: string
  borderColor?: string
  center: boolean
  children?: any
  className?: string
  max: number
  outerBorderColor?: string
  shape: AvatarShape
  showStatusBorderColor: boolean
  size: AvatarSize
}

const AvatarGridWrapper = styled('div')(avatarGridWrapperCSS)
const AvatarGridContainer = styled('div')(avatarGridContainerCSS)
const AvatarGridComponent = styled('div')(avatarGridCSS)

class AvatarGrid extends React.PureComponent<Props> {
  static defaultProps = {
    animationEasing: 'bounce',
    animationSequence: 'fade',
    borderColor: 'transparent',
    center: true,
    max: 9,
    shape: 'circle',
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

const PropConnectedComponent = propConnect(COMPONENT_KEY)(AvatarGrid)

export default PropConnectedComponent
