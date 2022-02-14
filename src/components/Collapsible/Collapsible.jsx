import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import classNames from 'classnames'
import { requestAnimationFrame } from '../../utilities/other'
import { CollapsibleUI } from './Collapsible.css'

class Collapsible extends React.Component {
  state = {
    height: 0,
    animationState: 'idle',
  }

  _isMounted = false
  node
  heightNode

  componentDidMount() {
    this._isMounted = true
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  shouldFireStateCallback = (prevProps, prevState) => {
    return (
      prevProps.isOpen !== this.props.isOpen &&
      prevState.animationState !== this.state.animationState
    )
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { isOpen: willOpen } = nextProps

    if (willOpen !== this.props.isOpen) {
      this.safeSetState({ animationState: 'measuring' })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { isOpen: wasOpen } = prevProps

    this.handleAnimation(wasOpen)

    if (this.shouldFireStateCallback(prevProps, prevState)) {
      this.handleAnimationStateCallback()
    }
  }

  safeSetState(state) {
    if (this._isMounted) {
      this.setState(state)
    }
  }

  handleAnimation(wasOpen) {
    const { animationState } = this.state
    const { duration } = this.props

    requestAnimationFrame(() => {
      switch (animationState) {
        case 'measuring':
          this.safeSetState({
            animationState: wasOpen ? 'closingStart' : 'openingStart',
            height:
              wasOpen && this.heightNode ? this.heightNode.scrollHeight : 0,
          })
          break
        case 'closingStart':
          this.safeSetState({
            animationState: 'closing',
            height: 0,
          })
          break

        /* Reliable to test in JSDOM due to timeouts */
        case 'closing':
          setTimeout(() => {
            this.safeSetState({
              animationState: 'closed',
            })
          }, duration)
          break
        case 'openingStart':
          this.safeSetState({
            animationState: 'opening',
            height: this.heightNode ? this.heightNode.scrollHeight : 0,
          })
          break

        /* Reliable to test in JSDOM due to timeouts */
        case 'opening':
          setTimeout(() => {
            this.safeSetState({
              animationState: 'opened',
            })
          }, duration)
          break
        default:
          break
      }
    })
  }

  handleAnimationStateCallback() {
    const { animationState } = this.state
    const { onOpen, onClose } = this.props

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

  collapsibleHeight(isOpen, animationState, height) {
    if (animationState === 'idle' && isOpen) {
      return isOpen ? 'auto' : null
    }

    if (animationState === 'measuring') {
      return isOpen ? null : 'auto'
    }

    if (animationState === 'opened') {
      return 'auto'
    }

    return `${height || 0}px`
  }

  getTransitionDuration() {
    const { duration, durationOpen, durationClose } = this.props
    const { animationState } = this.state
    const openDuration = durationOpen !== undefined ? durationOpen : duration
    const closeDuration = durationClose !== undefined ? durationClose : duration
    const isOpening = animationState.indexOf('closing') < 0

    return isOpening ? openDuration : closeDuration
  }

  setNodeRef = node => (this.node = node)
  setHeightNodeRef = node => (this.heightNode = node)

  render() {
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
      preRenderContent,
      ...rest
    } = this.props
    const { animationState, height } = this.state

    const animating = animationState !== 'idle'
    const closed = animationState === 'closed'

    const componentClassName = classNames(
      'c-Collapsible',
      isOpen && 'is-open',
      animating && 'is-animating',
      closed && 'is-closed',
      className
    )

    const displayHeight = this.collapsibleHeight(isOpen, animationState, height)

    const content = animating || isOpen || preRenderContent ? children : null

    const collapseStyle = {
      height: displayHeight,
      transitionDuration: `${this.getTransitionDuration()}ms`,
    }
    const componentStyle = {
      ...style,
      ...collapseStyle,
    }

    return (
      <CollapsibleUI
        {...getValidProps(rest)}
        aria-hidden={!isOpen}
        style={componentStyle}
        className={componentClassName}
        ref={this.setNodeRef}
      >
        <div ref={this.setHeightNodeRef}>{content}</div>
      </CollapsibleUI>
    )
  }
}

function noop() {}

Collapsible.defaultProps = {
  'data-cy': 'Collapsible',
  duration: 300,
  isOpen: false,
  onOpen: noop,
  onClose: noop,
  preRenderContent: false,
}

Collapsible.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Time (ms) for the expand/collapse animation. */
  duration: PropTypes.number,
  /** Time (ms) for the expand animation. */
  durationOpen: PropTypes.number,
  /** Time (ms) for the collapse animation. */
  durationClose: PropTypes.number,
  /** Opens/collapses the component. */
  isOpen: PropTypes.bool,
  /** Callback function when the component closes. */
  onClose: PropTypes.func,
  /** Callback function when the component opens. */
  onOpen: PropTypes.func,
  /** Custom styles to be added to the component. */
  style: PropTypes.any,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  /** Flag indicating if content should be pre-rendered to the DOM (otherwise the content would not be in the DOM until opened) */
  preRenderContent: PropTypes.bool,
}

export default Collapsible
