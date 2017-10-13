import React, {PureComponent as Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { componentOrElement } from 'prop-types-extra'
import EventListener from '../EventListener'
import classNames from '../../utilities/classNames'
import LoadingDots from '../LoadingDots'
import { isNodeElement, isNodeVisible } from '../../utilities/node'
import { noop } from '../../utilities/other'

export const propTypes = {
  className: PropTypes.string,
  offset: PropTypes.number,
  getScrollParent: PropTypes.func,
  isLoading: PropTypes.bool,
  onLoading: PropTypes.func,
  onLoaded: PropTypes.func,
  scrollParent: componentOrElement
}
const defaultProps = {
  getScrollParent: noop,
  offset: 0,
  isLoading: false,
  onLoading: noop,
  onLoaded: noop
}

class InfiniteScroller extends Component {
  constructor (props) {
    super()
    this.state = {
      isLoading: props.isLoading,
      nodeScope: window
    }
    this.node = null
    this.handleOnScroll = this.handleOnScroll.bind(this)
  }

  componentDidMount () {
    this.setParentNode()
  }

  componentWillReceiveProps (nextProps) {
    /* istanbul ignore else */
    if (nextProps.isLoading !== this.state.isLoading) {
      this.setState({
        isLoading: nextProps.isLoading
      })
    }
    /* istanbul ignore else */
    if (nextProps.isLoading && !this.state.isLoading) {
      this.handleOnLoaded()
    }
  }

  /* istanbul ignore next */
  // This method is tested, but tested in separate parts.
  // Unable to validate isNodeVisible in this method. The isNodeVisible
  // has been thoroughly tested elsewhere.
  // The handleOnLoading method has been abstracted to be tested in
  // isolation.
  handleOnScroll (event) {
    const { offset } = this.props
    const { isLoading, nodeScope } = this.state
    const isVisible = isNodeVisible({
      node: this.node,
      scope: nodeScope,
      offset,
      complete: true
    })

    if (isLoading || !isVisible) return

    this.handleOnLoading()
  }

  handleOnLoading () {
    const { onLoading } = this.props
    this.setState({
      isLoading: true
    })
    onLoading(() => { this.handleOnLoaded() })
  }

  handleOnLoaded () {
    const { onLoaded } = this.props
    // Prevents scrollable area for unexpectedly scrolling after
    // new items are injected.
    this.normalizeNodeScrollScroll(this.getNodeScrollTop())
    // Once the scroll position as been re-adjusted, then load new items
    onLoaded()

    if (this.state.isLoading) {
      this.setState({
        isLoading: false
      })
    }
  }

  getNodeScrollTop() {
    const { nodeScope } = this.state
    /* istanbul ignore next */
    if (nodeScope !== window && nodeScope.scrollTop !== undefined) {
      return nodeScope.scrollTop
    } else {
      return nodeScope.scrollY
    }
  }

  normalizeNodeScrollScroll(scrollTop) {
    const { nodeScope } = this.state
    /* istanbul ignore if */
    if (typeof scrollTop !== 'number') return

    /* istanbul ignore else */
    if (nodeScope === window) {
      nodeScope.scrollTo(window.scrollX, scrollTop)
    } else if (nodeScope.scrollTop !== undefined) {
      nodeScope.scrollTop = scrollTop
    }
  }

  setParentNode () {
    const { getScrollParent, scrollParent } = this.props
    let nodeScope = getScrollParent()
    nodeScope = isNodeElement(nodeScope) ? nodeScope : null

    if (!nodeScope && scrollParent) {
      /* istanbul ignore next */
      // Tested, but Instabul isn't picking up the ternary null
      nodeScope = isNodeElement(scrollParent) ? scrollParent : null
    }

    if (!nodeScope) {
      const node = ReactDOM.findDOMNode(this)
      /* istanbul ignore next */
      // Tested for node.parentNode, but not for window.
      // This is a super fail-safe. This will always be parentNode, with the
      // exception of document or window. Cannot be tested in JSDOM/Enzyme,
      // since it prohibits mounting on document.body directly.
      nodeScope = node && node.parentNode ? node.parentNode : window
    }

    this.setState({ nodeScope })
  }

  render () {
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

    const loadingMarkup = loading || (
      <LoadingDots align='center' />
    )
    const contentMarkup = isLoading ? loadingMarkup : children

    return (
      <div
        className={componentClassName}
        ref={node => { this.node = node }}
        {...rest}
      >
        <EventListener
          event='scroll'
          handler={handleOnScroll}
          scope={nodeScope}
        />
        {contentMarkup}
      </div>
    )
  }
}

InfiniteScroller.propTypes = propTypes
InfiniteScroller.defaultProps = defaultProps

export default InfiniteScroller
