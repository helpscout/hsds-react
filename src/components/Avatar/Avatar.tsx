import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import propConnect from '../PropProvider/propConnect'
import { StatusDotStatus } from '../StatusDot/types'
import { AvatarShape, AvatarSize } from './Avatar.types'
import StatusDot from '../StatusDot'
import VisuallyHidden from '../VisuallyHidden'
import { includes } from '../../utilities/arrays'
import { getEasingTiming } from '../../utilities/easing'
import { classNames } from '../../utilities/classNames'
import { nameToInitials } from '../../utilities/strings'
import {
  AvatarUI,
  CropUI,
  CropBorderUI,
  ImageUI,
  OuterBorderUI,
  StatusUI,
  TitleUI,
} from './Avatar.css'
import { COMPONENT_KEY, IMAGE_STATES } from './Avatar.utils'

export interface Props {
  animationDuration: number
  animationEasing: string
  borderColor?: string
  className?: string
  count?: number | string
  image?: string
  initials?: string
  light: boolean
  name: string
  onLoad?: () => void
  onError?: () => void
  outerBorderColor?: string
  showStatusBorderColor: boolean
  shape: AvatarShape
  size: AvatarSize
  statusIcon?: string
  status?: StatusDotStatus
  style: any
  withShadow: boolean
}

export interface State {
  imageLoaded: string
}

export class Avatar extends React.PureComponent<Props, State> {
  static defaultProps = {
    animationDuration: 160,
    animationEasing: 'ease',
    borderColor: 'transparent',
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
    this.setState({
      imageLoaded: IMAGE_STATES.failed,
    })
    this.props.onError && this.props.onError()
  }

  onImageLoadedSuccess = () => {
    this.setState({
      imageLoaded: IMAGE_STATES.loaded,
    })
    this.props.onLoad && this.props.onLoad()
  }

  isImageLoaded = (): boolean => {
    const { image } = this.props
    const { imageLoaded } = this.state

    return !!(image && imageLoaded === IMAGE_STATES.loaded)
  }

  hasImage = (): boolean => {
    const { image } = this.props
    const { imageLoaded } = this.state

    return !!(
      image &&
      includes([IMAGE_STATES.loading, IMAGE_STATES.loaded], imageLoaded)
    )
  }

  getShapeClassNames = (): string => {
    const { shape, size } = this.props

    return classNames(shape && `is-${shape}`, size && `is-${size}`)
  }

  getCropStyles = () => {
    let styles = {}

    if (this.hasImage()) {
      styles = {
        ...styles,
        backgroundColor: 'currentColor',
      }
    }

    styles = Object.keys(styles).length ? styles : {}

    return styles
  }

  renderCrop = () => {
    const { withShadow } = this.props
    const contentMarkup = this.getContentMarkup()
    const styles = this.getCropStyles()

    const componentClassName = classNames(
      'c-Avatar__crop',
      withShadow && 'is-withShadow',
      this.getShapeClassNames()
    )

    return (
      <CropUI className={componentClassName} style={styles}>
        {contentMarkup}
      </CropUI>
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

  getContentMarkup = () => {
    const { animationDuration, animationEasing, image, name } = this.props

    const isImageLoaded = image && this.isImageLoaded()

    const componentClassName = classNames(
      'c-Avatar__image',
      isImageLoaded && 'is-herbieFullyLoaded'
    )

    const imageStyle = {
      backgroundImage: isImageLoaded ? `url('${image}')` : null,
      transition: `opacity ${animationDuration}ms ${getEasingTiming(
        animationEasing
      )}`,
    }

    const titleMarkup = this.getTitleMarkup()
    const contentMarkup = (
      <ImageUI className={componentClassName} style={imageStyle}>
        <div className="c-Avatar__name">
          <VisuallyHidden>{name}</VisuallyHidden>
          <img
            alt={name}
            onError={this.onImageLoadedError}
            onLoad={this.onImageLoadedSuccess}
            src={image}
            style={{ display: 'none' }}
          />
        </div>
      </ImageUI>
    )

    return this.hasImage() ? contentMarkup : titleMarkup
  }

  renderCropBorder = () => {
    const { borderColor, shape } = this.props
    const componentClassName = classNames(
      'c-Avatar__cropBorder',
      shape && `is-${shape}`
    )

    const styles = {
      borderColor,
    }

    return <CropBorderUI className={componentClassName} style={styles} />
  }

  renderOuterBorder = () => {
    const { outerBorderColor, shape } = this.props
    const componentClassName = classNames(
      'c-Avatar__outerBorder',
      shape && `is-${shape}`
    )

    const styles = {
      borderColor: outerBorderColor,
    }

    return <OuterBorderUI className={componentClassName} style={styles} />
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
      size,
      shape,
      status,
      statusIcon,
      withShadow,
      ...rest
    } = this.props

    const hasImage = this.hasImage()

    const componentClassName = classNames(
      'c-Avatar',
      borderColor && 'has-borderColor',
      hasImage && 'has-image',
      statusIcon && 'has-statusIcon',
      light && 'is-light',
      outerBorderColor && 'has-outerBorderColor',
      status && `is-${status}`,
      this.getShapeClassNames(),
      className
    )

    return (
      <AvatarUI
        {...getValidProps(rest)}
        className={componentClassName}
        style={this.getStyles()}
        title={name}
      >
        {this.renderCrop()}
        {this.renderStatus()}
        {this.renderCropBorder()}
        {this.renderOuterBorder()}
      </AvatarUI>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY)(Avatar)

export default PropConnectedComponent
