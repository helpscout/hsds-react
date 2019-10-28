import * as React from 'react'
import propConnect from '../PropProvider/propConnect'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Text from '../Text'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import Progress from './Stepper.Progress'
import { StepUI, LineUI, CircleUI, GhostTitleUI } from './styles/Stepper.css'
import { STEP_COMPONENT_KEY } from './Stepper.utils'
import { StepperStep } from './Stepper.types'

export interface Props extends StepperStep {
  className?: string
  children?: any
  ref: (node: HTMLElement) => void
  index: number
  isActive: boolean
  isClickable: boolean
  onClick: (event: any, index: number) => void
}

export class Step extends React.PureComponent<Props> {
  static className = 'c-StepperStep'
  static defaultProps = {
    isActive: false,
    isClickable: false,
    index: 0,
    ref: noop,
    onClick: noop,
  }

  getClassName() {
    const { className, isActive, isClickable } = this.props
    return classNames(
      Step.className,
      isClickable && 'is-clickable',
      isActive && 'is-active',
      className
    )
  }

  handleOnClick = event => {
    if (!this.props.isClickable) return

    this.props.onClick(event, this.props.index)
  }

  render() {
    const { children, ref, isActive, title, ...rest } = this.props

    return (
      <StepUI
        {...getValidProps(rest)}
        className={this.getClassName()}
        onClick={this.handleOnClick}
        ref={ref as any}
        title={title}
      >
        <Text className="c-StepperStepTitle" size="14">
          {title}
        </Text>
        <GhostTitleUI size="14" aria-hidden>
          {title}
        </GhostTitleUI>
        <CircleUI className="c-StepperStepCircle" isActive={isActive} />
        <LineUI />
        <Progress isActive={isActive} />
      </StepUI>
    )
  }
}

const PropConnectedComponent = propConnect(STEP_COMPONENT_KEY)(Step)

export default PropConnectedComponent
