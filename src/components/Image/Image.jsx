import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { ImageUI } from './Image.css'
import { getImageSize } from './Image.utils'

class Image extends React.PureComponent {
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

Image.propTypes = {
  /** Alt description for the image. */
  alt: PropTypes.string,
  /** Enables `display: block` for the image. */
  block: PropTypes.bool,
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Width for the image. */
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Max height for the image. */
  maxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Max width for the image. */
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Source for the image. Requried. */
  src: PropTypes.string,
  shape: PropTypes.oneOf(['rounded', 'square', '']),
  /** Title description for the image. */
  title: PropTypes.string,
  /** Width for the image. */
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default Image
