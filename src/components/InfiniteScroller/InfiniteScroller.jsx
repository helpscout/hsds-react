import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { getValidProps } from '@hsds/utils-react'
import EventListener from '../EventListener'
import classNames from 'classnames'
import LoadingDots from '../LoadingDots'
import { isNodeElement, getNodeScope } from '@hsds/utils-dom'
import { isNodeEnv } from '@hsds/utils-env'

function noop() {}

class InfiniteScroller extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: props.isLoading,
      nodeScope: window,
    }
    this._isMounted = null
    this.node = null
    this.handleOnScroll = this.handleOnScroll.bind(this)
  }

  _isMounted
  node

  componentDidMount() {
    this._isMounted = true
    this.setParentNode()
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.isLoading && !this.state.isLoading) {
      this.handleOnLoading()
    }

    if (!nextProps.isLoading && this.state.isLoading) {
      this.handleOnLoaded()
    }
  }

  getScrollNodeTop = () => {
    const { nodeScope } = this.state
    if (nodeScope === window) {
      return window.scrollY
    } else {
      return nodeScope.scrollTop
    }
  }

  // This method is tested, but tested in separate parts.
  // Unable to validate isNodeVisible in this method. The isNodeVisible
  // has been thoroughly tested elsewhere.
  // The handleOnLoading method has been abstracted to be tested in
  // isolation.
  handleOnScroll(event) {
    const { offset, onScroll } = this.props
    const { isLoading, nodeScope } = this.state
    const isVisible = isNodeVisible({
      node: this.node,
      scope: nodeScope,
      offset,
      complete: true,
    })

    onScroll(event, {
      node: this.node,
      offset,
      scrollNode: nodeScope,
      scrollTop: this.getScrollNodeTop(),
      isVisible,
      isLoading,
    })

    if (isLoading || !isVisible) return

    this.handleOnLoading()
  }

  handleOnLoading() {
    const { onLoading } = this.props
    if (this._isMounted) {
      this.setState({
        isLoading: true,
      })
    }
    onLoading(() => {
      this.handleOnLoaded()
    })
  }

  handleOnLoaded() {
    const { onLoaded } = this.props
    // Prevents scrollable area for unexpectedly scrolling after
    // new items are injected.
    this.normalizeNodeScrollScroll(this.getNodeScrollTop())
    // Once the scroll position as been re-adjusted, then load new items
    onLoaded()

    if (this._isMounted && this.state.isLoading) {
      this.setState({
        isLoading: false,
      })
    }
  }

  getNodeScrollTop() {
    const { nodeScope } = this.state

    if (nodeScope !== window && nodeScope.scrollTop !== undefined) {
      return nodeScope.scrollTop
    } else {
      return nodeScope.scrollY
    }
  }

  normalizeNodeScrollScroll(scrollTop) {
    const { nodeScope } = this.state

    if (typeof scrollTop !== 'number') return

    if (nodeScope === window && nodeScope.scrollTo) {
      nodeScope.scrollTo(window.scrollX, scrollTop)
    } else if (nodeScope.scrollTop !== undefined) {
      nodeScope.scrollTop = scrollTop
    }
  }

  setParentNode() {
    const { getScrollParent, scrollParent } = this.props
    let nodeScope = getScrollParent({ node: this.node })
    nodeScope =
      isNodeElement(nodeScope) || nodeScope === window ? nodeScope : null

    if (!nodeScope && scrollParent) {
      nodeScope = isNodeElement(scrollParent) ? scrollParent : null
    }

    if (!nodeScope) {
      const node = ReactDOM.findDOMNode(this)

      // Tested for node.parentNode, but not for window.
      // This is a super fail-safe. This will always be parentNode, with the
      // exception of document or window. Cannot be tested in JSDOM/Enzyme,
      // since it prohibits mounting on document.body directly.
      nodeScope = node && node.parentNode ? node.parentNode : window
    }

    this.setState({ nodeScope })
  }

  setNodeRef = node => (this.node = node)

  render() {
    const {
      className,
      children,
      getScrollParent,
      loading,
      isLoading: propsIsLoading,
      onLoading,
      onLoaded,
      scrollParent,
      ...rest
    } = this.props
    const { isLoading, nodeScope } = this.state
    const handleOnScroll = this.handleOnScroll
    const componentClassName = classNames(
      'c-InfiniteScroller',
      isLoading && 'is-loading',
      className
    )
    const loadingMarkup = loading || <LoadingDots align="center" />
    const contentMarkup = isLoading ? loadingMarkup : children

    return (
      <div
        {...getValidProps(rest)}
        className={componentClassName}
        ref={this.setNodeRef}
      >
        <EventListener
          event="scroll"
          handler={handleOnScroll}
          scope={nodeScope}
        />
        {contentMarkup}
      </div>
    )
  }
}

InfiniteScroller.defaultProps = {
  'data-cy': 'InfiniteScroller',
  getScrollParent: noop,
  offset: 0,
  isLoading: false,
  loading: false,
  onLoading: noop,
  onLoaded: noop,
  onScroll: noop,
}

InfiniteScroller.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Callback to retrieve the parentNode to listen for scroll events. */
  getScrollParent: PropTypes.func,
  /** Sets the component into an `isLoading` state. */
  isLoading: PropTypes.bool,
  /** Top buffer (`px`) before infinite scroll is triggered. */
  offset: PropTypes.number,
  /** Callback when component completes `onLoading`. */
  onLoaded: PropTypes.func,
  /** Callback when component becomes visible in the DOM, after scrolling. */
  onLoading: PropTypes.func,
  /** DOM node to listen to scroll events on, instead of closest parentNode (default). */
  scrollParent: PropTypes.any,
  onScroll: PropTypes.func,
  /** What to render while loading */
  loading: PropTypes.any,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

/**
 * Checks if node is visible with the view (a node Element or window). This is typically used for scroll interactions.
 * Note: This function currently only measures vertical scroll-based
 * calculations.
 *
 * @param     options   object    Config object
 * @option    node      Element   DOM node to check visibility for
 * @option    scope     Element   DOM node to check visibility within
 * @option    offset    number    Top buffer amount for visiblity check
 * @option    complete  bool      node must be in complete view, if true
 * @return    bool                True/False if node is in view
 */
export function isNodeVisible(options) {
  if (!options || typeof options !== 'object') return false
  const { node, scope, offset, complete } = options

  if (!isNodeElement(node)) return false

  let nodeOffset = offset !== undefined ? offset : 0
  nodeOffset =
    typeof nodeOffset !== 'number' ? 0 : nodeOffset < 0 ? 0 : nodeOffset

  const nodeScope = getNodeScope(scope || window)
  const isWindow = nodeScope === window
  const bufferOffset = 4 // To account for potential borders on the nodeScope

  const rect = node.getBoundingClientRect()
  const offsetTop = isNodeEnv() ? rect.top : node.offsetTop

  const viewportHeight = isWindow
    ? window.innerHeight
    : nodeScope.getBoundingClientRect().height
  const viewportTop = isWindow ? window.scrollY : nodeScope.scrollTop
  const viewportBottom = isWindow
    ? window.innerHeight
    : viewportTop + viewportHeight + bufferOffset

  const bottom = offsetTop + rect.height
  const top = complete && nodeOffset === 0 ? bottom : bottom - nodeOffset

  return (
    parseInt(top, 10) <= parseInt(viewportBottom, 10) &&
    parseInt(bottom, 10) >= parseInt(viewportTop, 10)
  )
}

export default InfiniteScroller
