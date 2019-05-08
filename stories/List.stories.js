import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, select } from '@storybook/addon-knobs'
import { withArtboard } from '@helpscout/artboard'
import { List, Heading, Text } from '../src/index'

const stories = storiesOf('List', module)
stories.addDecorator(
  withArtboard({ withCenterGuides: false, showInterface: false })
)
stories.addDecorator(withKnobs)

const listItems = [
  {
    title: 'Zoolander',
    year: 2001,
  },
  {
    title: 'Old School',
    year: 2003,
  },
  {
    title: 'Elf',
    year: 2003,
  },
  {
    title: 'Anchorman: The Legend of Ron Burgandy',
    year: 2004,
  },
  {
    title: 'Step Brothers',
    year: 2008,
  },
  {
    title: 'The Other Guys',
    year: 2010,
  },
]

const listItemsMarkup = listItems.map(item => {
  return (
    <List.Item key={item.title}>
      <Text>{item.title}</Text>
      <br />
    </List.Item>
  )
})

stories.add('Default', () => {
  const props = {
    border: select(
      'border',
      {
        dot: 'dot',
        line: 'line',
        none: null,
      },
      null
    ),
    type: select(
      'type',
      {
        bullet: 'bullet',
        inline: 'inline',
        number: 'number',
        none: null,
      },
      null
    ),
    size: select(
      'size',
      {
        lg: 'lg',
        md: 'md',
        sm: 'sm',
        xs: 'xs',
      },
      null
    ),
  }

  return <List {...props}>{listItemsMarkup}</List>
})
