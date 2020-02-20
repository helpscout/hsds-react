import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '../../utilities/classNames'
import { FooterUI } from './Modal.css'

class Footer extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    seamless: PropTypes.bool,
    shadow: PropTypes.bool,
    size: PropTypes.oneOf(['xl', 'lg', 'md', 'sm', 'xs']),
  }

  static displayName = 'Modal.Footer'
  static defaultProps = {
    seamless: false,
    shadow: false,
    size: 'lg',
  }

  render() {
    const { className, children, ...rest } = this.props

    const componentClassName = classNames('c-ModalFooter', className)

    return (
      <FooterUI {...rest} className={componentClassName} placement="bottom">
        {children}
      </FooterUI>
    )
  }
}

export default Footer
