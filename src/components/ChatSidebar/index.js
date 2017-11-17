import React, {PureComponent as Component} from 'react'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import Scrollable from '../Scrollable'
import Bloop from '../Bloop'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { smoothScrollTo } from '../../utilities/smoothScroll'

export const propTypes = {
  bloopScrollTopOffset: PropTypes.number,
  isShowBloop: PropTypes.bool,
  newMessageCount: PropTypes.number,
  onHideBloop: PropTypes.func,
  onShowBloop: PropTypes.func
}

const defaultProps = {
  bloopScrollTopOffset: 100,
  isShowBloop: false,
  newMessageCount: 0,
  onHideBloop: noop,
  onShowBloop: noop
}

class ChatSidebar extends Component {
  constructor (props) {
    super()
    this.handleOnBloopClick = this.handleOnBloopClick.bind(this)
    this.handleOnBloopClose = this.handleOnBloopClose.bind(this)
    this.handleOnScroll = this.handleOnScroll.bind(this)
  }

  handleOnBloopClick () {
    this.handleOnBloopClose()
    smoothScrollTo({
      node: this.contentNode,
      position: 0
    })
  }

  handleOnBloopClose () {
    const { newMessageCount, onHideBloop } = this.props
    onHideBloop(newMessageCount)
  }

  hasScrolledEnoughForBloop () {
    const {
      bloopScrollTopOffset
    } = this.props

    return this.contentNode.scrollTop > bloopScrollTopOffset
  }

  canShowBloop () {
    const {
      newMessageCount,
      isShowBloop
    } = this.props

    return (
      newMessageCount > 0 &&
      isShowBloop &&
      this.hasScrolledEnoughForBloop()
    )
  }

  handleOnScroll () {
    const {
      isShowBloop,
      newMessageCount,
      onHideBloop,
      onShowBloop
    } = this.props

    if (!isShowBloop) return

    (this.canShowBloop())
      ? onShowBloop(newMessageCount)
      : onHideBloop(newMessageCount)
  }

  render () {
    const {
      bloopScrollTopOffset,
      className,
      children,
      onBloopClose,
      onHideBloop,
      onShowBloop,
      newMessageCount,
      isShowBloop,
      ...rest
    } = this.props

    const handleOnBloopClick = this.handleOnBloopClick
    const handleOnScroll = this.handleOnScroll
    const shouldShowBloop = this.canShowBloop()

    const componentClassName = classNames(
      'c-ChatSidebar',
      className
    )

    return (
      <div className={componentClassName} {...rest}>
        <div className='c-ChatSidebar__bloop'>
          <Bloop
            isOpen={shouldShowBloop}
            onClick={handleOnBloopClick}
          >
            {newMessageCount} new {pluralize('message', newMessageCount)}
          </Bloop>
        </div>
        <Scrollable
          className='c-ChatSidebar__content'
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
