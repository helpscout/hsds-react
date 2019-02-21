import * as React from 'react'
import propConnect from '../PropProvider/propConnect'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Text from '../Text'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { StepUI } from './Stepper.css'
import { STEP_COMPONENT_KEY } from './Stepper.utils'
import { StepperStep } from './Stepper.types'

export interface Props extends StepperStep {
  className?: string
  currentIndex: number
  children?: any
  innerRef: (node: HTMLElement) => void
  isCurrent: boolean
}

export class Step extends React.PureComponent<Props> {
  static className = 'c-StepperStep'
  static defaultProps = {
    isCurrent: false,
    innerRef: noop,
  }

  getClassName() {
    const { className, isCurrent } = this.props
    return classNames(Step.className, isCurrent && 'is-current', className)
  }

  render() {
    const { children, description, innerRef, title, ...rest } = this.props

    return (
      <StepUI
        {...getValidProps(rest)}
        className={this.getClassName()}
        innerRef={innerRef}
      >
        <Text size="14">{title}</Text>
      </StepUI>
    )
  }
}

const PropConnectedComponent = propConnect(STEP_COMPONENT_KEY)(Step)

export default PropConnectedComponent
