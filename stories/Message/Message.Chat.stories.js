import React from 'react'
import { storiesOf } from '@storybook/react'
import { Avatar, Message } from '../../src/index.js'

const stories = storiesOf('Message/Chat', module)

stories.add('default', () => {
  const htmlBody = `
    :sob:
    <br />
    <br />
    omgomgomg
    <br />
  `
  return (
    <Message to avatar={<Avatar name="Buddy" />}>
      <Message.Chat read timestamp="9:41am" body={htmlBody} />
      <Message.Chat read timestamp="9:41am">
        <strong>*Frantically running through North pole*</strong>
      </Message.Chat>
    </Message>
  )
})

stories.add('states', () => {
  return (
    <Message to avatar={<Avatar name="Buddy" />}>
      <Message.Chat read timestamp="9:41am" error>
        Error state, with default message.
      </Message.Chat>
      <Message.Chat read timestamp="9:41am" error="Something went wrong!">
        Error state, with custom message.
      </Message.Chat>
    </Message>
  )
})
