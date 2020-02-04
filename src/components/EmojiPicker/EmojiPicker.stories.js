import React from 'react'
import { storiesOf } from '@storybook/react'
import { select } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { withArtboard } from '@helpscout/artboard'
import EmojiPicker from '.'

const stories = storiesOf('Components/EmojiPicker', module)

stories.addDecorator(
  withArtboard({
    width: 500,
    height: 300,
    withCenterGuides: false,
    showInterface: false,
  })
)

stories.add('Default', () => {
  const props = {
    shouldRefocusOnClose() {
      return false
    },
    onSelect: action('Emoji Selected'),
    size: select(
      'Emoji Size',
      { default: 'default', sm: 'sm', lg: 'lg' },
      'default'
    ),
  }

  return <EmojiPicker {...props} />
})
