import React from 'react'
import { storiesOf } from '@storybook/react'
import { ChatTranscript } from '../../src/index.js'
import fixture from './fixture/data'

const stories = storiesOf('ChatTranscript', module)
const fixtureTranscript = fixture.events
const author = {
  name: 'Name'
}
const createdAt = '3:07pm'
const attachments = [
  {
    name: 'one.png',
    size: '1KB'
  },
  {
    name: 'two.png',
    size: '2KB'
  }
]

const onAttachmentClick = (event, attachment) => {
  console.log(attachment)
}

stories.add('default', () => {
  const itemMarkup = fixtureTranscript.map(item => {
    return (
      <ChatTranscript.Item
        key={item.body}
        {...item}
        author={author}
        createdAt={createdAt}
        onAttachmentClick={onAttachmentClick}
      />
    )
  })
  return (
    <ChatTranscript>
      {itemMarkup}
    </ChatTranscript>
  )
})

stories.add('multiple attachments', () => {
  const attachments = [
    {
      name: 'one.png',
      size: '1KB'
    },
    {
      name: 'two.png',
      size: '2KB'
    }
  ]
  const onAttachmentClick = (e, data) => {
    console.log('attachment clicked', data)
  }
  const onDownloadAllAttachmentClick = (e, data) => {
    console.log('download all clicked')
  }
  const props = {
    attachments,
    author: {
      name: 'Author name'
    },
    body: 'Chat Message body content. Stuff. Time.',
    createdAt: '9:41am',
    onAttachmentClick,
    onDownloadAllAttachmentClick
  }
  return (
    <ChatTranscript>
      <ChatTranscript.Item {...props} />
    </ChatTranscript>
  )
})

stories.add('types', () => {
  return (
    <ChatTranscript>
      <ChatTranscript.Item
        body='Something happened (This is a line_item)'
        type='line_item'
      />

      <ChatTranscript.Item
        author={{
          name: 'Buddy'
        }}
        body='Not now Arctic Puffin! (This is a message)'
        createdAt='9:41am'
        type='message'
      />

      <ChatTranscript.Item
        attachments={attachments}
        author={{
          name: 'Buddy'
        }}
        body='Not now Arctic Puffin! (This is a message + attachments)'
        createdAt='9:41am'
        type='message'
      />

      <ChatTranscript.Item
        author={{
          name: 'Buddy'
        }}
        body='Not now Arctic Puffin! (This is a note)'
        createdAt='9:41am'
        type='note'
      />

      <ChatTranscript.Item
        attachments={attachments}
        author={{
          name: 'Buddy'
        }}
        body='Not now Arctic Puffin! (This is a note + attachments)'
        createdAt='9:41am'
        type='note'
      />

      <ChatTranscript.Item
        body='Something happened (This is a line_item)'
        type='line_item'
      />
    </ChatTranscript>
  )
})
