import React, {PureComponent as Component} from 'react'
import PropTypes from 'prop-types'
import { Transition } from 'react-transition-group'
import animations from './animations'
import { getSequenceNames } from '../../utilities/animation'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { getEasingTiming } from '../../utilities/easing'
import { sequencesType } from './propTypes'

export const propTypes = {
  animateOnMount: PropTypes.bool,
  block: PropTypes.bool,
  className: PropTypes.string,
  duration: PropTypes.number,
  easing: PropTypes.string,
  mountOnEnter: PropTypes.bool,
  in: PropTypes.bool,
  inline: PropTypes.bool,
  inlineBlock: PropTypes.bool,
  onEnter: PropTypes.func,
  onEntering: PropTypes.func,
  onEntered: PropTypes.func,
  onExiting: PropTypes.func,
  onExit: PropTypes.func,
  onExited: PropTypes.func,
  sequence: sequencesType,
  transitionProperty: PropTypes.string,
  wait: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object
  ]),
  unmountOnExit: PropTypes.bool
}

const defaultProps = {
  animateOnMount: true,
  duration: 200,
  easing: 'ease-in-out',
  in: true,
  mountOnEnter: true,
  onEnter: noop,
  onEntering: noop,
  onEntered: noop,
  onExiting: noop,
  onExit: noop,
  onExited: noop,
  sequence: ['fade'],
  transitionProperty: 'all',
  unmountOnExit: true,
  wait: 0
}

class Animate extends Component {
  constructor (props) {
    super()
    this.node = null
  }

  componentWillUnmount () {
    this.node = null
  }

  render () {
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
      transitionProperty,
      unmountOnExit,
      wait,
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
      transitionDelay: `${wait}ms`,
      transitionTimingFunction: getEasingTiming(easing)
    })

    const animationStyles = mapAnimationStyles(
      animations,
      getSequenceNames(sequence)
    )

    return (
      <Transition
        {...rest}
        mountOnEnter={mountOnEnter}
        unmountOnExit={unmountOnExit}
        appear={animateOnMount}
        in={transitionIn}
        timeout={duration}
      >{(transitionState) => (
        <div
          className={classNames(componentClassName, `is-${transitionState}`)}
          ref={node => { this.node = node }}
          style={{...componentStyles, ...animationStyles[transitionState]}}
        >
          {children}
        </div>
      )}
      </Transition>
    )
  }
}

export const mapAnimationStyles = (animations, sequences) => {
  let styles = {
    entering: {},
    entered: {},
    exiting: {},
    exited: {}
  }

  if (!Array.isArray(sequences)) return styles

  sequences.forEach(sequence => {
    const animation = animations[sequence]
    /* istanbul ignore else */
    if (animation) {
      Object.keys(animation).forEach(key => {
        styles[key] = Object.assign(styles[key], animation[key])
      })
    }
  })

  return styles
}

Animate.propTypes = propTypes
Animate.defaultProps = defaultProps
Animate.displayName = 'Animate'

export default Animate
