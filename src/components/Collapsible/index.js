// @flow
import React, { PureComponent as Component } from 'react'
import classNames from '../../utilities/classNames'
import { requestAnimationFrame, noop } from '../../utilities/other'

type Props = {
  children?: any,
  className?: string,
  duration: number,
  durationOpen?: ?number,
  durationClose?: ?number,
  isOpen: boolean,
  onOpen: () => void,
  onClose: () => void,
  style?: Object,
}

type State = {
  animationState: string,
  height?: ?number,
}

class Collapsible extends Component<Props, State> {
  static defaultProps = {
    duration: 300,
    isOpen: false,
    onOpen: noop,
    onClose: noop,
  }

  state = {
    height: null,
    animationState: 'idle',
  }

  _isMounted = false
  node = null
  heightNode = null

  componentDidMount() {
    this._isMounted = true
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  componentWillReceiveProps(nextProps: Object) {
    const { isOpen: willOpen } = nextProps
    const { isOpen } = this.props

    /* istanbul ignore next */
    if (isOpen !== willOpen) {
      this.safeSetState({ animationState: 'measuring' })
    }
  }

  componentDidUpdate(prevProps: Object) {
    const { isOpen: wasOpen } = prevProps
    this.handleAnimation(wasOpen)
    this.handleAnimationStateCallback()
  }

  safeSetState(state: Object) {
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
              ? this.heightNode.scrollHeight
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

  collapsibleHeight(isOpen: boolean, animationState: string, height?: ?number) {
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

  getTransitionDuration(): number {
    const { duration, durationOpen, durationClose } = this.props
    const { animationState } = this.state
    const openDuration = durationOpen !== undefined ? durationOpen : duration
    const closeDuration = durationClose !== undefined ? durationClose : duration
    const isOpening = animationState.indexOf('closing') < 0

    return isOpening ? openDuration : closeDuration
  }

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

    const componentClassName = classNames(
      'c-Collapsible',
      isOpen && 'is-open',
      animating && 'is-animating',
      className
    )

    const displayHeight = this.collapsibleHeight(isOpen, animationState, height)

    const content = animating || isOpen ? children : null

    const collapseStyle = {
      height: displayHeight,
      transitionDuration: `${this.getTransitionDuration()}ms`,
    }
    const componentStyle = style
      ? Object.assign({}, style, collapseStyle)
      : collapseStyle

    return (
      <div
        aria-hidden={!isOpen}
        style={componentStyle}
        className={componentClassName}
        ref={node => {
          this.node = node
        }}
        {...rest}
      >
        <div
          ref={node => {
            this.heightNode = node
          }}
        >
          {content}
        </div>
      </div>
    )
  }
}

export default Collapsible
