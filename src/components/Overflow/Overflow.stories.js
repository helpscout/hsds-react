import React from 'react'
import { createSpec, faker } from '@helpscout/helix'
import { List, Overflow, Tag } from '../index'

export default {
  component: Overflow,
  title: 'Utilities/Overflow',
}

const ChatSpec = createSpec({
  id: faker.random.uuid(),
  message: faker.lorem.paragraph(),
})

const fixture = ChatSpec.generate()

export const Default = () => (
  <div style={{ width: '20%' }}>
    <Overflow>
      <div style={{ width: 500 }}>{fixture.message}</div>
    </Overflow>
  </div>
)

Default.story = {
  name: 'default',
}

export const Tags = () => (
  <div style={{ width: '20%' }}>
    <Overflow>
      <List type="inline">
        <List.Item>
          <Tag color="red">Ron Burgandy</Tag>
        </List.Item>
        <List.Item>
          <Tag color="orange">Champ Kind</Tag>
        </List.Item>
        <List.Item>
          <Tag color="blue">Brian Fantan</Tag>
        </List.Item>
        <List.Item>
          <Tag color="green">Brick Tamland</Tag>
        </List.Item>
      </List>
    </Overflow>
  </div>
)

Tags.story = {
  name: 'tags',
}
