import * as React from 'react'
import * as ReactDOM from 'react-dom'
import getDocumentFromComponent from '@helpscout/react-utils/dist/getDocumentFromComponent'
import getShallowDiffs from '@helpscout/react-utils/dist/getShallowDiffs'
import { smoothScrollTo } from '../../utilities/smoothScroll'
import { last, includes } from '../../utilities/arrays'
import { allDefined } from '../../utilities/check'
import { noop } from '../../utilities/other'

export interface Props {
  className?: string
  children?: any
  distanceForAutoScroll: number
  forceScrollToBottomProp: any
  isTyping: boolean
  lastMessageId: string
  messages?: Array<any>
  messageSelectors: string
  offsetThreshold: number
  propsToCheck: Array<string>
  onScroll: (...args: any) => void
  scrollCondition: (...args: any) => void
  scrollableSelector: string
  scrollableNode: null
  smoothScrollDuration: number
}

export class ChatScroller extends React.PureComponent<Props> {
  static defaultProps = {
    distanceForAutoScroll: 150,
    isTyping: false,
    messageSelectors: '.c-MessageChat, .c-MessageAction',
    offsetThreshold: 0.3,
    onScroll: noop,
    propsToCheck: ['messages', 'lastMessageId', 'isTyping'],
    scrollableSelector: '.c-ScrollableNode',
    smoothScrollDuration: 100,
  }

  childRef: any
  document: Document
  node: any
  scrollableNode: any

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

  /* istanbul ignore next */
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
    /* istanbul ignore next */
    this.document = getDocumentFromComponent(this.childRef) || document
    const innerNode =
      this.node && this.node.querySelector(this.props.scrollableSelector)
    const outerNode = this.document.querySelector(this.props.scrollableSelector)

    this.scrollableNode = this.props.scrollableNode || innerNode || outerNode
  }

  setChildNodeRef = ref => (this.childRef = ref)

  render() {
    const { children } = this.props
    if (!children) return null

    const child = React.Children.only(children)

    return React.cloneElement(child, {
      ref: this.setChildNodeRef,
    })
  }
}

/**
 * Transforms, calculates, and defines props for scrolling.
 *
 * @param   {Object} props
 * @returns {Object}
 */
export function getScrollProps(props) {
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
 * @param   {Object} props
 * @returns {boolean}
 */
export function shouldAutoScroll(props): boolean {
  if (!allDefined(props)) return false

  const { distanceForAutoScroll, scrollHeight, scrollTop } = props

  return scrollTop + distanceForAutoScroll >= scrollHeight
}

export default ChatScroller
