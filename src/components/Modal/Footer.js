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

class Footer extends Component<Props> {
  static defaultProps = {
    seamless: false,
    shadow: false,
    size: 'lg',
  }

  render() {
    const { className, children, ...rest } = this.props

    const componentClassName = classNames('c-ModalFooter', className)

    return (
      <Toolbar {...rest} className={componentClassName} placement="bottom">
        {children}
      </Toolbar>
    )
  }
}

namespaceComponent(COMPONENT_KEY.Footer)(Footer)

export default Footer
