import React from 'react'
import { storiesOf } from '@storybook/react'
import AvatarSpec from '../../utilities/specs/avatar.specs'
import ChatSpec from '../../utilities/specs/chat.specs'
import { Avatar, ChatList } from '../index'

const avatars = AvatarSpec.generate(8)

const getItemMarkup = () => {
  const fixtures = ChatSpec.generate(8)
  const values = Object.values(fixtures).filter(i => !!i)
  return values.map((item, index) => {
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
}

const stories = storiesOf('Components/ChatList', module)

stories.add('item', () => {
  const itemMarkup = getItemMarkup()
  return <div style={{ width: 300 }}>{itemMarkup[0]}</div>
})

stories.add('list', () => {
  const itemMarkup = getItemMarkup()
  return (
    <div style={{ width: 300 }}>
      <ChatList>
        {itemMarkup[0]}
        {itemMarkup[1]}
      </ChatList>
    </div>
  )
})

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
