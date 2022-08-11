import { MAX_IMAGE_SIZE } from './MessageCard.styles'
import Truncate from '../Truncate'

const sizeWithRatio = (recalculatedSide, otherSide, defaultValue) =>
  // Check if other side is smaller than max size to not recalculate unnecessarily this side as it doesn't need any scaling
  // other condition checks that the image fits the boundaries
  otherSide < MAX_IMAGE_SIZE
    ? defaultValue
    : (recalculatedSide / otherSide) * MAX_IMAGE_SIZE

/**
 @param text text to truncate
 @param limit limit to truncate to
 @return element with text truncated to the given limit.
 */
export const getTruncatedText = (text, limit) => {
  return (
    <Truncate limit={limit} type="end">
      {text}
    </Truncate>
  )
}

/**
 Calculate size of image to keep the original aspect ratio, but fit within MAX_IMAGE_SIZExMAX_IMAGE_SIZE square for image

 @param image image to calculate size for. Must have width and height defined.

 @return size Object of type {width: number, height: number} that defines recalculated image's size. Empty object in case of no width or height in parameter image.
 */
export const calculateSize = image => {
  if (!image.width || !image.height) {
    return {}
  }
  const width = parseInt(image.width)
  const height = parseInt(image.height)

  // Not necessary to recalculate if it fits within boundaries
  if (width < MAX_IMAGE_SIZE && height < MAX_IMAGE_SIZE) {
    return { width, height }
  }

  if (width > height) {
    return {
      height: sizeWithRatio(height, width, height),
      width: Math.min(width, MAX_IMAGE_SIZE),
    }
  } else {
    return {
      width: sizeWithRatio(width, height, MAX_IMAGE_SIZE),
      height: Math.min(height, MAX_IMAGE_SIZE),
    }
  }
}
