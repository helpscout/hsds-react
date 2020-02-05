import React from 'react'
import { select, text } from '@storybook/addon-knobs'
import { Attachment } from './Attachment'

export default {
  component: Attachment,
  title: 'Components/Attachment',
}

export const Default = () => {
  const theme = select(
    'theme',
    {
      default: 'default',
      preview: 'preview',
    },
    'default'
  )

  const props = {
    name: text('name', 'derek.png'),
    size: text('size', '5kb'),
    state: select(
      'state',
      {
        default: 'default',
        error: 'error',
      },
      'default'
    ),
    url: text(
      'url',
      'https://github.com/helpscout/hsds-react/raw/master/images/Blue.png'
    ),
  }

  const isPreview = theme === 'preview'

  return (
    <Attachment.Provider theme={theme}>
      <Attachment {...props} size={!isPreview && props.size} />
    </Attachment.Provider>
  )
}
