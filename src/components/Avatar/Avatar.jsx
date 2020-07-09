import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import StatusDot from '../StatusDot'
import Icon from '../Icon'
import { getEasingTiming } from '../../utilities/easing'
import { classNames } from '../../utilities/classNames'
import { nameToInitials } from '../../utilities/strings'
import { noop } from '../../utilities/other'
import AvatarCrop from './Avatar.Crop'
import AvatarImage from './Avatar.Image'
import { getImageSrc } from './Avatar.utils'
import { AvatarListContext } from '../AvatarList/AvatarList'
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
  config,
  getCircleProps,
} from './Avatar.css'

export class Avatar extends React.PureComponent {
  src

  state = {
    imageLoaded: false,
    imageFailed: false,
  }

  constructor(props) {
    super(props)
    this.src = getImageSrc(props)
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    const imageHasChanged = newProps.image !== this.props.image
    const fallbackHasChanged =
      newProps.fallbackImage !== this.props.fallbackImage
    if (imageHasChanged || fallbackHasChanged) {
      this.src = getImageSrc(newProps)
      this.setState({
        imageLoaded: false,
        imageFailed: false,
      })
    }
  }

  onImageLoadedError = () => {
    this.setState({
      imageLoaded: false,
      imageFailed: true,
    })

    this.props.onError()
  }

  onImageLoadedSuccess = () => {
    this.setState({
      imageLoaded: true,
    })

    this.props.onLoad()
  }

  getShapeClassNames = () => {
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
      animation,
      name,
      withShadow,
      fallbackImage,
      removingAvatarAnimation,
      light,
    } = this.props

    const shapeClassnames = this.getShapeClassNames()

    const hasImage = this.src.length > 0 && !this.state.imageFailed

    const title = this.getTitle()
    return (
      <AvatarCrop
        className={shapeClassnames}
        isImageLoaded={this.state.imageLoaded}
        withShadow={withShadow}
        hasImage={hasImage}
      >
        <AvatarImage
          animation={animation}
          animationDuration={animationDuration}
          animationEasing={animationEasing}
          className={classNames('c-Avatar__imageMainWrapper', shapeClassnames)}
          src={this.src}
          name={name}
          title={title}
          light={light}
          onError={this.onImageLoadedError}
          onLoad={this.onImageLoadedSuccess}
        />
        {removingAvatarAnimation && (
          <AvatarImage
            animation={false}
            className={classNames(
              'c-Avatar__imageStaticWrapper',
              shapeClassnames
            )}
            src={fallbackImage}
            name={name}
            title={title}
            light={light}
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

  getTitle() {
    const { count, initials, name } = this.props

    return count || initials || nameToInitials(name)
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

    const componentClassName = classNames(
      'c-Avatar',
      borderColor && 'has-borderColor',
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

const AvatarConsumer = props => {
  const contextValue = React.useContext(AvatarListContext)
  if (contextValue) {
    const newProps = { ...props, ...contextValue }
    newProps.className = classNames(props.className, contextValue.className)
    return <Avatar {...newProps} />
  }
  return <Avatar {...props} />
}

const avatarPropTypes = {
  actionable: PropTypes.bool,
  actionIcon: PropTypes.string,
  actionIconSize: PropTypes.string,
  active: PropTypes.bool,
  animation: PropTypes.bool,
  animationDuration: PropTypes.number,
  animationEasing: PropTypes.string,
  borderColor: PropTypes.string,
  className: PropTypes.string,
  count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fallbackImage: PropTypes.string,
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  initials: PropTypes.string,
  light: PropTypes.bool,
  name: PropTypes.string,
  onActionClick: PropTypes.func,
  onError: PropTypes.func,
  onLoad: PropTypes.func,
  onRemoveAnimationEnd: PropTypes.func,
  outerBorderColor: PropTypes.string,
  removingAvatarAnimation: PropTypes.bool,
  shape: PropTypes.oneOf(['circle', 'rounded', 'square']),
  showStatusBorderColor: PropTypes.bool,
  size: PropTypes.oneOf(Object.keys(config.size)),
  status: PropTypes.string,
  statusIcon: PropTypes.string,
  withShadow: PropTypes.bool,
}
Avatar.propTypes = avatarPropTypes
AvatarConsumer.propTypes = avatarPropTypes

Avatar.defaultProps = {
  actionable: false,
  actionIcon: 'trash',
  actionIconSize: '24',
  active: false,
  animation: true,
  animationDuration: 160,
  animationEasing: 'ease',
  borderColor: 'transparent',
  'data-cy': 'Avatar',
  fallbackImage: null,
  light: false,
  name: '',
  outerBorderColor: 'transparent',
  showStatusBorderColor: false,
  size: 'md',
  shape: 'circle',
  style: {},
  withShadow: false,
  onError: noop,
  onLoad: noop,
}

export default AvatarConsumer
