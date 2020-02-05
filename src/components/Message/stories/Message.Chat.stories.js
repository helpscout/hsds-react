import React from 'react'
import { faker } from '@helpscout/helix'
import { Avatar, Message } from '../../index'

export default {
  component: Message,
  title: 'Components/Message',
}

export const _Chat = () => {
  const htmlBody = `
    :sob:
    <br />
    <br />
    omgomgomg
    <br />
    www.helpscout.com
  `
  return (
    <Message to avatar={<Avatar name="Buddy" />}>
      <Message.Chat read timestamp="9:41am" body={htmlBody} />
      <Message.Chat read timestamp="9:41am">
        <strong>*Frantically running through North pole*</strong>
      </Message.Chat>
    </Message>
  )
}

export const ChatFromTo = () => {
  return (
    <div>
      <Message from avatar={<Avatar name="From" />}>
        <Message.Chat>{faker.lorem.sentence()()}</Message.Chat>
        <Message.Chat>{faker.lorem.sentence()()}</Message.Chat>
        <Message.Chat>{faker.lorem.sentence()()}</Message.Chat>
        <Message.Chat>{faker.lorem.sentence()()}</Message.Chat>
      </Message>
      <Message to avatar={<Avatar name="To" />}>
        <Message.Chat>{faker.lorem.sentence()()}</Message.Chat>
        <Message.Chat>{faker.lorem.sentence()()}</Message.Chat>
        <Message.Chat>{faker.lorem.sentence()()}</Message.Chat>
        <Message.Chat>{faker.lorem.sentence()()}</Message.Chat>
      </Message>
    </div>
  )
}

ChatFromTo.story = {
  name: 'Chat from/to',
}

export const ChatStates = () => {
  return (
    <Message to avatar={<Avatar name="Buddy" />}>
      <Message.Chat read timestamp="9:41am">
        Error state, with default message.
      </Message.Chat>
      <Message.Chat read timestamp="9:41am">
        Error state, with default message.
      </Message.Chat>
      <Message.Chat read timestamp="9:41am">
        Error state, with default message.
      </Message.Chat>
      <Message.Chat read timestamp="9:41am" error>
        Error state, with default message.
      </Message.Chat>
      <Message.Chat read timestamp="9:41am" error="Something went wrong!">
        Error state, with custom message.
      </Message.Chat>
      <Message.Chat
        read
        timestamp="9:41am"
        caption="Caption before the bubble"
        metaPosition="top"
      >
        With custom message & meta positioned before the bubble
      </Message.Chat>
      <Message.Chat
        read
        timestamp="9:41am"
        caption="Caption after the bubble"
        metaPosition="bottom"
      >
        With custom message & meta positioned AFTER the bubble
      </Message.Chat>
      <Message.Chat
        read
        timestamp="9:41am"
        caption="Caption before the bubble with jibberish metaPosition"
        metaPosition="qwerty"
      >
        With custom message & meta positioned before the bubble with jibberish
      </Message.Chat>
    </Message>
  )
}

ChatStates.story = {
  name: 'Chat states',
}
