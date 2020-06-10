import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Animate from '../Animate'
import Badge from '../Badge'
import Flexy from '../Flexy'
import Heading from '../Heading'
import Hr from '../Hr'
import TypingDots from '../TypingDots'
import List from '../List'
import Overflow from '../Overflow'
import Skeleton from '../Skeleton'
import Tag from '../Tag'
import Text from '../Text'
import Timestamp from '../Timestamp'
import Truncate from '../Truncate'
import { classNames } from '../../utilities/classNames'
import {
  ItemUI,
  BlockUI,
  TypingUI,
  ViewingFlagUI,
  HeadingUI,
  MessageCountUI,
  MessageUI,
  MetaUI,
  TimestampUI,
  TagListWrapperUI,
  AvatarListWrapperUI,
  DividerWrapperUI,
} from './ChatList.css'

class Item extends React.Component {
  render() {
    const {
      avatar,
      className,
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
      timestampFormatter,
      ...rest
    } = this.props

    const isLoading = (message === undefined || name === undefined) && !isTyping
    const componentClassName = classNames(
      'c-ChatListItem',
      isAssigned && 'is-assigned',
      isFocused && 'is-focused',
      isLoading && 'is-loading',
      isViewing && 'is-viewing',
      isWaiting && 'is-waiting',
      className
    )

    const canShowViewing = isViewing && !isFocused

    const headingMarkup = !isLoading ? (
      <Heading size="h5" className="c-ChatListItem__title">
        <Truncate>{name}</Truncate>
      </Heading>
    ) : (
      <Skeleton.Text width="95%" />
    )

    const viewingMarkup = canShowViewing ? (
      <div className="c-ChatListItem__viewing">
        <Animate sequence="fade" delay={100} duration={200}>
          <ViewingFlagUI
            className="c-ChatListItem__viewingFlag"
            title="Is being viewed"
          />
        </Animate>
      </div>
    ) : null

    const newMessageCountMarkup = newMessageCount ? (
      <MessageCountUI className="c-ChatListItem__messageCount">
        <Animate sequence="fade scale" delay={100} duration={200}>
          <Badge status="success" count display="block">
            {newMessageCount}
          </Badge>
        </Animate>
      </MessageCountUI>
    ) : null

    const waitingMarkup = isWaiting ? (
      <Flexy.Item className="c-ChatListItem__waiting">
        <Animate sequence="fade scale" delay={100} duration={200}>
          <Tag color="red" pulsing allCaps display="block">
            Waiting
          </Tag>
        </Animate>
      </Flexy.Item>
    ) : null

    const messageMarkup = !isLoading ? (
      isTyping ? (
        <TypingUI className="c-ChatListItem__typing">
          <TypingDots />
        </TypingUI>
      ) : (
        <Text faint size="13">
          <Truncate type="end" limit={messageLimit} ellipsis="…">
            {message}
          </Truncate>
        </Text>
      )
    ) : (
      <div>
        <Skeleton.Text width="70%" />
        <Skeleton.Text width="80%" />
        <Skeleton.Text width="10%" />
      </div>
    )

    const tagListMarkup = tags.map((tag, index) => {
      const { children, ...tagProps } = tag

      return (
        <List.Item key={index}>
          <Tag {...tagProps}>{children}</Tag>
        </List.Item>
      )
    })

    const tagsMarkup = tags.length ? (
      <Flexy.Item>
        <TagListWrapperUI className="c-ChatListItem__tags">
          <Overflow>
            <List type="inline" size="xs" inlineSize="xs">
              {tagListMarkup}
            </List>
          </Overflow>
        </TagListWrapperUI>
      </Flexy.Item>
    ) : null

    const timestampMarkup = !isLoading ? (
      <Timestamp
        formatter={timestampFormatter}
        timestamp={timestamp}
        live
        muted
      />
    ) : null

    const avatarMarkup = avatar ? (
      <Flexy.Item>
        <AvatarListWrapperUI className="c-ChatListItem__avatar">
          <Animate sequence="scale fade" delay={100}>
            {avatar}
          </Animate>
        </AvatarListWrapperUI>
      </Flexy.Item>
    ) : null

    const metaMarkup = !isLoading ? (
      <MetaUI className="c-ChatListItem__meta" gap="sm" align="bottom">
        <Flexy.Block>
          <TimestampUI className="c-ChatListItem__timestamp">
            <Truncate>{timestampMarkup}</Truncate>
          </TimestampUI>
        </Flexy.Block>
        {tagsMarkup}
        {avatarMarkup}
      </MetaUI>
    ) : null

    return (
      <Animate sequence="fade">
        <div className="c-ChatListItemWrapper">
          <ItemUI
            {...getValidProps(rest)}
            className={componentClassName}
            block
            noUnderline
          >
            {viewingMarkup}
            <BlockUI className="c-ChatListItem__block">
              <HeadingUI className="c-ChatListItem__heading" gap="md">
                <Flexy.Block>{headingMarkup}</Flexy.Block>
                {waitingMarkup}
                {newMessageCountMarkup}
              </HeadingUI>
              <MessageUI className="c-ChatListItem__message">
                {messageMarkup}
              </MessageUI>
              {metaMarkup}
            </BlockUI>
            <DividerWrapperUI>
              <Hr className="c-ChatListItem__divider" size="none" />
            </DividerWrapperUI>
          </ItemUI>
        </div>
      </Animate>
    )
  }
}

Item.propTypes = {
  avatar: PropTypes.any,
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  isAssigned: PropTypes.bool,
  isFocused: PropTypes.bool,
  isTyping: PropTypes.bool,
  isViewing: PropTypes.bool,
  isWaiting: PropTypes.bool,
  message: PropTypes.string,
  messageLimit: PropTypes.number,
  name: PropTypes.string,
  newMessageCount: PropTypes.number,
  tags: PropTypes.any,
  timestamp: PropTypes.string,
  timestampFormatter: PropTypes.func,
}

Item.defaultProps = {
  'data-cy': 'ChatListItem',
  isAssigned: false,
  isFocused: false,
  isViewing: false,
  isWaiting: false,
  isTyping: false,
  messageLimit: 65,
  newMessageCount: 0,
  tags: [],
  timestampFormatter: timestamp => timestamp,
}

export default Item
