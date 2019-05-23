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
    onSelect,
    size: select('size', { default: 'default', sm: 'sm', lg: 'lg' }, 'default'),
  }

  return <EmojiPicker {...props} />
})

stories.add('Custom Trigger', () => {
  const customTrigger = <span>Custom Trigger</span>
  return <EmojiPicker trigger={customTrigger} onSelect={onSelect} />
})

const CustomMenu = ({ items, getItemProps }) => {
  return (
    <Dropdown.Card
      className="c-custom-dropdown"
      style={{ backgroundColor: 'blue' }}
    >
      <Dropdown.Menu>
        {items.map((item, index) => {
          const itemProps = getItemProps(item, index)

          return <EmojiItem {...itemProps} />
        })}
      </Dropdown.Menu>
    </Dropdown.Card>
  )
}

stories.add('Custom Menu', () => {
  return (
    <EmojiPicker
      emojiSet={emojiSet}
      onSelect={onSelect}
      renderMenu={CustomMenu}
    />
  )
})

const CustomItem = props => {
  return <Dropdown.Item {...props} value={props.symbol} />
}

stories.add('Custom Item', () => {
  return (
    <EmojiPicker
      emojiSet={emojiSet}
      onSelect={onSelect}
      renderItem={CustomItem}
    />
  )
})
