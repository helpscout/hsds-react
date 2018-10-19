import React, { PureComponent as Component } from 'react'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './utils'
import { ControlUI } from './styles/Control.css.js'

class Control extends Component {
  static defaultProps = {
    size: 'md',
  }

  render() {
    const { className, size, ...rest } = this.props

    const componentClassName = classNames(
      'c-SkeletonControl',
      size && `is-${size}`,
      className
    )

    return <ControlUI {...rest} className={componentClassName} />
  }
}

namespaceComponent(COMPONENT_KEY.Control)(Control)

export default Control
