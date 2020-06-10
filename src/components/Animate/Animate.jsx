import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { Transition } from 'react-transition-group'
import { getSequenceNames } from '../../utilities/animation'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { getEasingTiming } from '../../utilities/easing'
import { AnimateUI } from './Animate.css'
import { AnimateGroupContext } from '../AnimateGroup/AnimateGroup'

export class Animate extends React.PureComponent {
  static propTypes = {
    animateOnMount: PropTypes.bool,
    block: PropTypes.bool,
    className: PropTypes.string,
    delay: PropTypes.number,
    duration: PropTypes.number,
    easing: PropTypes.string,
    'data-cy': PropTypes.string,
    in: PropTypes.bool,
    inline: PropTypes.bool,
    inlineBlock: PropTypes.bool,
    mountOnEnter: PropTypes.bool,
    onEnter: PropTypes.func,
    onEntered: PropTypes.func,
    onEntering: PropTypes.func,
    onExit: PropTypes.func,
    onExited: PropTypes.func,
    onExiting: PropTypes.func,
    sequence: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    style: PropTypes.any,
    timeout: PropTypes.number,
    transitionProperty: PropTypes.string,
    unmountOnExit: PropTypes.bool,
  }

  static defaultProps = {
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
        {...getValidProps(rest)}
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
    const newProps = { ...contextValue, ...props }
    newProps.className = classNames(props.className, contextValue.className)
    return <Animate {...newProps} />
  }

  return <Animate {...props} />
}

export default AnimateConsumer
