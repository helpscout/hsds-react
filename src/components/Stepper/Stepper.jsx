import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Step from './Stepper.Step'
import { classNames } from '../../utilities/classNames'
import { getComponentKey } from '../../utilities/component'
import { isDefined } from '../../utilities/is'
import { noop } from '../../utilities/other'
import { StepperUI, StepWrapperUI } from './Stepper.css'

export class Stepper extends React.PureComponent {
  static className = 'c-Stepper'
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

  getProgress() {
    const matchIndex = this.getMatchIndex()
    const progress = matchIndex >= 0 ? matchIndex : 0

    return progress + 1
  }

  getMatchIndex() {
    const { currentIndex } = this.props
    const matchIndex = isDefined(currentIndex) ? currentIndex : -1

    return matchIndex
  }

  getCurrentTitle() {
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
        ref={innerRef}
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

Stepper.propTypes = {
  className: PropTypes.string,
  currentIndex: PropTypes.any,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  innerRef: PropTypes.func,
  isClickable: PropTypes.bool,
  onChange: PropTypes.func,
  onComplete: PropTypes.func,
  onStepClick: PropTypes.func,
  steps: PropTypes.arrayOf(
    PropTypes.shape({ title: PropTypes.string, id: PropTypes.string })
  ),
}

Stepper.defaultProps = {
  currentIndex: 0,
  'data-cy': 'Stepper',
  innerRef: noop,
  isClickable: false,
  onChange: noop,
  onComplete: noop,
  onStepClick: noop,
  steps: [],
}

export default Stepper
