import React from 'react'
import PropTypes from 'prop-types'
import { Transition } from 'react-transition-group'
import { getSequenceNames } from '../../utilities/animation'
import classNames from 'classnames'
import { getEasingTiming } from '../../utilities/easing'
import { AnimateUI } from './Animate.css'
import { AnimateGroupContext } from '../AnimateGroup/AnimateGroup'

function noop() {}

export class Animate extends React.PureComponent {
  static contextType = AnimateGroupContext
  node

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

const AnimateConsumer = props => {
  const contextValue = React.useContext(AnimateGroupContext)

  if (contextValue) {
    let newProps
    if (props.delay && props.delay !== 0) {
      newProps = { ...contextValue, ...props }
    } else {
      newProps = { ...props, ...contextValue }
    }

    newProps.className = classNames(props.className, contextValue.className)

    return <Animate {...newProps} />
  }

  return <Animate {...props} />
}

Animate.defaultProps = {
  animateOnMount: true,
  delay: 0,
  'data-cy': 'Animate',
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

Animate.propTypes = {
  /** Automatically animates when component is rendered. */
  animateOnMount: PropTypes.bool,
  /** Applies `display: block` to the component. */
  block: PropTypes.bool,
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** The duration (in `ms`) to delay the animations. */
  delay: PropTypes.number,
  /** The duration (in `ms`) for the animation sequence. */
  duration: PropTypes.number,
  /** Determines the CSS easing transition function. */
  easing: PropTypes.string,
  /** Programatically triggering the animation. */
  in: PropTypes.bool,
  /** Applies `display: inline` to the component. */
  inline: PropTypes.bool,
  /** Applies `display: inline-block` to the component. */
  inlineBlock: PropTypes.bool,
  /** Mounts child component as soon as `Animate` mounts. */
  mountOnEnter: PropTypes.bool,
  /** Callback before the component's `enter` animation sequence. */
  onEnter: PropTypes.func,
  /** Callback after the component's `enter` animation sequence. */
  onEntered: PropTypes.func,
  /** Callback during the component's `enter` animation sequence. */
  onEntering: PropTypes.func,
  /** Callback after the component's `exit` animation sequence. */
  onExit: PropTypes.func,
  /** Callback before the component's `exit` animation sequence. */
  onExited: PropTypes.func,
  /** Callback during the component's `exit` animation sequence. */
  onExiting: PropTypes.func,
  /** Names of animation styles to apply. */
  sequence: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  /** The duration (in `ms`) to apply/remove the animations. */
  timeout: PropTypes.number,
  /** Determines the CSS transition property. */
  transitionProperty: PropTypes.string,
  /** Unmounts child component as soon as `Animate` unmounts.` */
  unmountOnExit: PropTypes.bool,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

AnimateConsumer.defaultProps = Animate.defaultProps

export default AnimateConsumer
