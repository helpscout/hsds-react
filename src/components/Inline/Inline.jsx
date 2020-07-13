import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import InlineItem from './Inline.Item'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { InlineUI } from './Inline.css'

export class Inline extends React.PureComponent {
  static className = 'c-Inline'
  static Item = InlineItem

  getClassName() {
    const { className, size } = this.props
    return classNames(Inline.className, size && `is-${size}`, className)
  }

  render() {
    const { children, innerRef, ...rest } = this.props

    return (
      <InlineUI
        {...getValidProps(rest)}
        className={this.getClassName()}
        ref={innerRef}
        role="list"
      >
        {children}
      </InlineUI>
    )
  }
}

Inline.defaultProps = {
  'data-cy': 'Inline',
  innerRef: noop,
  size: 'sm',
}

Inline.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  innerRef: PropTypes.func,
  /** Determines the horizontal padding of the component. */
  size: PropTypes.oneOf(['lg', 'md', 'sm', 'xs']),
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default Inline
