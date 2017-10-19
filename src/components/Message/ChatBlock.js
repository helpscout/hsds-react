import React, {PureComponent as Component} from 'react'
import Animate from '../Animate'
import Flexy from '../Flexy'
import Action from './Action'
import Bubble from './Bubble'
import Timestamp from './Timestamp'
import classNames from '../../utilities/classNames'
import { chatTypes } from './propTypes'

export const propTypes = chatTypes

class ChatBlock extends Component {
  constructor () {
    super()
    this.state = {
      showTimestamp: false
    }
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
  }

  handleMouseEnter () {
    this.setState({
      showTimestamp: true
    })
  }

  handleMouseLeave () {
    this.setState({
      showTimestamp: false
    })
  }

  render () {
    const {
      children,
      className,
      ltr,
      rtl,
      read,
      from,
      timestamp,
      to,
      ...rest
    } = this.props

    const {
      showTimestamp
    } = this.state

    const componentClassName = classNames(
      'c-MessageChatBlock',
      from && 'is-from',
      to && 'is-to',
      className
    )

    const handleMouseEnter = this.handleMouseEnter
    const handleMouseLeave = this.handleMouseLeave
    const itemAlign = from ? 'left' : 'right'

    const timestampMarkup = timestamp ? (
      <Flexy.Item className='c-MessageChatBlock__timestamp'>
        <Animate in={showTimestamp} sequence='fadeIn' animateOnMount={false}>
          <Timestamp timestamp={timestamp} read={read} />
        </Animate>
      </Flexy.Item>
    ) : null

    const childrenMarkup = React.Children.map(children, child => {
      return (child.type === Action || child.type === Bubble)
        ? React.cloneElement(child, {
          from,
          ltr,
          rtl,
          timestamp,
          to
        })
        : child
    })

    return (
      <div className={componentClassName}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...rest}
      >
        <Flexy just={itemAlign} gap='sm'>
          {to && timestampMarkup}
          <Flexy.Item className='c-MessageChatBlock__block'>
            {childrenMarkup}
          </Flexy.Item>
          {from && timestampMarkup}
        </Flexy>
      </div>
    )
  }
}

ChatBlock.propTypes = propTypes

export default ChatBlock
