import React from 'react'
import { storiesOf } from '@storybook/react'
import { Attachment, AttachmentList } from '../../src/index.js'

const stories = storiesOf('AttachmentList', module)
const onClick = (event, attachment) => {
  console.log(event, attachment)
}
const handleDownloadAllClick = (event) => {
  console.log('Download all')
}

stories.add('default', () => {
  return (
    <AttachmentList onDownloadAllClick={handleDownloadAllClick}>
      <Attachment name='parrot.png' size='5KB' onClick={onClick} />
      <Attachment name='parrot2.png' size='5KB' onClick={onClick} />
      <Attachment name='parrot3-with-a-really-long-name.png' size='5KB' onClick={onClick} />
    </AttachmentList>
  )
})

stories.add('theme: preview', () => {
  return (
    <Attachment.Provider theme='preview'>
      <AttachmentList>
        <Attachment imageUrl='https://img.buzzfeed.com/buzzfeed-static/static/2014-12/5/11/enhanced/webdr06/longform-original-7538-1417798667-22.jpg?downsize=715:*&output-format=auto&output-quality=auto' />
        <Attachment imageUrl='http://matthewjamestaylor.com/img/illustrations/large/how-to-convert-a-liquid-layout-to-fixed-width.jpg' />
        <Attachment name='attachment-coming-soon.md' />
        <Attachment name='attachment-coming-soon.md' />
      </AttachmentList>
    </Attachment.Provider>
  )
})
