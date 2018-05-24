import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { smoothScrollTo } from '../../utilities/smoothScroll'
import { last } from '../../utilities/arrays'
import { allDefined } from '../../utilities/check'
import { noop } from '../../utilities/other'

class ChatScroller extends Component {
  constructor() {
    super()
    this.childNodeRef = 'childNode'
    this.childNode = null
    this.scrollableNode = null
  }

  componentDidMount() {
    this.setNodes()
    this.forceScrollToBottom()
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.messages !== this.props.messages ||
      prevProps.lastMessageId !== this.props.lastMessageId ||
      prevProps.isTyping !== this.props.isTyping
    ) {
      this.autoScrollToLatestMessage()
    }
  }

  setNodes() {
    const childNode = this.refs[this.childNodeRef]
    if (!childNode) return

    // Guard/check to ensure that the childNode is a NodeElement.
    this.childNode = childNode['querySelector']
      ? childNode
      : ReactDOM.findDOMNode(childNode)

    this.scrollableNode = this.childNode.querySelector(
      this.props.scrollableSelector
    )
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

    /* istanbul ignore next */
    if (!this.scrollableNode) return

    const messageNode = this.getLatestMessageNode()
    /* istanbul ignore next */
    if (!messageNode) return

    /**
     * Ignoring the following things as enzyme/JSDOM does not provide a
     * (sane) way to test out scrolling calculation/behaviour.
     */
    /* istanbul ignore next */
    const scrollProps = getScrollProps({
      distanceForAutoScroll,
      messageNode,
      offsetThreshold,
      scrollableNode: this.scrollableNode,
    })

    /* istanbul ignore next */
    if (shouldAutoScroll(scrollProps)) {
      /* istanbul ignore next */
      this.handleScroll({
        duration: smoothScrollDuration,
        node: this.scrollableNode,
        position: scrollProps.position,
      })
    }
  }

  forceScrollToBottom() {
    const { smoothScrollDuration } = this.props
    if (!this.scrollableNode) return

    this.handleScroll({
      duration: smoothScrollDuration,
      node: this.scrollableNode,
      position: this.scrollableNode.scrollHeight,
    })
  }

  handleScroll(scrollProps) {
    if (!this.scrollableNode) return

    smoothScrollTo(scrollProps)
    this.props.onScroll()
  }

  render() {
    const { children } = this.props
    if (!children) return null

    const child = React.Children.only(children)

    return React.cloneElement(child, {
      ref: this.childNodeRef,
    })
  }
}

/**
 * Transforms, calculates, and defines props for scrolling.
 *
 * @param   {object} props
 * @returns {objects}
 */
export const getScrollProps = props => {
  if (!allDefined(props)) return {}

  const {
    distanceForAutoScroll,
    messageNode,
    offsetThreshold,
    scrollableNode,
  } = props

  const scrollableHeight = scrollableNode.clientHeight
  const scrollHeight = scrollableNode.scrollHeight
  const scrollTop =
    scrollableNode.scrollTop + scrollableHeight + messageNode.clientHeight

  const topOffset = scrollableHeight * offsetThreshold * -1
  const position = messageNode.offsetTop + topOffset

  return {
    distanceForAutoScroll,
    position,
    scrollHeight,
    scrollTop,
  }
}

/**
 * Determines if the ChatScroller is within range of scrolling.
 *
 * @param   {object} props
 * @returns {boolean}
 */
export const shouldAutoScroll = props => {
  if (!allDefined(props)) return false

  const { distanceForAutoScroll, scrollHeight, scrollTop } = props

  return scrollTop + distanceForAutoScroll >= scrollHeight
}

ChatScroller.propTypes = {
  distanceForAutoScroll: PropTypes.number,
  isTyping: PropTypes.bool,
  lastMessageId: PropTypes.string,
  messageSelectors: PropTypes.string,
  offsetThreshold: PropTypes.number,
  onScroll: PropTypes.func,
  scrollCondition: PropTypes.func,
  smoothScrollDuration: PropTypes.number,
}

ChatScroller.defaultProps = {
  distanceForAutoScroll: 150,
  isTyping: false,
  messageSelectors: '.c-MessageChat, .c-MessageAction',
  offsetThreshold: 0.3,
  onScroll: noop,
  scrollableSelector: '.c-ScrollableNode',
  smoothScrollDuration: 100,
}

export default ChatScroller
