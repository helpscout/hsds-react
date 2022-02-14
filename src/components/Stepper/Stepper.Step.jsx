import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Text from '../Text'
import classNames from 'classnames'
import Progress from './Stepper.Progress'
import { StepUI, LineUI, CircleUI, GhostTitleUI } from './Stepper.css'

export class Step extends React.PureComponent {
  static className = 'c-StepperStep'

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

function noop() {}

Step.defaultProps = {
  'data-cy': 'Step',
  isActive: false,
  isClickable: false,
  index: 0,
  innerRef: noop,
  onClick: noop,
}

Step.propTypes = {
  /** The HTML title of the Step. */
  title: PropTypes.string,
  /** The unique ID of the Step. Used for mapping. */
  id: PropTypes.string,
  /** The className of the component. */
  className: PropTypes.string,
  index: PropTypes.number,
  /** Whether the current step is active */
  isActive: PropTypes.bool,
  /** Enables clicking for the steps. */
  isClickable: PropTypes.bool,
  /** Callback when a step is clicked. Enabled by `isClickable`. */
  onClick: PropTypes.func,
  innerRef: PropTypes.func,
}

export default Step
