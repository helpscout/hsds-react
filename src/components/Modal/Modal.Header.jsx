import React from 'react'
import PropTypes from 'prop-types'
import { getValidProps } from '@hsds/utils-react'
import classNames from 'classnames'
import { HeaderUI } from './Modal.css'

class ModalHeader extends React.PureComponent {
  render() {
    const { className, children, shadow, ...rest } = this.props
    const componentClassName = classNames('c-ModalHeader', className)

    return (
      <HeaderUI
        {...getValidProps(rest)}
        shadow={shadow}
        className={componentClassName}
        placement="top"
      >
        {children}
      </HeaderUI>
    )
  }
}

ModalHeader.defaultProps = {
  'data-cy': 'ModalHeader',
  seamless: false,
  shadow: false,
  size: 'lg',
}

ModalHeader.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  /** Renders content with the standard `Card` UI. */
  seamless: PropTypes.bool,
  /** Adds shadow styles, see `Toolbar` */
  shadow: PropTypes.bool,
  /** Size (height) of the header, see `Toolbar` */
  size: PropTypes.oneOf(['xl', 'lg', 'md', 'sm', 'xs']),
}

export default ModalHeader
