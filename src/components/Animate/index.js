import React, {PureComponent as Component} from 'react'
import PropTypes from 'prop-types'
import anime from 'animejs'
import { Transition } from 'react-transition-group'
import animations from './animations'
import AnimationStates from '../../constants/AnimationStates'
import { getSequenceNames, getAnimationStyles } from '../../utilities/animation'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { sequencesType } from './propTypes'

export const propTypes = {
  animateOnMount: PropTypes.bool,
  block: PropTypes.bool,
  className: PropTypes.string,
  duration: PropTypes.number,
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
  wait: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object
  ])
}

const defaultProps = {
  animateOnMount: true,
  duration: 200,
  in: true,
  onEnter: noop,
  onEntering: noop,
  onEntered: noop,
  onExiting: noop,
  onExit: noop,
  onExited: noop,
  sequence: ['fade'],
  wait: 0
}

class Animate extends Component {
  constructor (props) {
    super()
    this.state = {
      duration: props.duration + getWait(props.wait, 'in'),
      in: false
    }
    this.handleOnEnter = this.handleOnEnter.bind(this)
    this.handleOnEntering = this.handleOnEntering.bind(this)
    this.handleOnEntered = this.handleOnEntered.bind(this)
    this.handleOnExiting = this.handleOnExiting.bind(this)
    this.handleOnExit = this.handleOnExit.bind(this)
    this.handleOnExited = this.handleOnExited.bind(this)
    this.initialStyles = {}
    this.node = null
    this.currentAnimation = null
    this._isMounted = false
  }

  componentWillMount () {
    this.initialStyles = this.getAnimationStyles(AnimationStates.MOUNT)
  }

  componentDidMount () {
    const { animateOnMount, in: transitionIn } = this.props

    if (animateOnMount || transitionIn) {
      this.setStateIn(true)
    } else {
      // this.setStateIn(transitionIn)
    }

    this._isMounted = true
  }

  componentWillReceiveProps (nextProps) {
    /* istanbul ignore next */
    if (nextProps.in !== undefined && nextProps.in !== this.state.in) {
      this.setStateIn(nextProps.in)
    }
  }

  componentWillUnmount () {
    this._isMounted = false

    this.pauseAnimation()
    // this.setStateIn(false)

    this.node = null
    this.currentAnimation = null
  }

  setStateIn (transitionIn) {
    const { wait } = this.props
    const waitSequence = transitionIn ? 'in' : 'out'
    // setTimeout(() => {
      if (this._isMounted) {
        this.setState({ in: transitionIn })
      }
    // }, getWait(wait, waitSequence))
  }

  shouldComponentUpdate (nextProps, nextState) {
    const { in: transitionIn } = this.state
    return nextProps.in !== transitionIn && nextState.in !== transitionIn
  }

  getAnimationStyles (animationState = AnimationStates.ENTER) {
    const {
      sequence
    } = this.props

    return getAnimationStyles({
      animations,
      animationState,
      node: this.node,
      sequences: getSequenceNames(sequence)
    })
  }

  makeAnimations (animationState = AnimationStates.ENTER) {
    const {
      duration
    } = this.props

    const animation = this.getAnimationStyles(animationState)
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

  setAnimation (state) {
    const animation = this.makeAnimations(state)
    if (animation) {
      this.currentAnimation = animation
    }
  }

  handleOnEnter () {
    const { onEnter } = this.props

    this.setAnimation(AnimationStates.ENTER)
    this.resolveAnimationPromise(onEnter)
  }

  handleOnEntering () {
    const { onEntering } = this.props

    this.setAnimation(AnimationStates.ENTERING)
    this.resolveAnimationPromise(onEntering)
  }

  handleOnEntered () {
    const { onEntered } = this.props

    this.setAnimation(AnimationStates.ENTERED)
    this.resolveAnimationPromise(onEntered)
  }

  handleOnExit () {
    const { onExit } = this.props

    this.pauseAnimation()
    this.setAnimation(AnimationStates.EXIT)
    this.resolveAnimationPromise(onExit)
  }

  handleOnExiting () {
    const { onExiting } = this.props

    this.setAnimation(AnimationStates.EXITING)
    this.resolveAnimationPromise(onExiting)
  }

  handleOnExited () {
    const { onExited } = this.props

    this.setAnimation(AnimationStates.EXITED)
    this.resolveAnimationPromise(onExited)
  }

  render () {
    const {
      animateOnMount,
      block,
      children,
      className,
      duration: propsDuration,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      in: propsIn,
      inline,
      inlineBlock,
      style: defaultStyle,
      sequence,
      wait,
      ...rest
    } = this.props

    const { duration, in: transitionIn } = this.state

    const handleOnEnter = this.handleOnEnter
    const handleOnEntering = this.handleOnEntering
    const handleOnEntered = this.handleOnEntered
    const handleOnExiting = this.handleOnExiting
    const handleOnExit = this.handleOnExit
    const handleOnExited = this.handleOnExited

    const componentClassName = classNames(
      'c-Animate',
      block && 'is-block',
      inline && 'is-inline',
      inlineBlock && 'is-inlineBlock',
      className
    )

    const componentStyles = Object.assign({}, this.initialStyles, defaultStyle)

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
        timeout={duration}
      >
        <div ref={node => { this.node = node }} style={componentStyles}>
          {children}
        </div>
      </Transition>
    )
  }
}

const getWait = (wait, sequence) => {
  const defaultWait = 0
  if (typeof wait === 'number') {
    return wait
  }
  if (typeof wait === 'object' && sequence) {
    return wait[sequence] !== undefined ? wait[sequence] : defaultWait
  }
  return defaultWait
}

Animate.propTypes = propTypes
Animate.defaultProps = defaultProps

export default Animate
