import * as React from 'react'
import { ContentUI, ContentResizerUI } from './styles/ActionSelect.css'
import { getEasingTiming } from '../../utilities/easing'
import { noop } from '../../utilities/other'
import {
  ActionSelectContentResizerProps,
  ActionSelectContentResizerState,
} from './ActionSelect.types'

export class ContentResizer extends React.PureComponent<
  ActionSelectContentResizerProps,
  ActionSelectContentResizerState
> {
  static defaultProps = {
    animationEasing: 'ease',
    borderOffset: 1,
    innerRef: noop,
  }

  _isMounted: boolean = false
  node: HTMLDivElement

  state = {
    height: 'auto',
  }

  componentDidMount() {
    this._isMounted = true
    this.resize(this.props)
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.children !== this.props.children) {
      this.handleResize(nextProps)
    }
  }

  safeSetState = (nextState, callback?) => {
    if (this._isMounted) {
      this.setState(nextState, callback)
    }
  }

  handleResize(props) {
    // Sets the initial height (px)
    this.resize(props)
    requestAnimationFrame(() => {
      // Sets the next (animation) height (px)
      this.resize(props)
    })
  }

  resize(props) {
    if (!this.node) return

    const { children } = props
    const { clientHeight } = this.node

    const height = children ? clientHeight : 0

    this.safeSetState({
      height,
    })
  }

  resetHeight = () => {
    this.safeSetState({
      height: 'auto',
    })
  }

  getResizeStyles = () => {
    const { animationEasing, borderWidth } = this.props
    return {
      borderWidth: this.props.children ? borderWidth : 0,
      height: this.state.height,
      transitionTimingFunction: getEasingTiming(animationEasing),
    }
  }

  setNodeRef = node => {
    this.node = node
    this.props.innerRef(node)
  }

  render() {
    return (
      <ContentResizerUI
        style={this.getResizeStyles()}
        onTransitionEnd={this.resetHeight}
      >
        <ContentUI innerRef={this.setNodeRef}>{this.props.children}</ContentUI>
      </ContentResizerUI>
    )
  }
}

export default ContentResizer
