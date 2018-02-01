import React from 'react'
import PropTypes from 'prop-types'
import Animate from '../Animate'
import Badge from '../Badge'
import Card from '../Card'
import Flexy from '../Flexy'
import Heading from '../Heading'
import Hr from '../Hr'
import LoadingDots from '../LoadingDots'
import List from '../List'
import { default as Link, propTypes as linkTypes } from '../Link'
import Overflow from '../Overflow'
import Skeleton from '../Skeleton'
import Tag from '../Tag'
import Text from '../Text'
import Timestamp from '../Timestamp'
import Truncate from '../Truncate'
import classNames from '../../utilities/classNames'
import { tagTypes } from './propTypes'

export const propTypes = Object.assign({}, linkTypes, {
  avatar: PropTypes.element,
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
  timestamp: PropTypes.string
})

const defaultProps = {
  isAssigned: false,
  isFocused: false,
  isViewing: false,
  isWaiting: false,
  isTyping: false,
  messageLimit: 70,
  newMessageCount: 0,
  tags: []
}

const Item = props => {
  const {
    avatar,
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

  const isLoading = (
    (message === undefined || name === undefined) &&
    !isTyping
  )

  const componentClassName = classNames(
    'c-ChatListItem',
    isAssigned && 'is-assigned',
    isFocused && 'is-focused',
    isLoading && 'is-loading',
    isViewing && 'is-viewing',
    isWaiting && 'is-waiting',
    className
  )

  const headingMarkup = !isLoading ? (
    <Heading size='h5' className='c-ChatListItem__title'>
      <Truncate>
        {name}
      </Truncate>
    </Heading>
  ) : (
    <Skeleton.Text width='95%' />
  )

  const viewingMarkup = isViewing ? (
    <div className='c-ChatListItem__viewing'>
      <Animate sequence='fade' delay={100} duration={200}>
        <div className='c-ChatListItem__viewingFlag' title='Is being viewed' />
      </Animate>
    </div>
  ) : null

  const newMessageCountMarkup = newMessageCount ? (
    <Flexy.Item className='c-ChatListItem__messageCount'>
      <Animate sequence='fade scale' delay={100} duration={200}>
        <Badge status='success' count display='block'>{newMessageCount}</Badge>
      </Animate>
    </Flexy.Item>
  ) : null

  const waitingMarkup = isWaiting ? (
    <Flexy.Item className='c-ChatListItem__waiting'>
      <Animate sequence='fade scale' delay={100} duration={200}>
        <Tag color='red' pulsing allCaps display='block'>Waiting</Tag>
      </Animate>
    </Flexy.Item>
  ) : null

  const messageMarkup = !isLoading
    ? isTyping ? (
      <div className='c-ChatListItem__typing'>
        <LoadingDots />
      </div>
    ) : (
      <Text faint size='13'>
        <Truncate type='end' limit={messageLimit} ellipsis=''>
          {message}
        </Truncate>
      </Text>
    ) : (
      <div>
        <Skeleton.Text width='70%' />
        <Skeleton.Text width='80%' />
        <Skeleton.Text width='10%' />
      </div>
    )

  const tagListMarkup = tags.map((tag, index) => {
    const {
      children,
      ...tagProps
    } = tag

    return (
      <List.Item key={index}>
        <Tag {...tagProps}>
          {children}
        </Tag>
      </List.Item>
    )
  })

  const tagsMarkup = tags.length ? (
    <Flexy.Item>
      <div className='c-ChatListItem__tags'>
        <Overflow>
          <List type='inline' size='xs'>
            {tagListMarkup}
          </List>
        </Overflow>
      </div>
    </Flexy.Item>
  ) : null

  const timestampMarkup = !isLoading ? (
    <Timestamp timestamp={timestamp} muted />
  ) : null

  const avatarMarkup = avatar ? (
    <Flexy.Item>
      <div className='c-ChatListItem__avatar'>
        <Animate
          sequence='scale fade'
          delay={100}
        >
          {avatar}
        </Animate>
      </div>
    </Flexy.Item>
  ) : null

  const metaMarkup = !isLoading ? (
    <Flexy
      className='c-ChatListItem__meta'
      gap='sm'
      align='bottom'
    >
      <Flexy.Block>
        <div className='c-ChatListItem__timestamp'>
          {timestampMarkup}
        </div>
      </Flexy.Block>
      {tagsMarkup}
      {avatarMarkup}
    </Flexy>
  ) : null

  return (
    <Animate sequence='fade'>
      <div className='c-ChatListItemWrapper'>
        <Link className={componentClassName} {...rest} block noUnderline>
          {viewingMarkup}
          <Card.Block className='c-ChatListItem__block'>
            <Flexy
              className='c-ChatListItem__heading'
              gap='md'
            >
              <Flexy.Block>
                {headingMarkup}
              </Flexy.Block>
              {waitingMarkup}
              {newMessageCountMarkup}
            </Flexy>
            <div className='c-ChatListItem__message'>
              {messageMarkup}
            </div>
            {metaMarkup}
          </Card.Block>
          <Hr className='c-ChatListItem__divider' size='none' />
        </Link>
      </div>
    </Animate>
  )
}

Item.propTypes = propTypes
Item.defaultProps = defaultProps
Item.displayName = 'ChatListItem'

export default Item
