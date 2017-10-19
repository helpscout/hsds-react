import React, {PureComponent as Component} from 'react'
import PropTypes from 'prop-types'
import anime from 'animejs'
import { Transition } from 'react-transition-group'
import sequences from './sequences'
import AnimationStates from '../../constants/AnimationStates'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'

export const propTypes = {
  className: PropTypes.string,
  duration: PropTypes.number,
  onEnter: PropTypes.func,
  onEntering: PropTypes.func,
  onEntered: PropTypes.func,
  onExiting: PropTypes.func,
  onExit: PropTypes.func,
  onExited: PropTypes.func,
  sequence: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object]))
}

const defaultProps = {
  duration: 600,
  onEnter: noop,
  onEntering: noop,
  onEntered: noop,
  onExiting: noop,
  onExit: noop,
  onExited: noop,
  sequence: ['fade']
}

class Animate extends Component {
  constructor () {
    super()
    this.handleOnEnter = this.handleOnEnter.bind(this)
    this.handleOnEntering = this.handleOnEntering.bind(this)
    this.handleOnEntered = this.handleOnEntered.bind(this)
    this.handleOnExiting = this.handleOnExiting.bind(this)
    this.handleOnExit = this.handleOnExit.bind(this)
    this.handleOnExited = this.handleOnExited.bind(this)
    this.node = null
    this.currentAnimation = null
  }

  componentDidMount () {
    console.log('mount')
  }

  componentWillUnmount () {
    this.pauseAnimation()
    this.node = null
    this.currentAnimation = null
  }

  getAnimationStylesFromSequence (sequence, animationState) {
    return typeof sequence === 'object' ? sequence
      : sequences[sequence] ? sequences[sequence][animationState] : {}
  }

  getAnimationStyles (animationState = AnimationStates.ENTER) {
    const {
      duration,
      sequence
    } = this.props

    const animation = sequence.reduce((styles, seq) => {
      return Object.assign(
        styles,
        this.getAnimationStylesFromSequence(seq, animationState)
      )
    }, {})
    if (!Object.keys(animation).length) return null

    return anime(Object.assign(
      {
        targets: this.node,
        duration
      },
      animation))
  }

  pauseAnimation () {
    if (this.currentAnimation) {
      this.currentAnimation.pause()
    }
  }

  resolveAnimationPromise (callback) {
    if (this.currentAnimation) {
      this.currentAnimation.finished.then(callback)
    } else {
      callback()
    }
  }

  handleOnEnter () {
    const { onEnter } = this.props
    console.log('enter')

    this.currentAnimation = this.getAnimationStyles(AnimationStates.ENTER)
    this.resolveAnimationPromise(onEnter)
  }

  handleOnEntering () {
    const { onEntering } = this.props
    console.log('entering')

    this.currentAnimation = this.getAnimationStyles(AnimationStates.ENTERING)
    this.resolveAnimationPromise(onEntering)
  }

  handleOnEntered () {
    const { onEntered } = this.props
    console.log('entered')

    this.currentAnimation = this.getAnimationStyles(AnimationStates.ENTERED)
    this.resolveAnimationPromise(onEntered)
  }

  handleOnExit () {
    const { onExit } = this.props
    console.log('exit')

    this.pauseAnimation()
    this.currentAnimation = this.getAnimationStyles(AnimationStates.EXIT)
    this.resolveAnimationPromise(onExit)
  }

  handleOnExiting () {
    const { onExiting } = this.props
    console.log('exiting')

    this.currentAnimation = this.getAnimationStyles(AnimationStates.EXITING)
    this.resolveAnimationPromise(onExiting)
  }

  handleOnExited () {
    const { onExited } = this.props
    console.log('exited')

    this.currentAnimation = this.getAnimationStyles(AnimationStates.EXITED)
    this.resolveAnimationPromise(onExited)
  }

  render () {
    const {
      children,
      className,
      duration,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      in: transitionIn,
      style: defaultStyle,
      sequence,
      ...rest
    } = this.props

    const handleOnEnter = this.handleOnEnter
    const handleOnEntering = this.handleOnEntering
    const handleOnEntered = this.handleOnEntered
    const handleOnExiting = this.handleOnExiting
    const handleOnExit = this.handleOnExit
    const handleOnExited = this.handleOnExited

    const componentClassName = classNames(
      'c-Animate',
      className
    )

    return (
      <Transition
        {...rest}
        className={componentClassName}
        in={transitionIn}
        onEnter={handleOnEnter}
        onEntering={handleOnEntering}
        onEntered={handleOnEntered}
        onExiting={handleOnExiting}
        onExit={handleOnExit}
        onExited={handleOnExited}
        mountOnEnter
        unmountOnExit
        timeout={duration}
      >
        <div ref={node => { this.node = node }} style={defaultStyle}>
          {children}
        </div>
      </Transition>
    )
  }
}

Animate.propTypes = propTypes
Animate.defaultProps = defaultProps

export default Animate
