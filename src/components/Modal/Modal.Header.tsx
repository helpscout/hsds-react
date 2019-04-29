import * as React from 'react'
import { ToolbarSize } from '../Toolbar/types'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './Modal.utils'
import { HeaderUI } from './styles/Modal.Header.css'

type Props = {
  children?: any
  className?: string
  seamless: boolean
  shadow: boolean
  size: ToolbarSize
}

class Header extends React.PureComponent<Props> {
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
