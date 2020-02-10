import React from 'react'
import PropTypes from 'prop-types'
import Flexy from '../Flexy'
import { classNames } from '../../utilities/classNames'

export interface Props {
  className?: string
  children?: any
}

export class Block extends React.PureComponent<Props> {
  static displayName = 'Toolbar.Block'
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

export default Block
