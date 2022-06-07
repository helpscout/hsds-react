import React from 'react'
import PropTypes from 'prop-types'
import { getValidProps } from '@hsds/utils-react'
import Animate from '../Animate'
import { ContentUI, ContentResizerUI } from './ActionSelect.css'
import { getEasingTiming } from '@hsds/utils-animation'

function noop() {}

export const getInitialState = props => {
  const { children } = props

  return {
    height: children ? 'auto' : 0,
  }
}

export class ContentResizer extends React.PureComponent {
  static propTypes = {
    animationDuration: PropTypes.number,
    animationEasing: PropTypes.string,
    borderOffset: PropTypes.number,
    'data-cy': PropTypes.string,
    mainRef: PropTypes.func,
    isFadeContentOnOpen: PropTypes.bool,
    onAnimationEnd: PropTypes.func,
    onAnimationUpdate: PropTypes.func,
    onResize: PropTypes.func,
    resizeCount: PropTypes.number,
    selectedKey: PropTypes.string,
  }
  static defaultProps = {
    animationDuration: 160,
    animationEasing: 'ease',
    borderOffset: 1,
    'data-cy': 'ActionSelectContentResizer',
    mainRef: noop,
    isFadeContentOnOpen: true,
    onAnimationEnd: null,
    onAnimationUpdate: null,
    onResize: noop,
    resizeCount: 0,
    selectedKey: null,
  }

  animationUpdateInterval
  _isMounted = false
  node
  resizerNode

  state = getInitialState(this.props)

  componentDidMount() {
    this._isMounted = true
    this.resizerNode.addEventListener('transitionend', this.onAnimationEnd)
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.resizeCount !== this.props.resizeCount) {
      this.animationUpdateInterval &&
        clearInterval(this.animationUpdateInterval)
      this.handleResize(nextProps)
    }

    if (!nextProps.isOpen) {
      this.animationUpdateInterval &&
        clearInterval(this.animationUpdateInterval)
    }
  }

  safeSetState = (nextState, callback) => {
    if (this._isMounted) {
      this.setState(nextState, callback)
    }
  }

  handleResize = props => {
    // Sets the initial height (px)
    this.resize(this.props)
    requestAnimationFrame(() => {
      // Sets the next (animation) height (px)
      this.resize(props)
    })
  }

  onAnimationEnd = () => {
    this.props.onAnimationEnd && this.props.onAnimationEnd()
    this.animationUpdateInterval && clearInterval(this.animationUpdateInterval)
  }

  // calls the an update every 20 milleseconds when the animation is updating
  addOnAnimationUpdate() {
    const { onAnimationUpdate } = this.props

    if (!onAnimationUpdate) {
      return
    }

    if (this.animationUpdateInterval) {
      clearInterval(this.animationUpdateInterval)
    }

    this.animationUpdateInterval = setInterval(this.props.onAnimationUpdate, 20)
  }

  resize = props => {
    if (!this.node) return

    const { children } = props
    const { clientHeight } = this.node

    const height = children ? clientHeight : 0

    this.safeSetState(
      {
        height,
      },
      this.addOnAnimationUpdate
    )

    this.props.onResize()
  }

  resetHeight = () => {
    this.safeSetState(getInitialState(this.props))
  }

  getResizeStyles = () => {
    const {
      animationEasing,
      animationDuration,
      borderWidth,
      children,
      isFadeContentOnOpen,
      isOpen,
    } = this.props
    const { height } = this.state

    return {
      borderWidth: children ? borderWidth : 0,
      height,
      opacity: isFadeContentOnOpen && isOpen ? 0.5 : 1,
      transitionDuration: `${animationDuration}ms`,
      transitionTimingFunction: getEasingTiming(animationEasing),
    }
  }

  setNodeRef = node => {
    this.node = node

    if (this.props.mainRef) {
      this.props.mainRef(node)
    }
  }

  setResizerNodeRef = node => {
    this.resizerNode = node
  }

  renderContent() {
    const { animationDuration, children, selectedKey } = this.props
    if (!children) return null

    return (
      <Animate duration={animationDuration} key={selectedKey} sequence="fade">
        {children}
      </Animate>
    )
  }

  render() {
    const { children, onResize, ...rest } = this.props

    return (
      <ContentResizerUI
        {...getValidProps(rest)}
        ref={this.setResizerNodeRef}
        style={this.getResizeStyles()}
        onTransitionEnd={this.resetHeight}
      >
        <ContentUI data-cy="ActionSelectContent" ref={this.setNodeRef}>
          {this.renderContent()}
        </ContentUI>
      </ContentResizerUI>
    )
  }
}

export default ContentResizer
