import { calculateAspectRatioFit } from '../../utilities/images'

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
    if (values[index] == null) return {}
  }

  const aspect = calculateAspectRatioFit(imageProps)

  return {
    height: aspect.height,
    width: aspect.width,
  }
}
