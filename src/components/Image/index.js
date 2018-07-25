// @flow
import React from 'react'
import styled from '../styled'
import classNames from '../../utilities/classNames'
import { calculateAspectRatioFit } from '../../utilities/images'
import { allPropsDefined } from '../../utilities/is'
import css from './styles/Image.css.js'

type ImageShape = 'rounded' | 'square' | ''
type Props = {
  alt?: string,
  block: boolean,
  className?: string,
  height?: number,
  maxHeight?: number,
  maxWidth?: number,
  src: string,
  shape?: ImageShape,
  style: Object,
  title?: string,
  width?: number,
}

const Image = (props: Props) => {
  const { className, block, maxHeight, maxWidth, shape, style, ...rest } = props

  const componentClassName = classNames(
    'c-Image',
    block && 'is-block',
    shape && `is-${shape}`,
    className
  )

  const enhancedStyle = enhanceStyleWithSize(props)

  const imageElement = React.createElement('img', {
    ...rest,
    className: componentClassName,
    style: enhancedStyle,
  })

  return imageElement
}

Image.defaultProps = {
  shape: '',
  style: {},
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

export default styled(Image)(css)
