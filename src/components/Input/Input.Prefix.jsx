import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
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

InputPrefix.propTypes = {
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  isSeamless: PropTypes.bool,
}

InputPrefix.defaultProps = {
  'data-cy': 'InputPrefix',
  isSeamless: false,
}

export default InputPrefix
