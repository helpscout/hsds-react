import React, { PureComponent as Component } from 'react'
import PropTypes from 'prop-types'
import { Transition } from 'react-transition-group'
import { getSequenceNames } from '../../utilities/animation'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { getEasingTiming } from '../../utilities/easing'
import { sequencesType } from './propTypes'

export const propTypes = {
  animateOnMount: PropTypes.bool,
  block: PropTypes.bool,
  className: PropTypes.string,
  delay: PropTypes.number,
  duration: PropTypes.number,
  easing: PropTypes.string,
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
  sequence: sequencesType,
  timeout: PropTypes.number,
  transitionProperty: PropTypes.string,
  unmountOnExit: PropTypes.bool,
}

const defaultProps = {
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

class Animate extends Component {
  constructor(props) {
    super()
    this.node = null
  }

  componentWillUnmount() {
    this.node = null
  }

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

    const componentStyles = Object.assign({}, defaultStyle, {
      transitionProperty: transitionProperty,
      transitionDuration: `${duration}ms`,
      transitionDelay: `${delay}ms`,
      transitionTimingFunction: getEasingTiming(easing),
    })

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
          <div
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
          </div>
        )}
      </Transition>
    )
  }
}

Animate.propTypes = propTypes
Animate.defaultProps = defaultProps
Animate.displayName = 'Animate'

export default Animate
