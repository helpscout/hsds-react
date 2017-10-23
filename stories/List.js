import React from 'react'
import { storiesOf } from '@storybook/react'
import { List, Heading, Text } from '../src/index.js'

const stories = storiesOf('List', module)

const listItems = [
  {
    title: 'Zoolander',
    year: 2001
  },
  {
    title: 'Old School',
    year: 2003
  },
  {
    title: 'Elf',
    year: 2003
  },
  {
    title: 'Anchorman: The Legend of Ron Burgandy',
    year: 2004
  },
  {
    title: 'Step Brothers',
    year: 2008
  },
  {
    title: 'The Other Guys',
    year: 2010
  }
]

const listItemsMarkup = listItems.map(item => {
  return (
    <List.Item key={item.title}>
      <Text>{item.title}</Text><br />
    </List.Item>
  )
})

stories.add('default', () => (
  <List>
    {listItemsMarkup}
  </List>
))

stories.add('borders', () => (
  <div>
    <Heading size='h4'>Dot</Heading>
    <List border='dot'>
      {listItemsMarkup}
    </List>
    <br />
    <Heading size='h4'>Line</Heading>
    <List border='line'>
      {listItemsMarkup}
    </List>
  </div>
))

stories.add('bullet', () => (
  <List type='bullet'>
    {listItemsMarkup}
  </List>
))

stories.add('inline', () => (
  <List type='inline'>
    {listItemsMarkup}
  </List>
))

stories.add('sizes', () => (
  <div>
    <Heading size='h4'>Extra small</Heading>
    <List type='number' size='xs'>
      {listItemsMarkup}
    </List>
    <br />
    <Heading size='h4'>Small</Heading>
    <List type='number' size='sm'>
      {listItemsMarkup}
    </List>
    <br />
    <Heading size='h4'>Medium</Heading>
    <List type='number' size='md'>
      {listItemsMarkup}
    </List>
    <br />
    <Heading size='h4'>Large</Heading>
    <List type='number' size='lg'>
      {listItemsMarkup}
    </List>
    <br />
  </div>
))
