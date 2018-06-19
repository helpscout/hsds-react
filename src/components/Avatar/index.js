// @flow
import React, { PureComponent as Component } from 'react'
import StatusDot from '../StatusDot'
import VisuallyHidden from '../VisuallyHidden'
import classNames from '../../utilities/classNames'
import { nameToInitials } from '../../utilities/strings'
import type { StatusDotStatus } from '../StatusDot/types'
import type { AvatarShape, AvatarSize } from './types'

type Props = {
  borderColor?: string,
  className?: string,
  count?: number | string,
  image?: string,
  initials?: string,
  light: boolean,
  name: string,
  onLoad?: () => void,
  onError?: () => void,
  outerBorderColor?: string,
  showStatusBorderColor: boolean,
  shape: AvatarShape,
  size: AvatarSize,
  statusIcon?: string,
  status?: StatusDotStatus,
}

type State = {
  imageLoaded: string,
}

export const IMAGE_STATES = {
  loading: 'loading',
  loaded: 'loaded',
  failed: 'failed',
}

class Avatar extends Component<Props, State> {
  static defaultProps = {
    light: false,
    name: '',
    showStatusBorderColor: false,
    size: 'md',
    shape: 'circle',
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      // Assume image is loading so that we only re-render on error
      imageLoaded: IMAGE_STATES.loading,
    }
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
      ...rest
    } = this.props

    const { imageLoaded } = this.state
    const hasImage =
      image &&
      [IMAGE_STATES.loading, IMAGE_STATES.loaded].indexOf(imageLoaded) >= 0
    const isImageLoaded = image && imageLoaded === IMAGE_STATES.loaded

    const componentClassName = classNames(
      'c-Avatar',
      borderColor && 'has-borderColor',
      hasImage && 'has-image',
      statusIcon && 'has-statusIcon',
      light && 'is-light',
      outerBorderColor && 'has-outerBorderColor',
      shape && `is-${shape}`,
      size && `is-${size}`,
      status && `is-${status}`,
      className
    )

    const imageStyle =
      image && isImageLoaded ? { backgroundImage: `url('${image}')` } : null
    const text = count || initials || nameToInitials(name)

    const contentMarkup = hasImage ? (
      <div className="c-Avatar__image" style={imageStyle}>
        <div className="c-Avatar__name">
          <VisuallyHidden>{name}</VisuallyHidden>
          <img
            alt=""
            onError={this.onImageLoadedError}
            onLoad={this.onImageLoadedSuccess}
            src={image}
            style={{ display: 'none' }}
          />
        </div>
      </div>
    ) : (
      <div className="c-Avatar__title">{text}</div>
    )

    let styles =
      borderColor || outerBorderColor
        ? {
            border: borderColor ? '2px solid' : undefined,
            borderColor,
            boxShadow: outerBorderColor
              ? `0 0 0 2px ${outerBorderColor}`
              : undefined,
          }
        : {}

    if (hasImage) {
      styles = {
        ...styles,
        backgroundColor: 'transparent',
      }
    }

    styles = Object.keys(styles).length ? styles : null

    const statusMarkup = status ? (
      <div className="c-Avatar__status">
        <StatusDot
          icon={statusIcon}
          outerBorderColor={showStatusBorderColor ? borderColor : undefined}
          size={size === 'lg' ? 'md' : 'sm'}
          status={status}
        />
      </div>
    ) : null

    return (
      <div className={componentClassName} title={name} {...rest}>
        <div className="c-Avatar__crop" style={styles}>
          {contentMarkup}
        </div>
        {statusMarkup}
      </div>
    )
  }
}

export default Avatar
