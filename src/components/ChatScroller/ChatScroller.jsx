import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import getDocumentFromComponent from '@helpscout/react-utils/dist/getDocumentFromComponent'
import getShallowDiffs from '@helpscout/react-utils/dist/getShallowDiffs'
import { smoothScrollTo } from '../../utilities/smoothScroll'
import { last, includes } from '../../utilities/arrays'
import { noop } from '../../utilities/other'
import { shouldAutoScroll, getScrollProps } from './ChatScroller.utils'

export class ChatScroller extends React.PureComponent {
  childRef
  document = null
  node
  scrollableNode

  componentDidMount() {
    this.setNodes()
    this.forceScrollToBottom()
  }

  componentDidUpdate(prevProps) {
    this.resetNodes(prevProps)

    if (this.shouldScrollOnUpdate(prevProps)) {
      this.autoScrollToLatestMessage()
    }
    if (
      prevProps.forceScrollToBottomProp !== this.props.forceScrollToBottomProp
    ) {
      this.forceScrollToBottom()
    }
  }

  resetNodes(nextProps) {
    const { diffs } = getShallowDiffs(nextProps, this.props)

    if (!diffs.length) return

    const matches = ['scrollableSelector', 'scrollableNode']

    if (diffs.some(item => includes(matches, item))) {
      this.setNodes()
    }
  }

  shouldScrollOnUpdate(prevProps) {
    const hasChanged = this.props.propsToCheck.reduce((result, prop) => {
      if (result) return result
      return prevProps[prop] !== this.props[prop]
    }, false)

    return hasChanged
  }

  getLatestMessageNode() {
    if (!this.scrollableNode) return

    const messageChatNodes = this.scrollableNode.querySelectorAll(
      this.props.messageSelectors
    )

    return last(messageChatNodes)
  }

  autoScrollToLatestMessage() {
    const {
      distanceForAutoScroll,
      offsetThreshold,
      smoothScrollDuration,
    } = this.props

    if (!this.scrollableNode) return

    const messageNode = this.getLatestMessageNode()
    if (!messageNode) return

    /**
     * Ignoring the following things as enzyme/JSDOM does not provide a
     * (sane) way to test out scrolling calculation/behaviour.
     */
    const scrollProps = getScrollProps({
      distanceForAutoScroll,
      messageNode,
      offsetThreshold,
      scrollableNode: this.scrollableNode,
    })

    if (shouldAutoScroll(scrollProps)) {
      this.handleScroll({
        duration: smoothScrollDuration,
        node: this.scrollableNode,
        position: scrollProps.position,
      })
    }
  }

  forceScrollToBottom() {
    if (!this.scrollableNode) return

    this.handleScroll({
      duration: this.props.smoothScrollDuration,
      node: this.scrollableNode,
      position: this.scrollableNode.scrollHeight,
    })
  }

  handleScroll(scrollProps) {
    if (!this.scrollableNode) return

    smoothScrollTo(scrollProps)
    this.props.onScroll({ target: this.scrollableNode })
  }

  setNodes() {
    this.node = ReactDOM.findDOMNode(this.childRef)

    this.document = getDocumentFromComponent(this.childRef) || document
    const innerNode =
      this.node && this.node.querySelector(this.props.scrollableSelector)
    const outerNode = this.document.querySelector(this.props.scrollableSelector)

    this.scrollableNode = this.props.scrollableNode || innerNode || outerNode
  }

  setChildNodeRef = ref => (this.childRef = ref)

  render() {
    const { children, ...rest } = this.props
    if (!children) return null

    const child = React.Children.only(children)

    return React.cloneElement(child, {
      ref: this.setChildNodeRef,
      ...{ ...getValidProps(rest) },
    })
  }
}

ChatScroller.defaultProps = {
  'data-cy': 'ChatScroller',
  distanceForAutoScroll: 150,
  isTyping: false,
  messageSelectors: '.c-MessageChat, .c-MessageAction',
  offsetThreshold: 0.3,
  onScroll: noop,
  propsToCheck: ['messages', 'lastMessageId', 'isTyping'],
  scrollableSelector: '.c-ScrollableNode',
  smoothScrollDuration: 100,
}

ChatScroller.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** A range to enable auto-scrolling. */
  distanceForAutoScroll: PropTypes.number,
  /** Update this prop to force scroll to bottom. */
  forceScrollToBottomProp: PropTypes.any,
  /** A chat-based event used to trigger auto-scrolling. */
  isTyping: PropTypes.bool,
  /** Chat data used to trigger auto-scrolling. */
  lastMessageId: PropTypes.string,
  /** Chat data used to trigger auto-scrolling. */
  messages: PropTypes.arrayOf(PropTypes.any),
  /** DOM selector(s) for chat message elements. */
  messageSelectors: PropTypes.string,
  offsetThreshold: PropTypes.number,
  /** Callback function when component is scrolled. */
  onScroll: PropTypes.func,
  /** A collection of props to check to initiate the scroll. */
  propsToCheck: PropTypes.arrayOf(PropTypes.string),
  /** Duration (ms) for smooth scrolling. */
  smoothScrollDuration: PropTypes.number,
  /** DOM Element to check for scrolling. */
  scrollableNode: PropTypes.any,
  /** DOM selector for the scrollable message container. */
  scrollableSelector: PropTypes.string,
  scrollCondition: PropTypes.func,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default ChatScroller
