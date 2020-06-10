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

InputAddOn.propTypes = {
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  isFirst: PropTypes.bool,
  isNotOnly: PropTypes.bool,
  isLast: PropTypes.bool,
}

InputAddOn.defaultProps = {
  'data-cy': 'InputAddOn',
  isFirst: false,
  isNotOnly: false,
  isLast: false,
}

export default InputAddOn
