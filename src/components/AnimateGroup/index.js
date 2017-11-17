import React from 'react'
import { TransitionGroup } from 'react-transition-group'
import PropTypes from 'prop-types'
import Animate from '../Animate'
import classNames from '../../utilities/classNames'

export const propTypes = {
  stagger: PropTypes.bool,
  staggerDelay: PropTypes.number
}

const defaultProps = {
  stagger: false,
  staggerDelay: 200
}

const AnimateGroup = props => {
  const {
    className,
    children,
    stagger,
    staggerDelay,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-AnimateGroup',
    className
  )

  const childrenMarkup = stagger ? (
    React.Children.map(children, (child, index) => {
      const { id } = child.props
      const key = id || index

      if (child.type === Animate) {
        return React.cloneElement(child, {
          wait: (child.props.wait + ((index + 1) * staggerDelay)),
          key
        })
      } else {
        return React.cloneElement(child, { key })
      }
    })
  ) : children

  return (
    <TransitionGroup className={componentClassName} {...rest}>
      {childrenMarkup}
    </TransitionGroup>
  )
}

AnimateGroup.propTypes = propTypes
AnimateGroup.defaultProps = defaultProps

export default AnimateGroup
