import * as React from 'react'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './Skeleton.utils'
import { ControlUI } from './styles/Skeleton.Control.css'

class Control extends React.PureComponent<any> {
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
