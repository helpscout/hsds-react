import React from 'react'
import PropTypes from 'prop-types'
import Toolbar from '../Toolbar'
import { sizeTypes as toolbarSizeTypes } from '../Toolbar/propTypes'
import classNames from '../../utilities/classNames'

export const propTypes = {
  seamless: PropTypes.bool,
  shadow: PropTypes.bool,
  size: toolbarSizeTypes,
}

const defaultProps = {
  seamless: false,
  shadow: false,
  size: 'lg',
}

const Footer = props => {
  const { className, children, placement, ...rest } = props

  const componentClassName = classNames('c-ModalFooter', className)

  return (
    <Toolbar className={componentClassName} placement="bottom" {...rest}>
      {children}
    </Toolbar>
  )
}

Footer.propTypes = propTypes
Footer.defaultProps = defaultProps
Footer.displayName = 'ModalFooter'

export default Footer
