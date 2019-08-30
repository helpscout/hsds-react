import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import propConnect from '../PropProvider/propConnect'
import { StatusDotStatus } from '../StatusDot/StatusDot.types'
import { AvatarShape, AvatarSize } from './Avatar.types'
import StatusDot from '../StatusDot'
import Icon from '../Icon'
import { IconSize } from '../Icon/Icon.types'
import { getEasingTiming } from '../../utilities/easing'
import { classNames } from '../../utilities/classNames'
import { nameToInitials } from '../../utilities/strings'
import AvatarCrop from './Avatar.Crop'
import AvatarImage from './Avatar.Image'
import {
  ActionUI,
  AvatarButtonUI,
  AvatarUI,
  BorderAnimationUI,
  CircleAnimationUI,
  CropBorderUI,
  FocusUI,
  OuterBorderUI,
  StatusUI,
  TitleUI,
  config,
  getCircleProps,
} from './styles/Avatar.css'

import {
  COMPONENT_KEY,
  IMAGE_STATES,
  hasImage,
  isImageLoaded,
  getImageUrl,
} from './Avatar.utils'

export interface Props {
  actionable?: boolean
  actionIcon?: string
  actionIconSize?: IconSize
  active?: boolean
  animationDuration: number
  animationEasing: string
  borderColor?: string
  className?: string
  count?: number | string
  fallbackImage?: string
  image?: string
  initials?: string
  light: boolean
  name: string
  onActionClick?: () => void
  onError?: () => void
  onLoad?: () => void
  onRemoveAnimationEnd?: () => void
  outerBorderColor?: string
  removingAvatarAnimation: boolean
  shape: AvatarShape
  showStatusBorderColor: boolean
  size: AvatarSize
  status?: StatusDotStatus
  statusIcon?: string
  style: any
  withShadow: boolean
}

export interface State {
  imageLoaded: string
}

export class Avatar extends React.PureComponent<Props, State> {
  static defaultProps = {
    actionable: false,
    actionIcon: 'trash',
    actionIconSize: '24',
    active: false,
    animationDuration: 160,
    animationEasing: 'ease',
    borderColor: 'transparent',
    fallbackImage: null,
    light: false,
    name: '',
    outerBorderColor: 'transparent',
    showStatusBorderColor: false,
    size: 'md',
    shape: 'circle',
    style: {},
    withShadow: false,
  }

  state = {
    // Assume image is loading so that we only re-render on error
    imageLoaded: IMAGE_STATES.loading,
  }

  onImageLoadedError = () => {
    const { imageLoaded } = this.state

    const isLoading = imageLoaded === IMAGE_STATES.loading

    const newImageLoaded =
      this.props.fallbackImage && isLoading
        ? IMAGE_STATES.fallbackLoading
        : IMAGE_STATES.failed

    this.setState({
      imageLoaded: newImageLoaded,
    })
    this.props.onError && this.props.onError()
  }

  onImageLoadedSuccess = () => {
    const { imageLoaded } = this.state
    const isFallbackLoading = imageLoaded === IMAGE_STATES.fallbackLoading
    this.setState({
      imageLoaded: isFallbackLoading
        ? IMAGE_STATES.fallbackLoaded
        : IMAGE_STATES.loaded,
    })
    this.props.onLoad && this.props.onLoad()
  }

  getShapeClassNames = (): string => {
    const { shape, size } = this.props

    return classNames(shape && `is-${shape}`, size && `is-${size}`)
  }

  renderAction() {
    const {
      actionable,
      actionIcon,
      actionIconSize,
      removingAvatarAnimation,
    } = this.props

    if (!actionable || removingAvatarAnimation) {
      return null
    }

    const actionClassName = classNames(
      'c-Avatar__action',
      this.getShapeClassNames()
    )

    return (
      <ActionUI data-cy="Avatar.Action" className={actionClassName}>
        <Icon name={actionIcon} size={actionIconSize} />
      </ActionUI>
    )
  }

  renderCrop = () => {
    const {
      animationDuration,
      animationEasing,
      name,
      withShadow,
      fallbackImage,
      removingAvatarAnimation,
    } = this.props

    const shapeClassnames = this.getShapeClassNames()

    const _hasImage = hasImage(this.props, this.state)
    const _isImageLoaded = isImageLoaded(this.props, this.state)
    const _imageUrl = getImageUrl(this.props, this.state)

    return (
      <AvatarCrop
        animationDuration={animationDuration}
        animationEasing={animationEasing}
        className={shapeClassnames}
        hasImage={_hasImage}
        isImageLoaded={_isImageLoaded}
        withShadow={withShadow}
      >
        <AvatarImage
          animationDuration={animationDuration}
          animationEasing={animationEasing}
          className={classNames('c-Avatar__imageMainWrapper', shapeClassnames)}
          hasImage={_hasImage}
          image={_imageUrl}
          isImageLoaded={_isImageLoaded}
          name={name}
          title={this.getTitleMarkup()}
          onError={this.onImageLoadedError}
          onLoad={this.onImageLoadedSuccess}
        />
        {removingAvatarAnimation && (
          <AvatarImage
            className={classNames(
              'c-Avatar__imageStaticWrapper',
              shapeClassnames
            )}
            hasImage={true}
            image={fallbackImage}
            isImageLoaded={true}
            name={name}
            title={this.getTitleMarkup()}
          />
        )}
        {this.renderAction()}
      </AvatarCrop>
    )
  }

