import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { FooterUI } from './Modal.css'

class ModalFooter extends React.PureComponent {
  render() {
    const { className, children, shadow, ...rest } = this.props
    const componentClassName = classNames('c-ModalFooter', className)

    return (
      <FooterUI
        {...getValidProps(rest)}
        className={componentClassName}
        shadow={shadow}
        placement="bottom"
      >
        {children}
      </FooterUI>
    )
  }
}

ModalFooter.defaultProps = {
  'data-cy': 'ModalFooter',
  seamless: false,
  shadow: false,
  size: 'lg',
}

ModalFooter.propTypes = {
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

export default ModalFooter
