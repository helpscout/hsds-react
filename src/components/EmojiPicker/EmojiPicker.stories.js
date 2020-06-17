import React from 'react'
import { select } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import EmojiPicker from '.'

export default {
  component: EmojiPicker,
  title: 'Components/Conversation/EmojiPicker',
}
export const Default = () => {
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
    direction: select(
      'Menu direction',
      { left: 'left', right: 'right' },
      'left'
    ),
  }

  return (
    <div style={{ width: '500px', height: '500px', margin: '100px 0 0 100px' }}>
      <EmojiPicker {...props} />
    </div>
  )
}
