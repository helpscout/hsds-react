import React, {PureComponent as Component} from 'react'
import PropTypes from 'prop-types'
import Scrollable from '../Scrollable'
import Bloop from '../Bloop'
import { smoothScrollTo } from '../../utilities/smoothScroll'
import classNames from '../../utilities/classNames'

export const propTypes = {
  hasNewMessage: PropTypes.bool
}

const defaultProps = {
  hasNewMessage: false
}

class ChatSidebar extends Component {
  constructor () {
    super()
    this.handleOnBloopClick = this.handleOnBloopClick.bind(this)
  }

  handleOnBloopClick () {
    const { onBloopClose } = this.props
    smoothScrollTo({
      node: this.contentNode,
      position: 0
    })
    onBloopClose()
  }

  render () {
    const {
      className,
      children,
      hasNewMessage,
      onBloopClose,
      ...rest
    } = this.props

    const handleOnBloopClick = this.handleOnBloopClick

    const componentClassName = classNames(
      'c-ChatSidebar',
      className
    )

    return (
      <div className={componentClassName} {...rest}>
        <div className='c-ChatSidebar__bloop'>
          <Bloop isOpen={hasNewMessage} onClick={handleOnBloopClick}>1 new message</Bloop>
        </div>
        <Scrollable
          className='c-ChatSidebar__content'
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
