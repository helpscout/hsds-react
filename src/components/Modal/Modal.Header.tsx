import * as React from 'react'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './Modal.utils'
import { HeaderUI } from './styles/Modal.Header.css'
import { ModalHeaderProps } from './Modal.types'

class Header extends React.PureComponent<ModalHeaderProps> {
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

namespaceComponent(COMPONENT_KEY.Header)(Header)

export default Header
