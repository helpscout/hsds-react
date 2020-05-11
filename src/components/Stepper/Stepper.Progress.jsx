import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { ProgressLineUI } from './Stepper.css'

export class StepperProgress extends React.PureComponent {
  static className = 'c-StepperStepProgress'
  static defaultProps = {
    isActive: false,
    innerRef: noop,
  }

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
        {...rest}
        className={this.getClassName()}
        ref={innerRef}
      />
    )
  }
}

StepperProgress.propTypes = {
  className: PropTypes.string,
  innerRef: PropTypes.func,
  isActive: PropTypes.bool,
}

export default StepperProgress
