import React from 'react'
import { Avatar, Message } from '../../index'
import { faker } from '@helpscout/helix'

export default {
  component: Message,
  title: 'Components/Conversation/Message (Chat)',
}

const html = `
  <div style="left: 0;
              width: 100%;
              height: 0;
              position: relative;
              padding-bottom: 56.2493%;"
  >
    <iframe src="https://www.youtube.com/embed/evvzG0Xz69Q?rel=0&showinfo=0"
            style="border: 0;
                   top: 0;
                   left: 0;
                   width: 100%;
                   height: 100%;
                   position: absolute;"
            allowfullscreen
            scrolling="no"
    ></iframe>
  </div>
`
const html2 = `
  <iframe src="https://open.spotify.com/embed/track/6tgTTBaIf0tO6lvDhoXfMg"
          style="border: 0;
                 width: 100%;
                 height: 380px;"
          allowfullscreen
  ></iframe>
`
const html3 = `
  <div style="left: 0;
              width: 100%;
              height: 0;
              position: relative;
              padding-bottom: 56.2493%;"
  >
    <iframe src="https://player.vimeo.com/video/60743582?byline=0&amp;badge=0&amp;portrait=0&amp;title=0"
            style="border: 0;
                   top: 0;
                   left: 0;
                   width: 100%;
                   height: 100%;
                   position: absolute;"
            allowfullscreen
            scrolling="no"
    >
    </iframe>
  </div>
`
const html4 = `
<div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 83.9419%;"><iframe src="//speakerdeck.com/player/19b85c8a3b63450d85f6df64db9d0359" style="border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;" allowfullscreen scrolling="no"></iframe></div>
`

export const _Embed = () => (
  <Message.Provider theme="embed">
    <Message from avatar={<Avatar name="Artic Puffin" />}>
      <Message.Embed html={html} />
    </Message>
    <Message to avatar={<Avatar name="Dapper Duck" />}>
      <Message.Chat read timestamp="9:41am">
        {faker.lorem.paragraphs()()}
      </Message.Chat>
    </Message>
  </Message.Provider>
)

export const EmbedNote = () => (
  <Message.Provider theme="embed">
    <Message from avatar={<Avatar name="Artic Puffin" />}>
      <Message.Embed isNote html={html} />
    </Message>
  </Message.Provider>
)

EmbedNote.story = {
  name: 'Embed note',
}

export const EmbedLeftRight = () => {
  return (
    <Message.Provider theme="embed">
      <Message to avatar={<Avatar name="Artic Puffin" />}>
        <Message.Chat>Agent chat</Message.Chat>
        <Message.Embed html={html} />
      </Message>
      <Message from avatar={<Avatar name="Dapper Duck" />}>
        <Message.Chat>Reply</Message.Chat>
        <Message.Embed html={html2} />
        <Message.Embed html={html3} />
      </Message>
      <Message to avatar={<Avatar name="Artic Puffin" />}>
        <Message.Chat isNote>Private note</Message.Chat>
        <Message.Embed isNote html={html4} />
      </Message>
    </Message.Provider>
  )
}

EmbedLeftRight.story = {
  name: 'Embed left-right',
}

export const EmbedConsecutive = () => {
  return (
    <Message.Provider theme="embed">
      <Message to avatar={<Avatar name="Artic Puffin" />}>
        <Message.Chat>Agent Chat</Message.Chat>
        <Message.Embed html={html} />
        <Message.Embed html={html2} />
        <Message.Embed html={html3} />
        <Message.Embed html={html4} />
      </Message>
    </Message.Provider>
  )
}

EmbedConsecutive.story = {
  name: 'Embed consecutive',
}
