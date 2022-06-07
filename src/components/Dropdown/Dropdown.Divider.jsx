// Deprecated
/* istanbul ignore file */
import React from 'react'
import { PropTypes } from 'prop-types'
import { getValidProps } from '@hsds/utils-react'
import classNames from 'classnames'
import { DividerUI } from './Dropdown.css'

function noop() {}

export class DropdownDivider extends React.PureComponent {
  render() {
    const { className, children, innerRef, ...rest } = this.props
    const componentClassName = classNames('c-DropdownDivider', className)

    return (
      <DividerUI
        {...getValidProps(rest)}
        className={componentClassName}
        ref={innerRef}
        tabIndex={null}
        role="presentation"
      />
    )
  }
}

DropdownDivider.defaultProps = {
  'data-cy': 'DropdownDivider',
  innerRef: noop,
}

DropdownDivider.propTypes = {
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  innerRef: PropTypes.func,
}

export default DropdownDivider
