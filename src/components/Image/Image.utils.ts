import { calculateAspectRatioFit } from '../../utilities/images'
import { allPropsDefined } from '../../utilities/is'
import { ImageProps } from './Image.types'

/**
 * Enhances the inline style of the <img> component with aspect ratio
 * sizing, if applicable.
 *
 * @param   {Object} props The component props.
 * @returns {Object} The updated styles.
 */
export function getImageSize(props: ImageProps): Object {
  const { maxWidth, maxHeight, width, height } = props
  const imageProps: any = { maxWidth, maxHeight, width, height }

  if (!allPropsDefined(imageProps)) return {}

  const aspect = calculateAspectRatioFit(imageProps)

  return {
    height: aspect.height,
    width: aspect.width,
  }
}
