// @flow
import type { ToolbarSize } from '../Toolbar/types'
import React, { PureComponent as Component } from 'react'
import { classNames } from '../../utilities/classNames.ts'
import { namespaceComponent } from '../../utilities/component.ts'
import { COMPONENT_KEY } from './utils'
import { HeaderUI } from './styles/Header.css.js'

type Props = {
  children?: any,
  className?: string,
  seamless: boolean,
  shadow: boolean,
  size: ToolbarSize,
}

class Header extends Component<Props> {
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
