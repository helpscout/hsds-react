import * as React from 'react'
import { ToolbarSize } from '../Toolbar/Toolbar.types'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './Modal.utils'
import { FooterUI } from './styles/Modal.Footer.css'

type Props = {
  children?: any
  className?: string
  seamless: boolean
  shadow: boolean
  size: ToolbarSize
}

class Footer extends React.PureComponent<Props> {
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
