import * as React from 'react'
import propConnect from '../PropProvider/propConnect'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import styled from '../styled/index'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { calculateAspectRatioFit } from '../../utilities/images'
import { allPropsDefined } from '../../utilities/is'
import css from './styles/Image.css'
import { COMPONENT_KEY } from './Image.utils'

type ImageShape = 'rounded' | 'square' | ''
type Props = {
  alt?: string
  block: boolean
  className?: string
  height?: number
  maxHeight?: number
  maxWidth?: number
  src: string
  shape?: ImageShape
  style: Object
  title?: string
  width?: number
}

class Image extends React.PureComponent<Props> {
  static defaultProps = {
    shape: '',
    style: {},
  }

  render() {
    const {
      className,
      block,
      maxHeight,
      maxWidth,
      shape,
      style,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-Image',
      block && 'is-block',
      shape && `is-${shape}`,
      className
    )

    const enhancedStyle = enhanceStyleWithSize(this.props)

    const imageElement = React.createElement('img', {
      ...getValidProps(rest),
      className: componentClassName,
      style: enhancedStyle,
    })

    return imageElement
  }
}

/**
 * Enhances the inline style of the <img> component with aspect ratio
 * sizing, if applicable.
 *
 * @param   {Object} props The component props.
 * @returns {Object} The updated styles.
 */
export function enhanceStyleWithSize(props: Props): Object {
  const { maxWidth, maxHeight, width, height, style } = props
  const imageProps = { maxWidth, maxHeight, width, height }

  if (!allPropsDefined(imageProps)) return style

  // $FlowFixMe
  const aspect = calculateAspectRatioFit(imageProps)

  return {
    ...style,
    height: aspect.height,
    width: aspect.width,
  }
}

namespaceComponent(COMPONENT_KEY)(Image)

export default propConnect(COMPONENT_KEY)(styled(Image)(css))
