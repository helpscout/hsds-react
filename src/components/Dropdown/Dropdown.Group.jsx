// Deprecated
/* istanbul ignore file */
import React from 'react'
import { PropTypes } from 'prop-types'
import { getValidProps } from '@hsds/utils-react'
import { GroupUI } from './Dropdown.css'
import classNames from 'classnames'

function noop() {}

export class DropdownGroup extends React.PureComponent {
  render() {
    const { className, children, innerRef, ...rest } = this.props
    const componentClassName = classNames('c-DropdownGroup', className)

    return (
      <GroupUI
        {...getValidProps(rest)}
        className={componentClassName}
        ref={innerRef}
        tabIndex={null}
        role="group"
      >
        {children}
      </GroupUI>
    )
  }
}

DropdownGroup.defaultProps = {
  'data-cy': 'DropdownGroup',
  innerRef: noop,
}

DropdownGroup.propTypes = {
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  innerRef: PropTypes.func,
}

export default DropdownGroup
