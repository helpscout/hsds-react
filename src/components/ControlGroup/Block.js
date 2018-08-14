// @flow
import React, { PureComponent as Component } from 'react'
import Item from './Item'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { ITEM_COMPONENT_KEY } from './utils'

type Props = {
  className?: string,
}

class Block extends Component<Props> {
  render() {
    const { className } = this.props

    const componentClassName = classNames('c-ControlGroupBlock', className)

    return <Item {...this.props} className={componentClassName} isBlock />
  }
}

namespaceComponent(ITEM_COMPONENT_KEY)(Block)

export default Block
