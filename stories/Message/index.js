import React from 'react'
import { storiesOf } from '@storybook/react'
import { Avatar, Link, Message, PreviewCard } from '../../src/index.js'

export { default as defaultStories } from './default'
export { default as chatStories } from './chat'
export { default as attachmentStories } from './attachment'
export { default as embedStories } from './embed'
export { default as mediaStories } from './media'

const stories = storiesOf('Message', module)

stories.add('question', () => (
  <Message from avatar={<Avatar name="Arctic Puffin" />}>
    <Message.Question read timestamp="9:41am">
      How's it goin'?
    </Message.Question>
  </Message>
))

stories.add('action', () => (
  <Message to>
    <Message.Action read timestamp="9:41am">
      Buddy became upset.{' '}
      <a href="https://www.helpscout.net/">Find out what happened</a>
    </Message.Action>
  </Message>
))

stories.add('content', () => (
  <div>
    <Message to avatar={<Avatar name="Buddy" />}>
      <Message.Chat read timestamp="9:41am">
        <Link href="https://en.wikipedia.org/wiki/Elf_(film)">
          https://en.wikipedia.org/wiki/Elf_(film)
        </Link>
      </Message.Chat>
      <Message.Content>
        <PreviewCard
          href="https://en.wikipedia.org/wiki/Elf_(film)"
          title="Wikipedia: Elf (film)"
          target="_blank"
        >
          Elf is a 2003 American Christmas fantasy comedy film directed by Jon
          Favreau and written by David Berenbaum. It stars Will Ferrell, James
          Caan, Zooey Deschanel, Mary Steenburgen, Daniel Tay, Edward Asner, and
          Bob Newhart...
        </PreviewCard>
      </Message.Content>
    </Message>
    <Message to avatar={<Avatar name="Buddy" />}>
      <Message.Chat read timestamp="9:41am" isNote>
        <Link href="https://en.wikipedia.org/wiki/Elf_(film)">
          https://en.wikipedia.org/wiki/Elf_(film)
        </Link>
      </Message.Chat>
      <Message.Content isNote>
        <PreviewCard
          href="https://en.wikipedia.org/wiki/Elf_(film)"
          title="Wikipedia: Elf (film)"
          target="_blank"
        >
          Elf is a 2003 American Christmas fantasy comedy film directed by Jon
          Favreau and written by David Berenbaum. It stars Will Ferrell, James
          Caan, Zooey Deschanel, Mary Steenburgen, Daniel Tay, Edward Asner, and
          Bob Newhart...
        </PreviewCard>
      </Message.Content>
    </Message>
  </div>
))

stories.add('note', () => (
  <Message to avatar={<Avatar name="Buddy" />}>
    <Message.Chat isNote read timestamp="9:41am">
      Note: SAAAAAAANTAAAAAAAA!
    </Message.Chat>
  </Message>
))

stories.add('typing', () => (
  <Message from avatar={<Avatar name="Arctic Puffin" />}>
    <Message.Chat typing />
  </Message>
))
