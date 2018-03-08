import React from 'react'
import {createSpec, faker} from '@helpscout/helix'
import { storiesOf } from '@storybook/react'
import {
  Notification
} from '../../src/index.js'

const NotificationSpec = createSpec({
  id: faker.random.uuid(),
  body: faker.lorem.sentence(),
  from: faker.name.firstName()
})

const stories = storiesOf('Notification', module)

stories.add('default', () => {
  const props = NotificationSpec.generate()
  const {
    body,
    from,
    name
  } = props
  return (
    <Notification
      body={body}
      from={from}
      name={name}
    />
  )
})

stories.add('types', () => {
  const props = NotificationSpec.generate()
  return (
    <div style={{maxWidth: 300}}>
      <div style={{textAlign: 'right'}}>Text (Default)</div>
      <Notification {...props} type='text' />

      <div style={{textAlign: 'right'}}>Link</div>
      <Notification {...props} body='https://www.helpscout.net/blog/beacon-preview/' type='link' />

      <div style={{textAlign: 'right'}}>Image</div>
      <Notification {...props} body='https://www.helpscout.net/images/blog/2016/feb/release-notes-2016.png' type='image' />
    </div>
  )
})
