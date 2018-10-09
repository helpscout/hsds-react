import * as React from 'react'
import {
  Transition,
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Animate from '../Animate'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { isComponentNamed } from '../../utilities/component'
import { COMPONENT_KEY } from './utils'
import { COMPONENT_KEY as ANIMATE_COMPONENT_KEY } from '../Animate/utils'

export interface Props {
  appear?: any
  className?: string
  easing: string
  enter?: any
  exit?: any
  delay: number
  duration?: number
  sequence?: string
  stagger: boolean
  staggerDelay: number
  staggerDuration?: number
}

type AnimateChildProps = {
  delay?: number
  duration?: number
  easing?: string
  id?: string
  sequence?: string
}

class AnimateGroup extends React.Component<Props> {
  static defaultProps = {
    delay: 0,
    easing: 'ease-in-out',
    stagger: false,
    staggerDelay: 200,
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

    const childrenMarkup = stagger
      ? React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) return null
          if (
            isComponentNamed(child, ANIMATE_COMPONENT_KEY) ||
            child.type === Animate ||
            child.type === Transition ||
            child.type === CSSTransition
          ) {
            const childProps: AnimateChildProps = child.props

            const key = childProps.id || child.key || index
            // Ignoring all these because, for whatever reason, the props
            // get lost in the JSDOM/Enzyme setup. It works in browser though.
            /* istanbul ignore next */
            const easingProp = childProps.easing || easing
            /* istanbul ignore next */
            const durationProp =
              (stagger && staggerDuration ? staggerDuration : duration) ||
              childProps.duration
            const delayProp = childProps.delay || 0
            const staggerIndexDelay = delayProp + (index + 1) * staggerDelay
            /* istanbul ignore next */
            const computedDelayProp = stagger ? staggerIndexDelay : delay
            /* istanbul ignore next */
            const sequenceProp = childProps.sequence || sequence

            return React.cloneElement(child, {
              ...childProps,
              // @ts-ignore
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

namespaceComponent(COMPONENT_KEY)(AnimateGroup)

export default AnimateGroup
