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

const Header = props => {
  const { className, children, placement, ...rest } = props

  const componentClassName = classNames('c-ModalHeader', className)

  return (
    <Toolbar className={componentClassName} placement="top" {...rest}>
      {children}
    </Toolbar>
  )
}

Header.propTypes = propTypes
Header.defaultProps = defaultProps
Header.displayName = 'ModalHeader'

export default Header
