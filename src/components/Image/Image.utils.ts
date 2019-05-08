import { calculateAspectRatioFit } from '../../utilities/images'
import { allPropsDefined } from '../../utilities/is'
import { ImageProps } from './Image.types'

export const COMPONENT_KEY = 'Image'

/**
 * Enhances the inline style of the <img> component with aspect ratio
 * sizing, if applicable.
 *
 * @param   {Object} props The component props.
 * @returns {Object} The updated styles.
 */
export function enhanceStyleWithSize(props: ImageProps): Object {
  const { maxWidth, maxHeight, width, height, style } = props
  const imageProps: any = { maxWidth, maxHeight, width, height }

  if (!allPropsDefined(imageProps)) return style

  const aspect = calculateAspectRatioFit(imageProps)

  return {
    ...style,
    height: aspect.height,
    width: aspect.width,
  }
}
