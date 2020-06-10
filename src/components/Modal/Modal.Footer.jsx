import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { FooterUI } from './Modal.css'

class ModalFooter extends React.PureComponent {
  render() {
    const { className, children, ...rest } = this.props
    const componentClassName = classNames('c-ModalFooter', className)

    return (
      <FooterUI
        {...getValidProps(rest)}
        className={componentClassName}
        placement="bottom"
      >
        {children}
      </FooterUI>
    )
  }
}

ModalFooter.propTypes = {
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  seamless: PropTypes.bool,
  shadow: PropTypes.bool,
  size: PropTypes.oneOf(['xl', 'lg', 'md', 'sm', 'xs']),
}

ModalFooter.defaultProps = {
  'data-cy': 'ModalFooter',
  seamless: false,
  shadow: false,
  size: 'lg',
}

export default ModalFooter
