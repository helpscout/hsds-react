import * as React from 'react'
import propConnect from '../PropProvider/propConnect'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Step from './Stepper.Step'
import { classNames } from '../../utilities/classNames'
import { getComponentKey } from '../../utilities/component'
import { noop } from '../../utilities/other'
import { StepperUI } from './Stepper.css'
import { COMPONENT_KEY } from './Stepper.utils'
import { StepperStep } from './Stepper.types'

export interface Props {
  className?: string
  currentIndex: number
  innerRef: (node: HTMLElement) => void
  steps: Array<StepperStep>
}

export class Stepper extends React.PureComponent<Props> {
  static className = 'c-Stepper'
  static defaultProps = {
    currentIndex: 0,
    innerRef: noop,
    steps: [],
  }

  static Step = Step

  getClassName() {
    const { className } = this.props
    return classNames(Stepper.className, className)
  }

  renderSteps() {
    const { currentIndex, steps } = this.props

    return steps.map((step, index) => {
      return (
        <Step
          {...step}
          key={getComponentKey(step, index)}
          isCurrent={index === currentIndex}
        />
      )
    })
  }

  render() {
    const { children, innerRef, ...rest } = this.props

    return (
      <StepperUI
        {...getValidProps(rest)}
        className={this.getClassName()}
        innerRef={innerRef}
      >
        {this.renderSteps()}
      </StepperUI>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY)(Stepper)

export default PropConnectedComponent
