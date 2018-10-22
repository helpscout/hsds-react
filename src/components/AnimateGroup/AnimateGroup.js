// @flow
import React, { Component } from 'react'
import { TransitionGroup } from 'react-transition-group'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import PropProvider from '../PropProvider'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { COMPONENT_KEY } from './utils'

export type Props = {
  easing: string,
  delay: number,
  duration?: number,
  sequence?: string,
  stagger: boolean,
  staggerDelay: number,
  staggerDuration?: number,
}

class AnimateGroup extends Component<Props> {
  static defaultProps = {
    delay: 0,
    easing: 'ease-in-out',
    stagger: false,
    staggerDelay: 200,
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
    } = this.props

    const duration = stagger && staggerDuration ? staggerDuration : durationProp
    const staggerIndexDelay = delayProp + (index + 1) * staggerDelay

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
    const { children, stagger } = this.props
    if (!stagger) return children

    return React.Children.map(children, (child, index) => {
      const animateProps = this.getAnimatePropsFromIndex(index)

      return <PropProvider value={animateProps}>{child}</PropProvider>
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
