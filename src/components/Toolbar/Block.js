import React, { PureComponent as Component } from 'react'
import Flexy from '../Flexy'
import { classNames } from '../../utilities/classNames'

class Block extends Component {
  render() {
    const { className, children, ...rest } = this.props

    if (!children) {
      return null
    }

    const componentClassName = classNames('c-ToolbarBlock', className)

    return (
      <Flexy.Block className={componentClassName} {...rest}>
        {children}
      </Flexy.Block>
    )
  }
}

Block.displayName = 'ToolbarBlock'

export default Block
