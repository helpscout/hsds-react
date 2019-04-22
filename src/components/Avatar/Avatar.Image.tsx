import * as React from 'react'
import VisuallyHidden from '../VisuallyHidden'
import { classNames } from '../../utilities/classNames'
import { getEasingTiming } from '../../utilities/easing'
import { noop } from '../../utilities/other'
import { ImageWrapperUI, ImageUI } from './Avatar.css'

export const AvatarImage = props => {
  const {
    animationDuration,
    animationEasing,
    className,
    hasImage,
    image,
    isImageLoaded,
    onError,
    onLoad,
    name,
    title,
  } = props

  const componentClassName = classNames(
    'c-Avatar__imageWrapper',
    isImageLoaded && 'is-herbieFullyLoaded',
    className
  )

  const backgroundImage = isImageLoaded ? `url('${image}')` : null

  const imageStyle = {
    transition: `opacity ${animationDuration}ms ${getEasingTiming(
      animationEasing
    )}`,
  }

  const contentMarkup = (
    <ImageWrapperUI className={componentClassName} style={imageStyle}>
      <ImageUI className="c-Avatar__image" style={{ backgroundImage }}>
        <div className="c-Avatar__name">
          <VisuallyHidden>{name}</VisuallyHidden>
          <img
            alt={name}
            onError={onError}
            onLoad={onLoad}
            src={image}
            style={{ display: 'none' }}
          />
        </div>
      </ImageUI>
    </ImageWrapperUI>
  )

  return hasImage ? contentMarkup : title
}

AvatarImage.defaultProps = {
  animationDuration: 160,
  animationEasing: 'ease',
  hasImage: false,
  image: null,
  isImageLoaded: false,
  onError: noop,
  onLoad: noop,
  name: null,
  title: null,
}

export default AvatarImage
