import React from 'react'
import { createSpec, faker } from '@helpscout/helix'
import { storiesOf } from '@storybook/react'
import { ChatList } from '../src/index.js'

const tags = [
  {
    color: 'grey',
    children: 'lead'
  },
  {
    color: 'purple',
    children: 'vip'
  }
]

const ChatSpec = createSpec({
  id: faker.random.uuid(),
  isAssigned: faker.random.boolean(),
  isTyping: faker.random.boolean(),
  isViewing: faker.random.boolean(),
  isWaiting: faker.random.boolean(),
  message: faker.lorem.paragraph(),
  name: () => `${faker.name.firstName()()} ${faker.name.lastName()()}`,
  newMessageCount: faker.random.number({min: 0, max: 2}),
  tags: () => tags,
  timestamp: '22 min'
})

const fixtures = ChatSpec.generate(8)
const itemMarkup = fixtures.map((item, index) => {
  return (
    <ChatList.Item
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
      {itemMarkup}
    </ChatList>
  </div>
))
