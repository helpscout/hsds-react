import React from 'react'
import PropTypes from 'prop-types'
import { getValidProps } from '@hsds/utils-react'
import classNames from 'classnames'
import { getEasingTiming } from '@hsds/utils-animation'
import Icon from '../Icon'
import StatusDot from '../StatusDot'
import Tooltip from '../Tooltip'
import AvatarCrop from './Avatar.Crop'
import AvatarImage from './Avatar.Image'
import { getImageSrc, nameToInitials } from './Avatar.utils'
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

function noop() {}

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

    const initials = this.getInitials()
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
          initials={initials}
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
            initials={initials}
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

  getInitials() {
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
      tooltipProps,
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
    const withTooltip = Boolean(tooltipProps)
    const AvatarComponent = (
      <Component
        {...getValidProps(rest)}
        data-cy="Avatar"
        className={componentClassName}
        style={this.getStyles()}
        title={!withTooltip ? name : null}
        {...extraProps}
      >
        {this.renderCrop()}
        {this.renderStatus()}
        {this.renderCropBorder()}
        {this.renderOuterBorder()}
        {actionable && this.renderFocusBorder()}
      </Component>
    )

    return !withTooltip ? (
      AvatarComponent
    ) : (
      <Tooltip withTriggerWrapper={false} {...tooltipProps}>
        {AvatarComponent}
      </Tooltip>
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

const avatarPropTypes = {
  active: PropTypes.bool,
  animation: PropTypes.bool,
  animationDuration: PropTypes.number,
  animationEasing: PropTypes.string,
  /** Activate the action overlay that will appear on hover */
  actionable: PropTypes.bool,
  /** Name of the [Icon](../Icon) to render into the action overlay */
  actionIcon: PropTypes.string,
  /** Set the size of the action overlay icon */
  actionIconSize: PropTypes.string,
  /** Color for the Avatar border. */
  borderColor: PropTypes.string,
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Used to display an additional avatar count. */
  count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  fallbackImage: PropTypes.string,
  /** URL of the image to display. */
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  /** Custom initials to display. */
  initials: PropTypes.string,
  /** Applies a "light" style to the component. */
  light: PropTypes.bool,
  /** Name of the user. Required. */
  name: PropTypes.string,
  /** Callback when avatar overlay was clicked. */
  onActionClick: PropTypes.func,
  /** Callback when avatar image fails to load. */
  onError: PropTypes.func,
  /** Callback when avatar image loads. */
  onLoad: PropTypes.func,
  /** Callback when the remove avatar animation has ended. */
  onRemoveAnimationEnd: PropTypes.func,
  /** Color for the Avatar's outer border. */
  outerBorderColor: PropTypes.string,
  /** Activate an animation sequence that will remove the actual avatar and replace it will the fallback image. */
  removingAvatarAnimation: PropTypes.bool,
  /** Shape of the avatar. */
  shape: PropTypes.oneOf(['circle', 'rounded', 'square']),
  /** Renders the `StatusDot` border. */
  showStatusBorderColor: PropTypes.bool,
  /** Size of the avatar. */
  size: PropTypes.oneOf(['xl', 'lg', 'md', 'smmd', 'sm', 'xs', 'xxs']),
  /** Renders a `StatusDot` with the status type. */
  status: PropTypes.string,
  /** Name of the `Icon` to render into the `StatusDot`. */
  statusIcon: PropTypes.string,
  /** Text for the image `alt` and `title` attributes. */
  title: PropTypes.string,
  /** Wrap the avatar with a Tooltip, accepts all Tooltip props */
  tooltipProps: PropTypes.object,
  withShadow: PropTypes.bool,
}

Avatar.propTypes = avatarPropTypes
AvatarConsumer.propTypes = avatarPropTypes
AvatarConsumer.defaultProps = Avatar.defaultProps

export default AvatarConsumer