  renderStatus = () => {
    const {
      borderColor,
      showStatusBorderColor,
      size,
      statusIcon,
      status,
    } = this.props

    const componentClassName = classNames(
      'c-Avatar__status',
      this.getShapeClassNames(),
      statusIcon && 'is-withStatusIcon',
      showStatusBorderColor && 'is-withBorder'
    )

    return (
      status && (
        <StatusUI className={componentClassName}>
          <StatusDot
            icon={statusIcon}
            outerBorderColor={showStatusBorderColor ? borderColor : undefined}
            size={size === 'lg' ? 'md' : 'sm'}
            status={status}
          />
        </StatusUI>
      )
    )
  }

  getText = () => {
    const { count, initials, name } = this.props

    return count || initials || nameToInitials(name)
  }

  getTitleMarkup = () => {
    const { light } = this.props

    const componentClassName = classNames(
      'c-Avatar__title',
      light && 'is-light'
    )
    const text = this.getText()

    return <TitleUI className={componentClassName}>{text}</TitleUI>
  }

  renderCropBorder = () => {
    const { borderColor, shape } = this.props
    const componentClassName = classNames(
      'c-Avatar__cropBorder',
      shape && `is-${shape}`
    )

    return (
      <CropBorderUI className={componentClassName} borderColor={borderColor} />
    )
  }

  renderOuterBorder = () => {
    const { outerBorderColor, shape } = this.props
    const componentClassName = classNames(
      'c-Avatar__outerBorder',
      shape && `is-${shape}`
    )

    return (
      <OuterBorderUI
        className={componentClassName}
        borderColor={outerBorderColor}
      />
    )
  }

  renderFocusBorder = () => {
    const { shape, onRemoveAnimationEnd, size } = this.props

    const componentClassName = classNames(
      'c-Avatar__focusBorder',
      shape && `is-${shape}`
    )

    const borderAnimationClassName = classNames(
      'c-Avatar__borderAnimation',
      this.getShapeClassNames()
    )

    const sz = config.size[size].size
    const { size: svgSize, ...circleProps } = getCircleProps(sz)

    return [
      <FocusUI
        key="focusBorder"
        data-cy="Avatar.FocusBorder"
        className={componentClassName}
      />,
      <BorderAnimationUI
        key="borderAnimation"
        className={borderAnimationClassName}
        data-cy="Avatar.BorderAnimation"
      >
        <CircleAnimationUI
          id="anime"
          onAnimationEnd={onRemoveAnimationEnd}
          {...circleProps}
        />
      </BorderAnimationUI>,
    ]
  }

  getStyles() {
    const { animationDuration, animationEasing, style } = this.props

    return {
      ...style,
      transition: `width ${animationDuration}ms ${getEasingTiming(
        animationEasing
      )},
      height ${animationDuration}ms ${getEasingTiming(animationEasing)}`,
    }
  }

  render() {
    const {
      actionable,
      active,
      borderColor,
      className,
      count,
      image,
      name,
      light,
      initials,
      onLoad,
      outerBorderColor,
      showStatusBorderColor,
      removingAvatarAnimation,
      size,
      shape,
      status,
      statusIcon,
      withShadow,
      fallbackImage,
      onActionClick,
      ...rest
    } = this.props

    const _hasImage = hasImage(this.props, this.state)

    const componentClassName = classNames(
      'c-Avatar',
      borderColor && 'has-borderColor',
      _hasImage && 'has-image',
      statusIcon && 'has-statusIcon',
      light && 'is-light',
      active && 'is-active',
      outerBorderColor && 'has-outerBorderColor',
      status && `is-${status}`,
      actionable && `has-action`,
      removingAvatarAnimation && 'is-animating',
      this.getShapeClassNames(),
      className
    )

    const Component = actionable ? AvatarButtonUI : AvatarUI

    const extraProps = actionable ? { onClick: onActionClick } : {}

    return (
      <Component
        {...getValidProps(rest)}
        data-cy="Avatar"
        className={componentClassName}
        style={this.getStyles()}
        title={name}
        {...extraProps}
      >
        {this.renderCrop()}
        {this.renderStatus()}
        {this.renderCropBorder()}
        {this.renderOuterBorder()}
        {actionable && this.renderFocusBorder()}
      </Component>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY)(Avatar)

export default PropConnectedComponent
