// @flow
import type { ToolbarSize } from '../Toolbar/types'
import React, { PureComponent as Component } from 'react'
import Toolbar from '../Toolbar'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './utils'

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
      <Toolbar {...rest} className={componentClassName} placement="top">
        {children}
      </Toolbar>
    )
  }
}

namespaceComponent(COMPONENT_KEY.Header)(Header)

export default Header
