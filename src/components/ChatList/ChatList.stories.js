import React from 'react'
import AvatarSpec from '../../utilities/specs/avatar.specs'
import ChatSpec from '../../utilities/specs/chat.specs'
import { Avatar, ChatList } from '../index'

export default {
  component: ChatList,
  title: 'Components/ChatList',
}

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

export const _Item = () => {
  const itemMarkup = getItemMarkup()
  return <div style={{ width: 300 }}>{itemMarkup[0]}</div>
}

_Item.story = {
  name: 'item',
}

export const List = () => {
  const itemMarkup = getItemMarkup()
  return (
    <div style={{ width: 300 }}>
      <ChatList>
        {itemMarkup[0]}
        {itemMarkup[1]}
      </ChatList>
    </div>
  )
}

List.story = {
  name: 'list',
}

export const ListEmpty = () => (
  <div style={{ width: 300 }}>
    <ChatList />
  </div>
)

ListEmpty.story = {
  name: 'list: empty',
}

export const ListLoading = () => (
  <div style={{ width: 300 }}>
    <ChatList>
      <ChatList.Item />
      <ChatList.Item />
    </ChatList>
  </div>
)

ListLoading.story = {
  name: 'list: loading',
}
