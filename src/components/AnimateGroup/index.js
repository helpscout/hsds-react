import React, { PureComponent as Component } from 'react'
import {
  Transition,
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import PropTypes from 'prop-types'
import Animate from '../Animate'
import { classNames } from '../../utilities/classNames'
import { isComponentNamed } from '../../utilities/component'
import { COMPONENT_KEY as ANIMATE_COMPONENT_KEY } from '../Animate/utils'

export const propTypes = {
  easing: PropTypes.string,
  delay: PropTypes.number,
  duration: PropTypes.number,
  sequence: PropTypes.string,
  stagger: PropTypes.bool,
  staggerDelay: PropTypes.number,
  staggerDuration: PropTypes.number,
}

const defaultProps = {
  delay: 0,
  easing: 'ease-in-out',
  stagger: false,
  staggerDelay: 200,
}

class AnimateGroup extends Component {
  static defaultProps = defaultProps

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

    const childrenMarkup = stagger
      ? React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) return null
          if (
            isComponentNamed(child, ANIMATE_COMPONENT_KEY) ||
            child.type === Animate ||
            child.type === Transition ||
            child.type === CSSTransition
          ) {
            const key = child.props.id || child.key || index
            // Ignoring all these because, for whatever reason, the props
            // get lost in the JSDOM/Enzyme setup. It works in browser though.
            /* istanbul ignore next */
            const easingProp = child.props.easing || easing
            /* istanbul ignore next */
            const durationProp =
              (stagger && staggerDuration ? staggerDuration : duration) ||
              child.props.duration
            const delayProp = child.props.delay || 0
            const staggerIndexDelay = delayProp + (index + 1) * staggerDelay
            /* istanbul ignore next */
            const computedDelayProp = stagger ? staggerIndexDelay : delay
            /* istanbul ignore next */
            const sequenceProp = child.props.sequence || sequence

            return React.cloneElement(child, {
              ...child.props,
              duration: durationProp,
              delay: computedDelayProp,
              easing: easingProp,
              sequence: sequenceProp,
              key,
            })
          } else {
            return null
          }
        })
      : children

    const transitionGroupProps = {
      appear,
      enter,
      exit,
    }

    return (
      <TransitionGroup
        {...getValidProps(rest)}
        {...transitionGroupProps}
        className={componentClassName}
      >
        {childrenMarkup}
      </TransitionGroup>
    )
  }
}

AnimateGroup.propTypes = propTypes

export default AnimateGroup
