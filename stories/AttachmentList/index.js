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
