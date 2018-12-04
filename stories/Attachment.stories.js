import React from 'react'
import { storiesOf } from '@storybook/react'
import { Attachment } from '../src/index.js'

const stories = storiesOf('Attachment', module)

stories.add('default', () => {
  return (
    <Attachment
      name="parrot.png"
      size="5kb"
      url="https://github.com/helpscout/hsds-react/raw/master/images/Blue.png"
    />
  )
})

stories.add('long file name', () => {
  return (
    <Attachment
      name="parrot-with-a-super-long-name.png"
      size="5kb"
      url="https://github.com/helpscout/hsds-react/raw/master/images/Blue.png"
    />
  )
})
