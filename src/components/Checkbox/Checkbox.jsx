import React from 'react'
import PropTypes from 'prop-types'
import Choice from '../Choice'
import classNames from 'classnames'

class Checkbox extends React.PureComponent {
  render() {
    const { className, ...rest } = this.props
    const componentClassName = classNames('c-Checkbox', className)

    return (
      <Choice
        {...rest}
        className={componentClassName}
        componentID="Checkbox"
        type="checkbox"
      />
    )
  }
}

Checkbox.defaultProps = {
  'data-cy': 'Checkbox',
}

Checkbox.propTypes = {
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default Checkbox
