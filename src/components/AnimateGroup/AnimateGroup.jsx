import React from 'react'
import PropTypes from 'prop-types'
import { TransitionGroup } from 'react-transition-group'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { getComponentKey } from '../../utilities/component'

export const AnimateGroupContext = React.createContext({})

export class AnimateGroup extends React.PureComponent {
  static propTypes = {
    appear: PropTypes.any,
    className: PropTypes.string,
    childFactory: PropTypes.func,
    'data-cy': PropTypes.string,
    easing: PropTypes.string,
    enter: PropTypes.any,
    exit: PropTypes.any,
    delay: PropTypes.number,
    duration: PropTypes.number,
    sequence: PropTypes.string,
    stagger: PropTypes.bool,
    staggerDelay: PropTypes.number,
    staggerDuration: PropTypes.number,
    staggerMax: PropTypes.number,
  }

  static defaultProps = {
    childFactory: child => child,
    'data-cy': 'AnimateGroup',
    delay: 0,
    easing: 'ease-in-out',
    stagger: false,
    staggerDelay: 200,
    staggerMax: 20,
  }

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

export default AnimateGroup
