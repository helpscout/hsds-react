import * as React from 'react'
import { TransitionGroup } from 'react-transition-group'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import PropProvider from '../PropProvider'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent, getComponentKey } from '../../utilities/component'
import { COMPONENT_KEY } from './utils'

export interface Props {
  appear?: any
  children?: any
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
  staggerMax: number
}

class AnimateGroup extends React.PureComponent<Props> {
  static defaultProps = {
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
      Animate: {
        duration,
        delay,
        easing,
        sequence,
      },
    }
  }

  getChildrenMarkup = () => {
    const { children } = this.props

    return React.Children.map(children, (child, index) => {
      const animateProps = this.getAnimatePropsFromIndex(index)
      const key = getComponentKey(child, index)

      return (
        <PropProvider value={animateProps} key={key}>
          {child}
        </PropProvider>
      )
    })
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
    }

    return (
      <TransitionGroup
        {...getValidProps(rest)}
        {...transitionGroupProps}
        className={componentClassName}
      >
        {this.getChildrenMarkup()}
      </TransitionGroup>
    )
  }
}

namespaceComponent(COMPONENT_KEY)(AnimateGroup)

export default AnimateGroup
