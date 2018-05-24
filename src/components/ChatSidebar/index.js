import React, { PureComponent as Component } from 'react'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import Scrollable from '../Scrollable'
import StatusBar from '../StatusBar'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { smoothScrollTo } from '../../utilities/smoothScroll'

export const propTypes = {
  isShowStatusBar: PropTypes.bool,
  newMessageCount: PropTypes.number,
  onHideStatusBar: PropTypes.func,
  onShowStatusBar: PropTypes.func,
  onScroll: PropTypes.func,
  statusBarScrollTopOffset: PropTypes.number,
}

const defaultProps = {
  isShowStatusBar: false,
  newMessageCount: 0,
  onHideStatusBar: noop,
  onShowStatusBar: noop,
  onScroll: noop,
  statusBarScrollTopOffset: 100,
}

class ChatSidebar extends Component {
  constructor(props) {
    super()
    this.handleOnStatusBarClick = this.handleOnStatusBarClick.bind(this)
    this.handleOnStatusBarClose = this.handleOnStatusBarClose.bind(this)
    this.handleOnScroll = this.handleOnScroll.bind(this)
    this.renderStatusBar = this.renderStatusBar.bind(this)
  }

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
      <div className="c-ChatSidebar__status-bar">
        <StatusBar
          isOpen={shouldShowStatusBar}
          onClick={handleOnStatusBarClick}
        >
          {newMessageCount} new {pluralize('message', newMessageCount)}
        </StatusBar>
      </div>
    )

    return (
      <div className={componentClassName} {...rest}>
        {statusBarMarkup}
        <Scrollable
          className="c-ChatSidebar__content"
          fade
          onScroll={handleOnScroll}
          scrollableRef={ref => (this.contentNode = ref)}
        >
          {children}
        </Scrollable>
      </div>
    )
  }
}

ChatSidebar.propTypes = propTypes
ChatSidebar.defaultProps = defaultProps
ChatSidebar.displayName = 'ChatSidebar'

export default ChatSidebar
