import { AnimationSequence } from './Animate.types'
import * as React from 'react'
import { Transition } from 'react-transition-group'
import { getSequenceNames } from '../../utilities/animation'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { getEasingTiming } from '../../utilities/easing'
import { AnimateUI } from './styles/Animate.css'

export interface Props {
  animateOnMount: boolean
  block: boolean
  children?: any
  className: string
  delay: number
  duration: number
  easing: string
  in: boolean
  inline: boolean
  inlineBlock: boolean
  mountOnEnter: boolean
  onEnter: () => void
  onEntered: () => void
  onEntering: () => void
  onExit: () => void
  onExited: () => void
  onExiting: () => void
  sequence: AnimationSequence
  style?: Object
  timeout: number
  transitionProperty: string
  unmountOnExit: boolean
}

export class Animate extends React.PureComponent<Props> {
  static defaultProps = {
    animateOnMount: true,
    delay: 0,
    duration: 300,
    easing: 'ease-in-out',
    in: true,
    mountOnEnter: true,
    onEnter: noop,
    onEntered: noop,
    onEntering: noop,
    onExit: noop,
    onExited: noop,
    onExiting: noop,
    sequence: ['fade'],
    transitionProperty: 'all',
    unmountOnExit: true,
  }

  node: HTMLElement

  render() {
    const {
      animateOnMount,
      block,
      children,
      className,
      duration,
      easing,
      in: transitionIn,
      inline,
      inlineBlock,
      mountOnEnter,
      style: defaultStyle,
      sequence,
      timeout,
      transitionProperty,
      unmountOnExit,
      delay,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-Animate',
      block && 'is-block',
      inline && 'is-inline',
      inlineBlock && 'is-inlineBlock',
      className
    )

    const componentStyles = {
      ...defaultStyle,
      transitionProperty: transitionProperty,
      transitionDuration: `${duration}ms`,
      transitionDelay: `${delay}ms`,
      transitionTimingFunction: getEasingTiming(easing),
    }

    const sequenceClassNames = getSequenceNames(sequence)
      .map(s => `ax-${s}`)
      .join(' ')

    return (
      <Transition
        {...rest}
        mountOnEnter={mountOnEnter}
        unmountOnExit={unmountOnExit}
        appear={animateOnMount}
        in={transitionIn}
        timeout={{
          enter: 0,
          exit: timeout !== undefined ? timeout : duration + delay,
        }}
      >
        {transitionState => (
          <AnimateUI
            className={classNames(
              componentClassName,
              sequenceClassNames,
              `ax-${transitionState}`
            )}
            ref={node => {
              // @ts-ignore
              this.node = node
            }}
            style={{ ...componentStyles }}
          >
            {children}
          </AnimateUI>
        )}
      </Transition>
    )
  }
}

export default Animate
