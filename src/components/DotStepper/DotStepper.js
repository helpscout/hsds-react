import React from 'react'
import { DotStepperUI, BulletUI, ProgressBulletUI } from './DotStepper.css.js'
import { classNames } from '../../utilities/classNames'

class DotStepper extends React.Component {
  static defaultProps = {
    numSteps: 1,
    step: 1,
  }

  getAriaLabel() {
    const { numSteps, step } = this.props

    return `Step ${step} out of ${numSteps}`
  }

  getClassName() {
    const { className } = this.props
    return classNames('c-DotStepper', className)
  }

  renderSteps() {
    const { numSteps } = this.props
    let markup = []

    for (let i = 0; i < numSteps; i += 1) {
      markup.push(<BulletUI key={i}>•</BulletUI>)
    }

    return markup
  }

  render() {
    const { className, step, ...rest } = this.props

    return (
      <DotStepperUI
        aria-label={this.getAriaLabel()}
        className={this.getClassName()}
        {...rest}
      >
        <ProgressBulletUI step={step} />
        {this.renderSteps()}
      </DotStepperUI>
    )
  }
}

export default DotStepper
