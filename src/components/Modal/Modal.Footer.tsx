import * as React from 'react'
import { classNames } from '../../utilities/classNames'
import { FooterUI } from './styles/Modal.Footer.css'
import { ModalFooterProps } from './Modal.types'

class Footer extends React.PureComponent<ModalFooterProps> {
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
