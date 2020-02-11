import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Text from '../Text'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import Progress from './Stepper.Progress'
import { StepUI, LineUI, CircleUI, GhostTitleUI } from './Stepper.css'

export class Step extends React.PureComponent {
  static displayName = 'Stepper.Step'

  static className = 'c-StepperStep'
  static defaultProps = {
    isActive: false,
    isClickable: false,
    index: 0,
    innerRef: noop,
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
    const { children, innerRef, isActive, title, ...rest } = this.props

    return (
      <StepUI
        {...getValidProps(rest)}
        className={this.getClassName()}
        onClick={this.handleOnClick}
        ref={innerRef}
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

Step.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.any,
  innerRef: PropTypes.func,
  index: PropTypes.number,
  isActive: PropTypes.bool,
  isClickable: PropTypes.bool,
  onClick: PropTypes.func,
}

export default Step
