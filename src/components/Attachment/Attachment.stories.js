import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, select, text } from '@storybook/addon-knobs'
import { withArtboard } from '@helpscout/artboard'
import { Attachment } from './Attachment'

const stories = storiesOf('Attachment', module)
stories.addDecorator(withKnobs)
stories.addDecorator(
  withArtboard({ width: 400, height: 200, withCenterGuides: false })
)

stories.add('Default', () => {
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
})
