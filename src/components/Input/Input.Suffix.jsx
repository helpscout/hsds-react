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

InputSuffix.defaultProps = {
  'data-cy': 'InputSuffix',
  isAction: false,
  isSeamless: false,
}

InputSuffix.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  /** Gives some spacing in case is action with a margin */
  isAction: PropTypes.bool,
  /** Removes the border around the input. */
  isSeamless: PropTypes.bool,
}

export default InputSuffix
