import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Flexy from '../Flexy'
import classNames from 'classnames'

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

ToolbarBlock.defaultProps = {
  'data-cy': 'ToolbarBlock',
}

ToolbarBlock.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default ToolbarBlock
