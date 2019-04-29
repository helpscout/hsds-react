import * as React from 'react'
import Item from './ControlGroup.Item'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './ControlGroup.utils'

type Props = {
  className?: string
}

class Block extends React.PureComponent<Props> {
  render() {
    const { className } = this.props

    const componentClassName = classNames('c-ControlGroupBlock', className)

    return <Item {...this.props} className={componentClassName} isBlock />
  }
}

namespaceComponent(COMPONENT_KEY.Item)(Block)

export default Block
