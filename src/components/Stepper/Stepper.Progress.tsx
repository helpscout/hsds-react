import * as React from 'react'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { ProgressLineUI } from './styles/Stepper.css'

export interface Props {
  className?: string
  innerRef: (node: HTMLElement) => void
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
        ref={innerRef as any}
      />
    )
  }
}

export default Progress
