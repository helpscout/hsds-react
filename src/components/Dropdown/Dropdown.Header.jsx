// Deprecated
/* istanbul ignore file */
import React from 'react'
import { PropTypes } from 'prop-types'
import { getValidProps } from '@hsds/utils-react'
import { HeaderUI } from './Dropdown.css'
import Heading from '../Heading'
import classNames from 'classnames'

function noop() {}

export class DropdownHeader extends React.PureComponent {
  render() {
    const { className, children, innerRef, label, ...rest } = this.props
    const componentClassName = classNames('c-DropdownHeader', className)

    return (
      <HeaderUI
        {...getValidProps(rest)}
        className={componentClassName}
        ref={innerRef}
        tabIndex={null}
      >
        <Heading size="small" light>
          {children || label}
        </Heading>
      </HeaderUI>
    )
  }
}

DropdownHeader.defaultProps = {
  'data-cy': 'DropdownHeader',
  innerRef: noop,
}

DropdownHeader.propTypes = {
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  innerRef: PropTypes.func,
  label: PropTypes.string,
}

export default DropdownHeader
