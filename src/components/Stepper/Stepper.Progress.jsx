import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import classNames from 'classnames'
import { ProgressLineUI } from './Stepper.css'

export class StepperProgress extends React.PureComponent {
  static className = 'c-StepperStepProgress'

  getClassName() {
    const { className, isActive } = this.props

    return classNames(
      StepperProgress.className,
      isActive && 'is-active',
      className
    )
  }

  render() {
    const { children, innerRef, isActive, ...rest } = this.props

    return (
      <ProgressLineUI
        {...getValidProps(rest)}
        className={this.getClassName()}
        ref={innerRef}
      />
    )
  }
}

function noop() {}

StepperProgress.defaultProps = {
  'data-cy': 'StepperProgress',
  isActive: false,
  innerRef: noop,
}

StepperProgress.propTypes = {
  /** The className of the component. */
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  innerRef: PropTypes.func,
  /** Whether the current step is active */
  isActive: PropTypes.bool,
}

export default StepperProgress
