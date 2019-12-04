import React from 'react'
import { storiesOf } from '@storybook/react'
import { Avatar, ChatList } from '../../src/index'
import AvatarSpec from '../Avatar/specs/Avatar'
import ChatSpec from './specs/Chat'
import ChatListItemStateExample from './ChatListItemStateExample'

const avatars = AvatarSpec.generate(8)
const fixtures = ChatSpec.generate(8)

const itemMarkup = Array.isArray(fixtures)
  ? fixtures.map((item, index) => {
      const avatar = (
        <Avatar
          image={avatars[4].image}
          name={avatars[4].name}
          size="xs"
          shape="rounded"
        />
      )

      return (
        <ChatList.Item
          avatar={item.isAssigned ? avatar : null}
          key={item.id}
          isAssigned={item.isAssigned}
          isFocused={index === 2}
          isTyping={item.isTyping}
          isViewing={item.isViewing}
          isWaiting={item.isWaiting}
          message={item.message}
          name={item.name}
          newMessageCount={item.newMessageCount}
          tags={item.tags}
          timestamp={item.timestamp}
        />
      )
    })
  : []

const stories = storiesOf('ChatList', module)

stories.add('default', () => (
  <div style={{ width: 300 }}>
    <ChatList>{itemMarkup}</ChatList>
  </div>
))

stories.add('list', () => (
  <div style={{ width: 300 }}>
    <ChatList>
      {itemMarkup[0]}
      {itemMarkup[1]}
    </ChatList>
  </div>
))

stories.add('list: empty', () => (
  <div style={{ width: 300 }}>
    <ChatList />
  </div>
))

stories.add('list: loading', () => (
  <div style={{ width: 300 }}>
    <ChatList>
      <ChatList.Item />
      <ChatList.Item />
    </ChatList>
  </div>
))

stories.add('item', () => <div style={{ width: 300 }}>{itemMarkup[0]}</div>)

stories.add('item: loading', () => (
  <div style={{ width: 300 }}>
    <ChatList.Item />
  </div>
))

stories.add('item: states', () => (
  <div style={{ width: 300 }}>
    <ChatListItemStateExample />
  </div>
))
