import React, {PureComponent as Component} from 'react'
import {
  Transition,
  CSSTransition,
  TransitionGroup
} from 'react-transition-group'
import PropTypes from 'prop-types'
import Animate from '../Animate'
import classNames from '../../utilities/classNames'

export const propTypes = {
  easing: PropTypes.string,
  delay: PropTypes.number,
  duration: PropTypes.number,
  sequence: PropTypes.string,
  stagger: PropTypes.bool,
  staggerDelay: PropTypes.number,
  staggerDuration: PropTypes.number
}

const defaultProps = {
  easing: 'ease-in-out',
  stagger: false,
  staggerDelay: 200
}

class AnimateGroup extends Component {
  render () {
    const {
      className,
      children,
      delay,
      duration,
      easing,
      sequence,
      stagger,
      staggerDelay,
      staggerDuration,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-AnimateGroup',
      className
    )

    const childrenMarkup = stagger ? (
      React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return null
        if (
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
          const durationProp = (stagger && staggerDuration ? staggerDuration : duration) || child.props.duration
          const staggerIndexDelay = (child.props.delay + ((index + 1) * staggerDelay))
          /* istanbul ignore next */
          const delayProp = stagger ? staggerIndexDelay : delay
          /* istanbul ignore next */
          const sequenceProp = child.props.sequence || sequence

          return React.cloneElement(child, {
            ...child.props,
            duration: durationProp,
            delay: delayProp,
            easing: easingProp,
            sequence: sequenceProp,
            key
          })
        } else {
          return null
        }
      })
    ) : children

    return (
      <TransitionGroup className={componentClassName} {...rest}>
        {childrenMarkup}
      </TransitionGroup>
    )
  }
}

AnimateGroup.propTypes = propTypes
AnimateGroup.defaultProps = defaultProps

export default AnimateGroup
