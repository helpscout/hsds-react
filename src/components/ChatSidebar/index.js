import React, {PureComponent as Component} from 'react'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import Scrollable from '../Scrollable'
import Bloop from '../Bloop'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { smoothScrollTo } from '../../utilities/smoothScroll'

export const propTypes = {
  newMessageCount: PropTypes.number,
  onShowBloop: PropTypes.func,
  onHideBloop: PropTypes.func
}

const defaultProps = {
  newMessageCount: 0,
  onHideBloop: noop,
  onShowBloop: noop
}

class ChatSidebar extends Component {
  constructor () {
    super()
    this.state = {
      showNewMessageNotification: false
    }
    this.handleOnBloopClick = this.handleOnBloopClick.bind(this)
    this.handleOnScroll = this.handleOnScroll.bind(this)
  }

  handleOnBloopClick () {
    const { onBloopClose } = this.props
    smoothScrollTo({
      node: this.contentNode,
      position: 0
    })
    onBloopClose()
  }

  handleOnScroll () {
    const { onShowBloop, onHideBloop } = this.props
    const scrollTopThreshold = 100
    const showNewMessageNotification = (this.contentNode.scrollTop > scrollTopThreshold)

    this.setState({
      showNewMessageNotification
    })

    showNewMessageNotification ? onShowBloop() : onHideBloop()
  }

  render () {
    const {
      className,
      children,
      onBloopClose,
      onHideBloop,
      onShowBloop,
      newMessageCount,
      ...rest
    } = this.props
    const { showNewMessageNotification } = this.state

    const handleOnBloopClick = this.handleOnBloopClick
    const handleOnScroll = this.handleOnScroll

    const componentClassName = classNames(
      'c-ChatSidebar',
      className
    )

    const shouldShowBloop = (newMessageCount > 0 && showNewMessageNotification)

    return (
      <div className={componentClassName} {...rest}>
        <div className='c-ChatSidebar__bloop'>
          <Bloop
            isOpen={shouldShowBloop}
            onClick={handleOnBloopClick}>
            {newMessageCount} new {pluralize('message', newMessageCount)}
          </Bloop>
        </div>
        <Scrollable
          className='c-ChatSidebar__content'
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
