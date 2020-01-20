import * as React from 'react'
import { classNames } from '../../utilities/classNames'
import { requestAnimationFrame, noop } from '../../utilities/other'
import { CollapsibleUI } from './Collapsible.css'
import { CollapsibleProps, CollapsibleState } from './Collapsible.types'

class Collapsible extends React.Component<CollapsibleProps, CollapsibleState> {
  static defaultProps = {
    duration: 300,
    isOpen: false,
    onOpen: noop,
    onClose: noop,
  }

  state = {
    height: 0,
    animationState: 'idle',
  }

  _isMounted = false
  node: HTMLDivElement
  heightNode: HTMLDivElement

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

  componentWillReceiveProps(nextProps) {
    const { isOpen: willOpen } = nextProps
    /* istanbul ignore next */
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
    /* istanbul ignore else */
    if (this._isMounted) {
      this.setState(state)
    }
  }

  handleAnimation(wasOpen: boolean) {
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
        /* istanbul ignore next */
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
            height: this.heightNode
              ? /* istanbul ignore next */
                this.heightNode.scrollHeight
              : /* istanbul ignore next */
                0,
          })
          break
        /* istanbul ignore next */
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

  collapsibleHeight(isOpen: boolean, animationState: string, height: number) {
    if (animationState === 'idle' && isOpen) {
      return isOpen
        ? 'auto'
        : /* istanbul ignore next */
          null
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

  setNodeRef = (node: HTMLDivElement) => (this.node = node)
  setHeightNodeRef = (node: HTMLDivElement) => (this.heightNode = node)

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

    const content = animating || isOpen ? children : null

    const collapseStyle = {
      height: displayHeight,
      transitionDuration: `${this.getTransitionDuration()}ms`,
    }
    const componentStyle: Object = {
      ...style,
      ...collapseStyle,
    }

    return (
      <CollapsibleUI
        {...rest}
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

export default Collapsible
