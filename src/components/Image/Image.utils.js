import isNil from 'lodash.isnil'

export function calculateAspectRatioFit(props) {
  const { width, height, maxWidth, maxHeight } = props

  if (width < maxWidth && height < maxHeight) {
    return {
      width,
      height,
    }
  }

  const ratioWidth = maxWidth / width
  const ratioHeight = maxHeight / height
  const ratio = Math.min(ratioWidth, ratioHeight)

  return {
    width: width * ratio,
    height: height * ratio,
  }
}

/**
 * Enhances the inline style of the <img> component with aspect ratio
 * sizing, if applicable.
 *
 * @param   {Object} props The component props.
 * @returns {Object} The updated styles.
 */
export function getImageSize(props) {
  const { maxWidth, maxHeight, width, height } = props
  const imageProps = { maxWidth, maxHeight, width, height }
  const values = Object.values(imageProps)

  for (let index = 0; index < values.length; index++) {
    if (isNil(values[index])) return {}
  }

  const aspect = calculateAspectRatioFit(imageProps)

  return {
    height: aspect.height,
    width: aspect.width,
  }
}
