import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Flexy from '../Flexy'
import { classNames } from '../../utilities/classNames'

export class ToolbarBlock extends React.PureComponent {
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
      <Flexy.Block {...getValidProps(rest)} className={this.getClassName()}>
        {children}
      </Flexy.Block>
    )
  }
}

ToolbarBlock.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
}

ToolbarBlock.defaultProps = {
  'data-cy': 'ToolbarBlock',
}

export default ToolbarBlock
