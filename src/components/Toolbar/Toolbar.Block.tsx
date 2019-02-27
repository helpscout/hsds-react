import * as React from 'react'
import Flexy from '../Flexy'
import propConnect from '../PropProvider/propConnect'
import { classNames } from '../../utilities/classNames'
import { BLOCK_COMPONENT_KEY } from './Toolbar.utils'

export interface Props {
  className?: string
  children?: any
}

class Block extends React.PureComponent<Props> {
  static className = 'c-ToolbarBlock'

  getClassName() {
    const { className } = this.props

    return classNames(Block.className, className)
  }

  render() {
    const { children, ...rest } = this.props

    if (!children) {
      return null
    }

    return (
      <Flexy.Block {...rest} className={this.getClassName()}>
        {children}
      </Flexy.Block>
    )
  }
}

const PropConnectedComponent = propConnect(BLOCK_COMPONENT_KEY)(Block)

export default PropConnectedComponent
