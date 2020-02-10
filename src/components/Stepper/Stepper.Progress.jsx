import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { ProgressLineUI } from './Stepper.css'

export interface Props {
  className?: string
  innerRef: (node) => void
  isActive: boolean
}

export class Progress extends React.PureComponent<Props> {
  static className = 'c-StepperStepProgress'
  static defaultProps = {
    isActive: false,
    innerRef: noop,
  }

  getClassName() {
    const { className, isActive } = this.props
    return classNames(Progress.className, isActive && 'is-active', className)
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

export default Progress
