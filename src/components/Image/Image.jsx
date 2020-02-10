import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { ImageUI } from './Image.css'
import { getImageSize } from './Image.utils'

class Image extends React.PureComponent {
  static propTypes = {
    alt: PropTypes.string,
    block: PropTypes.bool,
    className: PropTypes.string,
    height: PropTypes.number,
    maxHeight: PropTypes.number,
    maxWidth: PropTypes.number,
    src: PropTypes.string,
    shape: PropTypes.oneOf(['rounded', 'square', '']),
    style: PropTypes.any,
    title: PropTypes.string,
    width: PropTypes.number,
  }

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

    return (
      <ImageUI
        {...getValidProps(rest)}
        className={componentClassName}
        size={getImageSize(this.props)}
      />
    )
  }
}

export default Image
