import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { HeaderUI } from './Modal.css'

class ModalHeader extends React.PureComponent {
  render() {
    const { className, children, ...rest } = this.props

    const componentClassName = classNames('c-ModalHeader', className)

    return (
      <HeaderUI
        {...getValidProps(rest)}
        className={componentClassName}
        placement="top"
      >
        {children}
      </HeaderUI>
    )
  }
}

ModalHeader.propTypes = {
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  seamless: PropTypes.bool,
  shadow: PropTypes.bool,
  size: PropTypes.oneOf(['xl', 'lg', 'md', 'sm', 'xs']),
}

ModalHeader.defaultProps = {
  'data-cy': 'ModalHeader',
  seamless: false,
  shadow: false,
  size: 'lg',
}

export default ModalHeader
