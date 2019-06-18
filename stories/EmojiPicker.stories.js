import React from 'react'
import { storiesOf } from '@storybook/react'
import Dropdown from '../src/components/Dropdown/V2'
import { emojiSet } from '../src/components/'
import EmojiPicker from '../src/components/EmojiPicker'
import EmojiItem from '../src/components/EmojiPicker/EmojiPicker.Item'
import EmojiPickerReadme from '../src/components/EmojiPicker/README.md'
import { jsxDecorator } from 'storybook-addon-jsx'

import { select } from '@storybook/addon-knobs'
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

const onSelect = (item, props) => {
  console.log('Selected Item', props.item)
}

stories.add('Default', () => {
  const props = {
    isOpen: true,
    onSelect,
    size: select('size', { default: 'default', sm: 'sm', lg: 'lg' }, 'default'),
  }

  return <EmojiPicker {...props} />
})
