import React, {PureComponent as Component} from 'react'
import PropTypes from 'prop-types'
import classNames from '../../utilities/classNames'
import { requestAnimationFrame, noop } from '../../utilities/other'

const propTypes = {
  duration: PropTypes.number,
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
    this.node = null
    this.heightNode = null
  }

  componentWillReceiveProps ({isOpen: willOpen}) {
    const {isOpen} = this.props

    /* istanbul ignore next */
    if (isOpen !== willOpen) {
      this.setState({animationState: 'measuring'})
    }
  }

  componentDidUpdate ({isOpen: wasOpen}) {
    this.handleAnimation(wasOpen)
    this.handleAnimationStateCallback()
  }

  handleAnimation (wasOpen) {
    const {animationState} = this.state
    const {duration} = this.props

    requestAnimationFrame(() => {
      switch (animationState) {
        case 'measuring':
          this.setState({
            animationState: wasOpen ? 'closingStart' : 'openingStart',
            height: wasOpen && this.heightNode ? this.heightNode.scrollHeight : 0
          })
          break
        case 'closingStart':
          this.setState({
            animationState: 'closing',
            height: 0
          })
          break
        case 'closing':
          setTimeout(() => {
            this.setState({
              animationState: 'closed'
            })
          }, duration)
          break
        case 'openingStart':
          this.setState({
            animationState: 'opening',
            height: this.heightNode ? this.heightNode.scrollHeight
            /* istanbul ignore next */
            : 0
          })
          break
        case 'opening':
          setTimeout(() => {
            this.setState({
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

  render () {
    const {
      className,
      children,
      duration,
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
      transitionDuration: `${duration}ms`
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
