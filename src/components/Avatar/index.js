import React, {PureComponent as Component} from 'react'
import PropTypes from 'prop-types'
import StatusDot from '../StatusDot'
import VisuallyHidden from '../VisuallyHidden'
import classNames from '../../utilities/classNames'
import { statusTypes } from '../StatusDot/propTypes'
import { nameToInitials } from '../../utilities/strings'
import { standardSizeTypes } from '../../constants/propTypes'
import { shapeTypes } from './propTypes'

export const propTypes = {
  borderColor: PropTypes.string,
  className: PropTypes.string,
  count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  image: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  initials: PropTypes.string,
  light: PropTypes.bool,
  name: PropTypes.string.isRequired,
  outerBorderColor: PropTypes.string,
  showStatusBorderColor: PropTypes.bool,
  shape: shapeTypes,
  size: standardSizeTypes,
  statusIcon: PropTypes.string,
  status: statusTypes
}

const defaultProps = {
  light: false,
  name: '',
  showStatusBorderColor: false,
  size: 'md',
  shape: 'circle'
}

class Avatar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      // Assume image will load so that we only re-render on error
      imageLoaded: true
    }
    this.onImageLoadedError = this.onImageLoadedError.bind(this)
  }

  onImageLoadedError () {
    this.setState({
      imageLoaded: false
    })
  }

  render () {
    const {
      borderColor,
      className,
      count,
      image,
      name,
      light,
      initials,
      outerBorderColor,
      showStatusBorderColor,
      size,
      shape,
      status,
      statusIcon,
      ...rest
    } = this.props

    const { imageLoaded } = this.state
    const hasImage = image && imageLoaded

    const componentClassName = classNames(
      'c-Avatar',
      borderColor && 'has-borderColor',
      hasImage && 'has-image',
      light && 'is-light',
      outerBorderColor && 'has-outerBorderColor',
      shape && `is-${shape}`,
      size && `is-${size}`,
      status && `is-${status}`,
      className
    )

    const imageStyle = hasImage ? { backgroundImage: `url('${image}')` } : null
    const text = count || initials || nameToInitials(name)

    const contentMarkup = hasImage
      ? (
        <div className='c-Avatar__image' style={imageStyle}>
          <div className='c-Avatar__name'>
            <VisuallyHidden>
              {name}
            </VisuallyHidden>
            <img alt='' onError={this.onImageLoadedError} src={image} style={{display: 'none'}} />
          </div>
        </div>
      )
      : <div className='c-Avatar__title'>
        {text}
      </div>

    let styles = (borderColor || outerBorderColor) ? {
      border: borderColor ? '2px solid' : undefined,
      borderColor,
      boxShadow: outerBorderColor ? `0 0 0 2px ${outerBorderColor}` : undefined
    } : {}

    hasImage && Object.assign(styles, {
      backgroundColor: 'transparent'
    })

    styles = Object.keys(styles).length ? styles : null

    const statusMarkup = status ? (
      <div className='c-Avatar__status'>
        <StatusDot
          icon={statusIcon}
          outerBorderColor={showStatusBorderColor ? borderColor : undefined}
          size={size === 'sm' ? 'sm' : 'md'}
          status={status}
        />
      </div>
    ) : null

    return (
      <div className={componentClassName} title={name} {...rest}>
        <div className='c-Avatar__crop' style={styles}>
          {contentMarkup}
        </div>
        {statusMarkup}
      </div>
    )
  }
}

Avatar.propTypes = propTypes
Avatar.defaultProps = defaultProps
Avatar.displayName = 'Avatar'

export default Avatar
