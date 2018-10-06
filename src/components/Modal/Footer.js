// @flow
import type { ToolbarSize } from '../Toolbar/types'
import React, { PureComponent as Component } from 'react'
import { classNames } from '../../utilities/classNames.ts'
import { namespaceComponent } from '../../utilities/component.ts'
import { COMPONENT_KEY } from './utils'
import { FooterUI } from './styles/Footer.css.js'

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
      <FooterUI {...rest} className={componentClassName} placement="bottom">
        {children}
      </FooterUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY.Footer)(Footer)

export default Footer
