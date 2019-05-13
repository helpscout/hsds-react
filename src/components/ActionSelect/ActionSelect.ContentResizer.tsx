import * as React from 'react'
import { ContentUI, ContentResizerUI } from './styles/ActionSelect.css'
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
    innerRef: noop,
    onResize: noop,
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
    if (nextProps.children !== this.props.children) {
      this.handleResize(nextProps)
    }
  }

  safeSetState = (nextState, callback?) => {
    if (this._isMounted) {
      this.setState(nextState, callback)
    }
  }

  handleResize = props => {
    // Sets the initial height (px)
    this.resize(props)
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
    } = this.props
    const { height } = this.state

    return {
      borderWidth: children ? borderWidth : 0,
      height,
      transitionDuration: `${animationDuration}ms`,
      transitionTimingFunction: getEasingTiming(animationEasing),
    }
  }

  setNodeRef = node => {
    this.node = node
    this.props.innerRef(node)
  }

  render() {
    const { children, onResize, ...rest } = this.props

    return (
      <ContentResizerUI
        {...rest}
        style={this.getResizeStyles()}
        onTransitionEnd={this.resetHeight}
      >
        <ContentUI data-cy="ActionSelectContent" innerRef={this.setNodeRef}>
          {children}
        </ContentUI>
      </ContentResizerUI>
    )
  }
}

export default ContentResizer
