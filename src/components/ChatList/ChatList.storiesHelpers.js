import React from 'react'
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

export const _Item = () => {
  const itemMarkup = getItemMarkup()
  return <div style={{ width: 300 }}>{itemMarkup[0]}</div>
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
