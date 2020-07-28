import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { AddOnUI } from './Input.AddOn.css'

const InputAddOn = props => {
  const { className, children, isFirst, isNotOnly, isLast, ...rest } = props
  const componentClassName = classNames(
    'c-InputAddOn',
    isFirst && 'is-first',
    isNotOnly && 'is-notOnly',
    isLast && 'is-last',
    className
  )

  return (
    <AddOnUI className={componentClassName} {...getValidProps(rest)}>
      {children}
    </AddOnUI>
  )
}

InputAddOn.defaultProps = {
  'data-cy': 'InputAddOn',
  isFirst: false,
  isNotOnly: false,
  isLast: false,
}

InputAddOn.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Helps render component without right borders. */
  isFirst: PropTypes.bool,
  /** Helps render component without left/right borders. */
  isNotOnly: PropTypes.bool,
  /** Helps render component without left borders. */
  isLast: PropTypes.bool,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default InputAddOn
