import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { SuffixUI } from './Input.css'

class InputSuffix extends React.PureComponent {
  render() {
    const { className, isAction, isSeamless, ...rest } = this.props
    const componentClassName = classNames(
      'c-InputSuffix',
      'c-Input__item',
      'c-Input__suffix',
      isAction && 'is-action',
      isSeamless && 'is-seamless',
      className
    )

    return <SuffixUI {...getValidProps(rest)} className={componentClassName} />
  }
}

InputSuffix.propTypes = {
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  isAction: PropTypes.bool,
  isSeamless: PropTypes.bool,
}

InputSuffix.defaultProps = {
  'data-cy': 'InputSuffix',
  isAction: false,
  isSeamless: false,
}

export default InputSuffix
