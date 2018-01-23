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
  stagger: PropTypes.bool,
  staggerDelay: PropTypes.number
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
      easing,
      stagger,
      staggerDelay,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-AnimateGroup',
      className
    )

    const childrenMarkup = stagger ? (
      React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return null

        const key = child.props.id || index
        const easingProp = child.props.easing || easing

        if (
          child.type === Animate ||
          child.type === Transition ||
          child.type === CSSTransition
        ) {
          return React.cloneElement(child, {
            easing: easingProp,
            wait: (child.props.wait + ((index + 1) * staggerDelay)),
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
