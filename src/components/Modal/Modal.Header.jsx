import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '../../utilities/classNames'
import { HeaderUI } from './Modal.css'

class Header extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    seamless: PropTypes.bool,
    shadow: PropTypes.bool,
    size: PropTypes.oneOf(['xl', 'lg', 'md', 'sm', 'xs']),
  }

  static displayName = 'Modal.Header'
  static defaultProps = {
    seamless: false,
    shadow: false,
    size: 'lg',
  }

  render() {
    const { className, children, ...rest } = this.props

    const componentClassName = classNames('c-ModalHeader', className)

    return (
      <HeaderUI {...rest} className={componentClassName} placement="top">
        {children}
      </HeaderUI>
    )
  }
}

export default Header
