import * as React from 'react'
import Item from './ControlGroup.Item'
import { classNames } from '../../utilities/classNames'

type Props = {
  className?: string
}

class Block extends React.PureComponent<Props> {
  static displayName = 'ControlGroupBlock'
  render() {
    const { className } = this.props

    const componentClassName = classNames('c-ControlGroupBlock', className)

    return <Item {...this.props} className={componentClassName} isBlock />
  }
}

export default Block
