import { calculateSize } from '../MessageCard.utils'
import { ImageContainerUI, ImageUI } from '../MessageCard.css'
import React, { useState } from 'react'
import PropTypes from 'prop-types'

export const MessageCardImage = ({ image, onLoad }) => {
  const [imageError, setImageError] = useState(false)
  const onImageError = () => {
    setImageError(true)
    onLoad()
  }

  if (!image || imageError) {
    return null
  }

  const { height, width } = calculateSize(image)

  return (
    <ImageContainerUI>
      <ImageUI
        src={image.url}
        alt={image.altText || 'Message image'}
        width={width ? `${width}px` : '100%'}
        height={height ? `${height}px` : 'auto'}
        onLoad={onLoad}
        onError={onImageError}
      />
    </ImageContainerUI>
  )
}

function noop() {}

MessageCardImage.propTypes = {
  /** Image to render */
  image: PropTypes.shape({
    url: PropTypes.string.isRequired,
    altText: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  /** Callback when image loaded */
  onLoad: PropTypes.func,
}

MessageCardImage.defaultProps = {
  onLoad: noop,
}
