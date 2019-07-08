import React from 'react'
import { storiesOf } from '@storybook/react'
import EmojiPicker from '../src/components/EmojiPicker'
import EmojiPickerReadme from '../src/components/EmojiPicker/README.md'
import { jsxDecorator } from 'storybook-addon-jsx'

import { select } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { withArtboard } from '@helpscout/artboard'

const stories = storiesOf('EmojiPicker', module)
stories.addDecorator(jsxDecorator)
stories.addDecorator(
  withArtboard({
    width: 500,
    height: 300,
    withCenterGuides: false,
    showInterface: false,
  })
)

stories.addParameters({
  readme: { sidebar: EmojiPickerReadme },
})

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
