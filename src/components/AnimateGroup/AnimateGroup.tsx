import * as React from 'react'
import { TransitionGroup } from 'react-transition-group'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import PropProvider from '../PropProvider'
import propConnect from '../PropProvider/propConnect'
import { classNames } from '../../utilities/classNames'
import { getComponentKey } from '../../utilities/component'
import { COMPONENT_KEY } from './AnimateGroup.utils'

export interface Props {
  appear?: any
  children?: any
  className?: string
  childFactory: (...args: any) => any
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

export class AnimateGroup extends React.PureComponent<Props> {
  static defaultProps = {
    childFactory: child => child,
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

  childFactory = (child, index) => {
    const { childFactory } = this.props
    const animateProps = this.getAnimatePropsFromIndex(index)
    const key = getComponentKey(child, index)

    return childFactory(
      <PropProvider value={animateProps} key={key}>
        {child}
      </PropProvider>,
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

const PropConnectedComponent = propConnect(COMPONENT_KEY)(AnimateGroup)

export default PropConnectedComponent
