import React from 'react'
import PropTypes from 'prop-types'
import Flexy from '../Flexy'
import { classNames } from '../../utilities/classNames'

export class ToolbarItem extends React.PureComponent {
  static displayName = 'Toolbar.Item'
  static className = 'c-ToolbarItem'

  getClassName() {
    const { className } = this.props

    return classNames(ToolbarItem.className, className)
  }

  render() {
    const { children, ...rest } = this.props

    if (!children) {
      return null
    }

    return (
      <Flexy.Item {...rest} className={this.getClassName()}>
        {children}
      </Flexy.Item>
    )
  }
}

ToolbarItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
}

export default ToolbarItem
