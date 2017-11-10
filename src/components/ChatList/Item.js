import React from 'react'
import PropTypes from 'prop-types'
import Badge from '../Badge'
import Card from '../Card'
import Flexy from '../Flexy'
import Heading from '../Heading'
import Hr from '../Hr'
import LoadingDots from '../LoadingDots'
import List from '../List'
import Link from '../Link'
import Tag from '../Tag'
import Text from '../Text'
import Timestamp from '../Timestamp'
import Truncate from '../Truncate'
import classNames from '../../utilities/classNames'
import { tagTypes } from './propTypes'

export const propTypes = {
  href: PropTypes.string,
  isAssigned: PropTypes.bool,
  isFocused: PropTypes.bool,
  isTyping: PropTypes.bool,
  isViewing: PropTypes.bool,
  isWaiting: PropTypes.bool,
  message: PropTypes.string,
  messageLimit: PropTypes.number,
  name: PropTypes.string,
  newMessageCount: PropTypes.number,
  tags: tagTypes,
  to: PropTypes.string,
  timestamp: PropTypes.string
}

const defaultProps = {
  isAssigned: false,
  isFocused: false,
  isViewing: false,
  isWaiting: false,
  isTyping: false,
  messageLimit: 80,
  newMessageCount: 0,
  tags: []
}

const Item = props => {
  const {
    className,
    children,
    isAssigned,
    isFocused,
    isTyping,
    isViewing,
    isWaiting,
    message,
    messageLimit,
    name,
    newMessageCount,
    tags,
    timestamp,
    ...rest
  } = props

  const componentClassName = classNames(
    'c-ChatListItem',
    isAssigned && 'is-assigned',
    isFocused && 'is-focused',
    className
  )

  const viewingMarkup = isViewing ? (
    <div className='c-ChatListItem__viewing' title='Is being viewed' />
  ) : null

  const newMessageCountMarkup = newMessageCount ? (
    <Flexy.Item>
      <Badge status='success' count>{newMessageCount}</Badge>
    </Flexy.Item>
  ) : null

  const waitingMarkup = isWaiting ? (
    <Flexy.Item>
      <Tag color='red' pulsing allCaps>Waiting</Tag>
    </Flexy.Item>
  ) : null

  const messageMarkup = isTyping ? (
    <div className='c-ChatListItem__typing'>
      <LoadingDots />
    </div>
  ) : (
    <Text faint size='13'>
      <Truncate type='end' limit={messageLimit} ellipsis=''>
        {message}
      </Truncate>
    </Text>
  )

  const tagListMarkup = tags.map(tag => {
    const {
      children,
      ...tagProps
    } = tag

    return (
      <List.Item key={children}>
        <Tag {...tagProps}>
          {children}
        </Tag>
      </List.Item>
    )
  })

  const tagsMarkup = tags.length ? (
    <Flexy.Item>
      <div className='c-ChatListItem__tags'>
        <List type='inline' size='xs'>
          {tagListMarkup}
        </List>
      </div>
    </Flexy.Item>
  ) : null

  return (
    <Link className={componentClassName} {...rest} block noUnderline>
      {viewingMarkup}
      <Card.Block className='c-ChatListItem__block'>
        <div className='c-ChatListItem__heading'>
          <Flexy gap='md'>
            <Flexy.Block>
              <Heading size='h5' className='c-ChatListItem__title'>
                <Truncate>
                  {name}
                </Truncate>
              </Heading>
            </Flexy.Block>
            {waitingMarkup}
            {newMessageCountMarkup}
          </Flexy>
        </div>
        <div className='c-ChatListItem__message'>
          {messageMarkup}
        </div>
        <Flexy gap='md'>
          <Flexy.Item>
            <div className='c-ChatListItem__timestamp'>
              <Timestamp timestamp={timestamp} muted />
            </div>
          </Flexy.Item>
          {tagsMarkup}
        </Flexy>
      </Card.Block>
      <Hr className='c-ChatListItem__divider' size='none' />
    </Link>
  )
}

Item.propTypes = propTypes
Item.defaultProps = defaultProps
Item.displayName = 'ChatListItem'

export default Item
