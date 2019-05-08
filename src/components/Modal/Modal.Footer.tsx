import * as React from 'react'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './Modal.utils'
import { FooterUI } from './styles/Modal.Footer.css'
import { ModalFooterProps } from './Modal.types'

class Footer extends React.PureComponent<ModalFooterProps> {
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

namespaceComponent(COMPONENT_KEY.Footer)(Footer)

export default Footer
