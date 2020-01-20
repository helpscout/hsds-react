import * as React from 'react'
import Animate from '../Animate'
import { ContentUI, ContentResizerUI } from './ActionSelect.css'
import { getEasingTiming } from '../../utilities/easing'
import { noop } from '../../utilities/other'
import {
  ActionSelectContentResizerProps,
  ActionSelectContentResizerState,
} from './ActionSelect.types'

export const getInitialState = props => {
  const { children } = props

  return {
    height: children ? 'auto' : 0,
  }
}

export class ContentResizer extends React.PureComponent<
  ActionSelectContentResizerProps,
  ActionSelectContentResizerState
> {
  static defaultProps = {
    animationDuration: 160,
    animationEasing: 'ease',
    borderOffset: 1,
    'data-cy': 'ActionSelectContentResizer',
    mainRef: noop,
    isFadeContentOnOpen: true,
    onResize: noop,
    resizeCount: 0,
    selectedKey: null,
  }

  _isMounted: boolean = false
  node: HTMLDivElement

  state = getInitialState(this.props)

  componentDidMount() {
    this._isMounted = true
    this.resize(this.props)
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  componentWillReceiveProps(nextProps) {
    /* istanbul ignore else */
    if (nextProps.resizeCount !== this.props.resizeCount) {
      this.handleResize(nextProps)
    }
  }

  safeSetState = (nextState, callback?) => {
    /* istanbul ignore else */
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

  resize = props => {
    /* istanbul ignore next */
    if (!this.node) return

    const { children } = props
    const { clientHeight } = this.node

    const height = children ? clientHeight : 0

    this.safeSetState({
      height,
    })

    this.props.onResize()
  }

  /* istanbul ignore next */
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
    /* istanbul ignore next */
    if (this.props.mainRef) {
      this.props.mainRef(node)
    }
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
      // @ts-ignore
      <ContentResizerUI
        {...rest}
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
