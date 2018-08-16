// @flow
import React, { PureComponent as Component } from 'react'
import GridComponent from '../Grid'
import classNames from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './utils'

type Props = {
  children?: any,
  className?: string,
}

class Grid extends Component<Props> {
  render() {
    const { className, children, ...rest } = this.props

    const componentClassName = classNames('c-FormGroupGrid', className)

    return (
      <div className={componentClassName} {...rest}>
        <GridComponent>{children}</GridComponent>
      </div>
    )
  }
}

namespaceComponent(COMPONENT_KEY.Grid)(Grid)

export default Grid
