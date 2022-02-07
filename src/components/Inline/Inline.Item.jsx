import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import classNames from 'classnames'
import { ItemUI } from './Inline.css'

export class InlineItem extends React.PureComponent {
  static className = 'c-InlineItem'

  getClassName() {
    const { className } = this.props

    return classNames(InlineItem.className, className)
  }

  render() {
    const { children, innerRef, ...rest } = this.props

    return (
      <ItemUI
        {...getValidProps(rest)}
        className={this.getClassName()}
        ref={innerRef}
        role="listitem"
      >
        {children}
      </ItemUI>
    )
  }
}

InlineItem.defaultProps = {
  'data-cy': 'InlineItem',
  innerRef: () => undefined,
}

InlineItem.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  innerRef: PropTypes.func,
}

export default InlineItem
