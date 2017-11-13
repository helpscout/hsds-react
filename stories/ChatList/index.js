import React from 'react'
import { storiesOf } from '@storybook/react'
import { AvatarList, Avatar, ChatList } from '../../src/index.js'
import AvatarSpec from '../Avatar/specs/Avatar'
import ChatSpec from './specs/Chat'

const avatars = AvatarSpec.generate(8)
const fixtures = ChatSpec.generate(8)

const itemMarkup = fixtures.map((item, index) => {
  const avatar = (
    <Avatar image={avatars[4].image} name={avatars[4].name} size='sm' shape='rounded' />
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

const stories = storiesOf('ChatList', module)

stories.add('default', () => (
  <div style={{width: 300}}>
    <ChatList>
      <ChatList.Header
        avatars={<AvatarList avatars={avatars} max={3} />}
        count={fixtures.length}
      >
        Chats
      </ChatList.Header>
      {itemMarkup}
    </ChatList>
  </div>
))
