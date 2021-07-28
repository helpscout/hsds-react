import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import classNames from 'classnames'
import { HrUI } from './Hr.css'

class Hr extends React.PureComponent {
  render() {
    const { className, children, role, size, ...rest } = this.props
    const componentClassName = classNames(
      'c-Hr',
      size && `is-${size}`,
      className
    )

    return (
      <HrUI
        {...getValidProps(rest)}
        className={componentClassName}
        role={role}
      />
    )
  }
}

Hr.defaultProps = {
  'data-cy': 'Hr',
  role: 'separator',
  size: 'md',
}

Hr.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Aria-role for the component. */
  role: PropTypes.string,
  /** Adjusts the vertical margin of the component. */
  size: PropTypes.oneOf(['md', 'sm', 'xs', 'none']),
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default Hr
