import React from 'react'
import PropTypes from 'prop-types'
import { getValidProps } from '@hsds/utils-react'
import classNames from 'classnames'
import { PrefixUI } from './Input.css'

class InputPrefix extends React.PureComponent {
  render() {
    const { className, isSeamless, ...rest } = this.props
    const componentClassName = classNames(
      'c-InputPrefix',
      'c-Input__item',
      'c-Input__prefix',
      isSeamless && 'is-seamless',
      className
    )

    return <PrefixUI {...getValidProps(rest)} className={componentClassName} />
  }
}

InputPrefix.defaultProps = {
  'data-cy': 'InputPrefix',
  isSeamless: false,
}

InputPrefix.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Removes the border around the input. */
  isSeamless: PropTypes.bool,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default InputPrefix
