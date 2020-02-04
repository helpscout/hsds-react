import React from 'react'
import { createSpec, faker } from '@helpscout/helix'
import { storiesOf } from '@storybook/react'
import { List, Overflow, Tag } from '../index'

const ChatSpec = createSpec({
  id: faker.random.uuid(),
  message: faker.lorem.paragraph(),
})

const fixture = ChatSpec.generate()

const stories = storiesOf('Utilities/Overflow', module)

stories.add('default', () => (
  <div style={{ width: '20%' }}>
    <Overflow>
      <div style={{ width: 500 }}>{fixture.message}</div>
    </Overflow>
  </div>
))

stories.add('tags', () => (
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
))
