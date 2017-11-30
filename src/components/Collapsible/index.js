import React, {PureComponent as Component} from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'
import { requestAnimationFrame, noop } from '../../utilities/other'

export const propTypes = {
  duration: PropTypes.number,
  durationOpen: PropTypes.number,
  durationClose: PropTypes.number,
  isOpen: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func
}
const defaultProps = {
  duration: 300,
  isOpen: false,
  onOpen: noop,
  onClose: noop
}

class Collapsible extends Component {
  constructor (props) {
    super()
    this.state = {
      height: null,
      animationState: 'idle'
    }
    this._isMounted = false
    this.node = null
    this.heightNode = null
  }

  componentDidMount () {
    this._isMounted = true
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  componentWillReceiveProps ({isOpen: willOpen}) {
    const {isOpen} = this.props

    /* istanbul ignore next */
    if (isOpen !== willOpen) {
      this.safeSetState({animationState: 'measuring'})
    }
  }

  componentDidUpdate ({isOpen: wasOpen}) {
    this.handleAnimation(wasOpen)
    this.handleAnimationStateCallback()
  }

  safeSetState (state) {
    if (this._isMounted) {
      this.setState(state)
    }
  }

  handleAnimation (wasOpen) {
    const {animationState} = this.state
    const {duration} = this.props

    requestAnimationFrame(() => {
      switch (animationState) {
        case 'measuring':
          this.safeSetState({
            animationState: wasOpen ? 'closingStart' : 'openingStart',
            height: wasOpen && this.heightNode ? this.heightNode.scrollHeight : 0
          })
          break
        case 'closingStart':
          this.safeSetState({
            animationState: 'closing',
            height: 0
          })
          break
        case 'closing':
          setTimeout(() => {
            this.safeSetState({
              animationState: 'closed'
            })
          }, duration)
          break
        case 'openingStart':
          this.safeSetState({
            animationState: 'opening',
            height: this.heightNode ? this.heightNode.scrollHeight
            /* istanbul ignore next */
            : 0
          })
          break
        case 'opening':
          setTimeout(() => {
            this.safeSetState({
              animationState: 'opened'
            })
          }, duration)
          break
        default:
          break
      }
    })
  }

  handleAnimationStateCallback () {
    const {animationState} = this.state
    const {onOpen, onClose} = this.props

    switch (animationState) {
      case 'opened':
        onOpen()
        break
      case 'closed':
        onClose()
        break
      default:
        break
    }
  }

  collapsibleHeight (isOpen, animationState, height) {
    if (animationState === 'idle' && isOpen) {
      return isOpen ? 'auto'
      /* istanbul ignore next */
      : null
    }

    if (animationState === 'measuring') {
      return isOpen ? null : 'auto'
    }

    if (animationState === 'opened') {
      return 'auto'
    }

    return `${height || 0}px`
  }

  getTransitionDuration () {
    const {duration, durationOpen, durationClose} = this.props
    const {animationState} = this.state
    const openDuration = durationOpen !== undefined ? durationOpen : duration
    const closeDuration = durationClose !== undefined ? durationClose : duration
    const isOpening = animationState.indexOf('closing') < 0

    return isOpening ? openDuration : closeDuration
  }

  render () {
    const {
      className,
      children,
      duration,
      durationOpen,
      durationClose,
      isOpen,
      onOpen,
      onClose,
      style,
      ...rest
    } = this.props
    const {animationState, height} = this.state

    const animating = animationState !== 'idle'

    const componentClassName = classNames(
      'c-Collapsible',
      isOpen && 'is-open',
      animating && 'is-animating',
      className
    )

    const displayHeight = this.collapsibleHeight(isOpen, animationState, height)

    const content = animating || isOpen
      ? children
      : null

    const collapseStyle = {
      height: displayHeight,
      transitionDuration: `${this.getTransitionDuration()}ms`
    }
    const componentStyle = style ? Object.assign({}, style, collapseStyle) : collapseStyle

    return (
      <div
        aria-hidden={!isOpen}
        style={componentStyle}
        className={componentClassName}
        ref={node => { this.node = node }}
        {...rest}
      >
        <div ref={node => { this.heightNode = node }}>
          {content}
        </div>
      </div>
    )
  }
}

Collapsible.propTypes = propTypes
Collapsible.defaultProps = defaultProps

export default Collapsible
