import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Flexy from '../Flexy'
import { classNames } from '../../utilities/classNames'

export class ToolbarItem extends React.PureComponent {
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
      <Flexy.Item {...getValidProps(rest)} className={this.getClassName()}>
        {children}
      </Flexy.Item>
    )
  }
}

ToolbarItem.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
}

export default ToolbarItem
