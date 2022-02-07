import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Step from './Stepper.Step'
import classNames from 'classnames'
import { getComponentKey } from '../../utilities/component'
import { isDefined } from '../../utilities/is'
import { StepperUI, StepWrapperUI } from './Stepper.css'

const noop = () => undefined

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

Stepper.propTypes = {
  /** The className of the component. */
  className: PropTypes.string,
  /** The current step. */
  currentIndex: PropTypes.any,
  /** Enables clicking for the steps. */
  isClickable: PropTypes.bool,
  /** Callback when a step completes. */
  onChange: PropTypes.func,
  /** Callback when all steps are completed. */
  onComplete: PropTypes.func,
  /** Callback when a step is clicked. Enabled by `isClickable`. */
  onStepClick: PropTypes.func,
  /** Collection of steps. */
  steps: PropTypes.arrayOf(
    PropTypes.shape({ title: PropTypes.string, id: PropTypes.string })
  ),
  innerRef: PropTypes.func,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default Stepper
