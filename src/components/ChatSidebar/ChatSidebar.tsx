import * as React from 'react'
import StatusBar from '../StatusBar'
import { classNames } from '../../utilities/classNames'
import { namespaceComponent } from '../../utilities/component'
import { noop } from '../../utilities/other'
import pluralize from '../../utilities/pluralize'
import { smoothScrollTo } from '../../utilities/smoothScroll'
import { COMPONENT_KEY } from './ChatSidebar.utils'
import {
  ChatSidebarUI,
  StatusBarWrapperUI,
  ContentUI,
} from './styles/ChatSidebar.css'

type Props = {
  className?: string
  isShowStatusBar: boolean
  newMessageCount: number
  onHideStatusBar: (...args: any[]) => void
  onStatusBarClose: () => void
  onShowStatusBar: (...args: any[]) => void
  onScroll: () => void
  statusBarScrollTopOffset: number
}

class ChatSidebar extends React.PureComponent<Props> {
  static defaultProps = {
    isShowStatusBar: false,
    newMessageCount: 0,
    onHideStatusBar: noop,
    onShowStatusBar: noop,
    onScroll: noop,
    statusBarScrollTopOffset: 100,
  }

  constructor(props) {
    super(props)

    this.handleOnStatusBarClick = this.handleOnStatusBarClick.bind(this)
    this.handleOnStatusBarClose = this.handleOnStatusBarClose.bind(this)
    this.handleOnScroll = this.handleOnScroll.bind(this)
    this.renderStatusBar = this.renderStatusBar.bind(this)
  }

  contentNode: any

  handleOnStatusBarClick() {
    this.handleOnStatusBarClose()
    /* istanbul ignore next */
    // Testing:
    // Note: This function cannot be tested in JSDOM. JSDOM lacks the
    // necessary DOM node numbers (like scrollY or scrollTop) to test
    // the calculations for this method. These numbers cannot be
    // mocked/faked :(.
    //
    // To properly test this method, we'll need to leverage ACTUAL
    // browser testing somehow (either in-browser or headless).
    //
    // For now, this method has been extensively tested manually
    // within Storybook.
    // TODO: fix typescript complains
    // @ts-ignore
    smoothScrollTo({
      node: this.contentNode,
      position: 0,
    })
  }

  handleOnStatusBarClose() {
    const { newMessageCount, onHideStatusBar } = this.props

    onHideStatusBar(newMessageCount)
  }

  hasScrolledEnoughForStatusBar() {
    const { statusBarScrollTopOffset } = this.props

    return this.contentNode
      ? this.contentNode.scrollTop > statusBarScrollTopOffset
      : false
  }

  canShowStatusBar() {
    const { newMessageCount, isShowStatusBar } = this.props

    return (
      newMessageCount > 0 &&
      isShowStatusBar &&
      this.hasScrolledEnoughForStatusBar()
    )
  }

  handleOnScroll() {
    const { onScroll } = this.props
    this.renderStatusBar()
    onScroll()
  }

  renderStatusBar() {
    const {
      isShowStatusBar,
      newMessageCount,
      onHideStatusBar,
      onShowStatusBar,
    } = this.props

    if (!isShowStatusBar) return

    this.canShowStatusBar()
      ? onShowStatusBar(newMessageCount)
      : onHideStatusBar(newMessageCount)
  }

  render() {
    const {
      statusBarScrollTopOffset,
      className,
      children,
      onStatusBarClose,
      onHideStatusBar,
      onShowStatusBar,
      newMessageCount,
      isShowStatusBar,
      ...rest
    } = this.props

    const handleOnStatusBarClick = this.handleOnStatusBarClick
    const handleOnScroll = this.handleOnScroll
    const shouldShowStatusBar = this.canShowStatusBar()

    const componentClassName = classNames('c-ChatSidebar', className)

    const statusBarMarkup = (
      <StatusBarWrapperUI className="c-ChatSidebar__status-bar">
        <StatusBar
          isOpen={shouldShowStatusBar}
          onClick={handleOnStatusBarClick}
        >
          {newMessageCount} new {pluralize('message', newMessageCount)}
        </StatusBar>
      </StatusBarWrapperUI>
    )

    return (
      <ChatSidebarUI className={componentClassName} {...rest}>
        {statusBarMarkup}
        <ContentUI
          className="c-ChatSidebar__content"
          fade
          onScroll={handleOnScroll}
          scrollableRef={(ref: any) => (this.contentNode = ref)}
        >
          {children}
        </ContentUI>
      </ChatSidebarUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY)(ChatSidebar)

export default ChatSidebar
