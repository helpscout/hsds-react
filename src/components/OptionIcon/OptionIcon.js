// @flow
import React, { PureComponent as Component } from 'react'
import classNames from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { OptionIconUI } from './styles/OptionIcon.css.js'
import { COMPONENT_KEY } from './utils'

type Props = {
  children?: any,
  className?: string,
}

class OptionIcon extends Component<Props> {
  render() {
    const { className, children, ...rest } = this.props
    const componentClassName = classNames('c-OptionIcon', className)

    return <OptionIconUI {...rest} className={componentClassName} />
  }
}

namespaceComponent(COMPONENT_KEY)(OptionIcon)

export default OptionIcon
