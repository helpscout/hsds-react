import * as React from 'react'
import propConnect from '../PropProvider/propConnect'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Step from './Stepper.Step'
import { classNames } from '../../utilities/classNames'
import { getComponentKey } from '../../utilities/component'
import { isDefined } from '../../utilities/is'
import { noop } from '../../utilities/other'
import { StepperUI, StepWrapperUI } from './Stepper.css'
import { COMPONENT_KEY } from './Stepper.utils'
import { StepperStep } from './Stepper.types'

export interface Props {
  className?: string
  currentIndex?: any
  innerRef: (node: HTMLElement) => void
  isClickable: boolean
  onChange: (Step: any) => void
  onComplete: () => void
  onStepClick: (Step: any, event: any) => void
  steps: Array<StepperStep>
}

export class Stepper extends React.PureComponent<Props> {
  static className = 'c-Stepper'
  static defaultProps = {
    currentIndex: 0,
    innerRef: noop,
    isClickable: false,
    onChange: noop,
    onComplete: noop,
    onStepClick: noop,
    steps: [],
  }

  static Step = Step

  componentDidUpdate(prevProps) {
    if (prevProps.currentIndex !== this.props.currentIndex) {
      this.handleChangeCallback()
    }
  }

  handleChangeCallback() {
    const { onChange, onComplete, steps } = this.props
    const currentIndex = this.getMatchIndex()
    const step = this.getCurrentStep()

    if (step) {
      onChange(step)
    }
    if (currentIndex === steps.length - 1) {
      onComplete()
    }
  }

  handleOnStepClick = (event, index) => {
    const step = this.props.steps[index]

    this.props.onStepClick(step, event)
  }

  getClassName() {
    const { className } = this.props
    return classNames(Stepper.className, className)
  }

  getProgress(): number {
    const matchIndex = this.getMatchIndex()
    const progress = matchIndex >= 0 ? matchIndex : 0

    return progress + 1
  }

  getMatchIndex(): number {
    const { currentIndex } = this.props
    const matchIndex = isDefined(currentIndex) ? currentIndex : -1

    return matchIndex
  }

  getCurrentTitle(): string {
    const step = this.getCurrentStep()

    return step ? step.title : ''
  }

  getCurrentStep() {
    const { currentIndex, steps } = this.props

    return isDefined(currentIndex) && steps[currentIndex]
  }

  renderSteps() {
    const { isClickable, steps } = this.props
    const matchIndex = this.getMatchIndex()

    return steps.map((step, index) => {
      return (
        <Step
          {...step}
          key={getComponentKey(step, index)}
          isClickable={isClickable}
          isActive={index <= matchIndex}
          index={index}
          onClick={this.handleOnStepClick}
        />
      )
    })
  }

  render() {
    const { children, innerRef, steps, ...rest } = this.props

    return (
      <StepperUI
        {...getValidProps(rest)}
        className={this.getClassName()}
        innerRef={innerRef}
        aria-valuemax={steps.length}
        aria-valuemin={1}
        aria-valuenow={this.getProgress()}
        aria-valuetext={this.getCurrentTitle()}
        role="progressbar"
      >
        <StepWrapperUI className="c-StepperStepWrapper">
          {this.renderSteps()}
        </StepWrapperUI>
      </StepperUI>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY)(Stepper)

export default PropConnectedComponent
