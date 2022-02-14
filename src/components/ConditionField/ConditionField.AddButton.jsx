/* istanbul ignore file */
import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { withMotion } from '../Motion'
import Condition from '../Condition'
import classNames from 'classnames'
import { AddButtonContentUI } from './ConditionField.css'

export const ConditionFieldAddButton = props => {
  const { className, onTypeChanged, selectableType, ...rest } = props
  const componentClassName = classNames('c-ConditionFieldAddButton', className)

  return (
    <div data-cy="ConditionFieldAddButtonWrapper">
      <AddButtonContentUI>
        <Condition.AddButton
          {...getValidProps(rest)}
          onTypeChanged={onTypeChanged}
          className={componentClassName}
          selectableType={selectableType}
        />
      </AddButtonContentUI>
    </div>
  )
}

function noop() {}

ConditionFieldAddButton.defaultProps = {
  animationDuration: 250,
  animationEasing: 'linear',
  'data-cy': 'ConditionFieldAddButton',
  isBorderless: true,
  isWithMotion: true,
  type: 'or',
  onTypeChanged: noop,
  selectableType: false,
}

ConditionFieldAddButton.propTypes = {
  /** Time (ms) it takes to animate on mount/unmount. */
  animationDuration: PropTypes.number,
  /** Time (ms) it takes to animate on mount/unmount. */
  animationEasing: PropTypes.string,
  /** The className of the component. */
  className: PropTypes.string,
  /** Retrieve the inner DOM node. */
  ref: PropTypes.func,
  /** Renders a white border. */
  isBorderless: PropTypes.bool,
  /** Callback when component is clicked. */
  onClick: PropTypes.func,
  /** Time (ms) it takes to scroll into view. */
  scrollDuration: PropTypes.number,
  /** Amount (px) used to calculate scrolling into view. */
  scrollOffset: PropTypes.number,
  /** The operator. (`and`/`or`) */
  type: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  /** Callback when type changed */
  onTypeChanged: PropTypes.func,
  /** Indicate if type can be changed */
  selectableType: PropTypes.bool,
}

// @helpscout/motion prevents these animations from running within a
// test environment.
// JSDOM cannot run these animations, since the animation engine relies
// on recursive requestAnimationFrame to increment the animations.
const AnimatedComponent = withMotion({
  isAnimateOnInitialMount: false,
  componentDidMount: ({ animate, node, props }) => {
    if (!props.isWithMotion) return Promise.resolve()

    const height = node.clientHeight
    node.style.height = 0
    node.style.overflow = 'hidden'
    node.style.willChange = ''

    return animate({
      keyframes: [
        {
          height: [0, height],
          opacity: [0, 1],
        },
      ],
      duration: props.animationDuration,
      easing: props.animationEasing,
    }).finished.then(() => {
      node.style.willChange = ''
      node.style.overflow = 'initial'
    })
  },
  componentWillUnmount: ({ animate, node, props }) => {
    if (!props.isWithMotion) return Promise.resolve()

    const height = node.clientHeight
    node.style.height = height
    node.style.overflow = 'hidden'
    node.style.willChange = ''

    return animate({
      keyframes: [
        {
          height: [height, 0],
          opacity: [1, 0],
        },
      ],
      duration: props.animationDuration,
      easing: props.animationEasing,
    }).finished
  },
})(ConditionFieldAddButton)

export default AnimatedComponent
