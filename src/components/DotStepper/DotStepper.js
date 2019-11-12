import React from 'react'
import Tooltip from '../Tooltip'
import { DotStepperUI, BulletUI, ProgressBulletUI } from './DotStepper.css.js'
import { classNames } from '../../utilities/classNames'

class DotStepper extends React.Component {
  static defaultProps = {
    numSteps: 1,
    step: 1,
  }

  getClassName() {
    const { className } = this.props
    return classNames('c-DotStepper', className)
  }

  getTitle() {
    const { numSteps, step } = this.props
    return `Step ${step} of ${numSteps}`
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
    const title = this.getTitle()

    return (
      <Tooltip title={title} placement="bottom">
        <DotStepperUI
          data-cy="DotStepper"
          aria-label={title}
          className={this.getClassName()}
          {...rest}
        >
          {this.renderSteps()}
          <ProgressBulletUI step={step} />
        </DotStepperUI>
      </Tooltip>
    )
  }
}

export default DotStepper
