import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, number } from '@storybook/addon-knobs'
import { FilteredList } from '..'

const items = [
  'kindalongemail@test.com',
  'abc@abc.com',
  'test@cde.com',
  'anothertest@cde.com',
  'lasttest@cde.com',
]

const stories = storiesOf('Components/FilteredList', module)
stories.addDecorator(withKnobs)

stories.add('default', () => <FilteredList items={items} />)
stories.add('with Limit', () => (
  <FilteredList items={items} limit={number('limit', 2)} />
))
stories.add('inline', () => (
  <FilteredList items={items} limit={number('limit', 2)} inline />
))
stories.add('inline (multiple)', () => (
  <FilteredList items={items.slice(0, 2)} inline />
))
stories.add('inline (single)', () => (
  <FilteredList items={items.slice(0, 1)} inline />
))

stories.add('custom renderer', () => {
  const items = [
    { label: 'Google', href: 'https://google.com' },
    { label: 'Bing', href: 'https://bing.com' },
    { label: 'DuckDuckGo', href: 'https://duckduckgo.com' },
  ]
  const renderItem = item => {
    return <a href={item.href}>{item.label}</a>
  }

  return (
    <FilteredList
      renderItem={renderItem}
      items={items}
      limit={number('limit', 2)}
      inline
      itemKey="label"
    />
  )
})
