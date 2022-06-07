import React from 'react'
import PropTypes from 'prop-types'
import { TransitionGroup } from 'react-transition-group'
import { getValidProps } from '@hsds/utils-react'
import classNames from 'classnames'
import { getComponentKey } from '@hsds/utils-react'

export const AnimateGroupContext = React.createContext({})

export class AnimateGroup extends React.PureComponent {
  getAnimatePropsFromIndex = index => {
    const {
      duration: durationProp,
      delay: delayProp,
      easing,
      sequence,
      stagger,
      staggerDelay,
      staggerDuration,
      staggerMax,
    } = this.props

    const duration = stagger && staggerDuration ? staggerDuration : durationProp

    const count = index + 1
    const countBaseValue = count > staggerMax ? staggerMax : count
    const staggerIndexDelay = delayProp + countBaseValue * staggerDelay

    const delay = stagger ? staggerIndexDelay : delayProp

    return {
      duration,
      delay,
      easing,
      sequence,
    }
  }

  childFactory = (child, index) => {
    const { childFactory } = this.props
    const animateProps = this.getAnimatePropsFromIndex(index)
    const key = getComponentKey(child, index)

    return childFactory(
      <AnimateGroupContext.Provider value={animateProps} key={key}>
        {child}
      </AnimateGroupContext.Provider>,
      index
    )
  }

  render() {
    const {
      appear,
      className,
      children,
      delay,
      duration,
      enter,
      exit,
      easing,
      sequence,
      stagger,
      staggerDelay,
      staggerDuration,
      ...rest
    } = this.props

    const componentClassName = classNames('c-AnimateGroup', className)

    const transitionGroupProps = {
      appear,
      enter,
      exit,
      childFactory: this.childFactory,
    }

    return (
      <TransitionGroup
        {...getValidProps(rest)}
        {...transitionGroupProps}
        className={componentClassName}
      >
        {children}
      </TransitionGroup>
    )
  }
}

AnimateGroup.defaultProps = {
  childFactory: child => child,
  'data-cy': 'AnimateGroup',
  delay: 0,
  easing: 'ease-in-out',
  stagger: false,
  staggerDelay: 200,
  staggerMax: 20,
}

AnimateGroup.propTypes = {
  /** Determines the CSS easing transition function. */
  easing: PropTypes.string,
  /** Callback function to adjust the child component for `react-transition-group`. */
  childFactory: PropTypes.func,
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** The duration (in `ms`) to delay the child animations. */
  delay: PropTypes.number,
  /** The duration (in `ms`) for the child animation sequence. */
  duration: PropTypes.number,
  /** Names of animation styles to apply to child `Animate`. */
  sequence: PropTypes.string,
  /** Adds an incremental delay between child `Animate` components. */
  stagger: PropTypes.bool,
  /** Amount of time (`ms`) to delay for `stagger`. */
  staggerDelay: PropTypes.number,
  /** Time (`ms`) to for staggering animation durations. */
  staggerDuration: PropTypes.number,
  appear: PropTypes.any,
  exit: PropTypes.any,
  enter: PropTypes.any,
  staggerMax: PropTypes.number,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default AnimateGroup
