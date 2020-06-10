import React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { withMotion } from '../Motion'
import Condition from '../Condition'
import { classNames } from '../../utilities/classNames'
import { AddButtonContentUI } from './ConditionField.css'

export const AddButton = props => {
  const { className, ...rest } = props
  const componentClassName = classNames(AddButton.className, className)

  return (
    <div data-cy="ConditionFieldAddButtonWrapper">
      <AddButtonContentUI>
        <Condition.AddButton
          {...getValidProps(rest)}
          className={componentClassName}
        />
      </AddButtonContentUI>
    </div>
  )
}

AddButton.className = 'c-ConditionFieldAddButton'

AddButton.defaultProps = {
  animationDuration: 250,
  animationEasing: 'linear',
  'data-cy': 'ConditionFieldAddButton',
  isBorderless: true,
  isWithMotion: true,
  type: 'or',
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
      node.style.overflow = 'initial'
    })
  },
  componentWillUnmount: ({ animate, node, props }) => {
    if (!props.isWithMotion) return Promise.resolve()

    const height = node.clientHeight
    node.style.height = height
    node.style.overflow = 'hidden'

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
})(AddButton)

export default AnimatedComponent
