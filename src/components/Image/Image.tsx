import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import styled from '../styled'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import css from './styles/Image.css'
import { COMPONENT_KEY, enhanceStyleWithSize } from './Image.utils'
import { ImageProps } from './Image.types'

class Image extends React.PureComponent<ImageProps> {
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

namespaceComponent(COMPONENT_KEY)(Image)

export default styled(Image)(css)
