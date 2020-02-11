import React from 'react'
import PropTypes from 'prop-types'
import Flexy from '../Flexy'
import { classNames } from '../../utilities/classNames'

export class ToolbarBlock extends React.PureComponent {
  static displayName = 'Toolbar.Block'
  static className = 'c-ToolbarBlock'

  getClassName() {
    const { className } = this.props

    return classNames(ToolbarBlock.className, className)
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

ToolbarBlock.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
}

export default ToolbarBlock
