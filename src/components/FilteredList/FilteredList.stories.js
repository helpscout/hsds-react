import React from 'react'
import { number } from '@storybook/addon-knobs'
import { FilteredList } from '..'

export default {
  component: FilteredList,
  title: 'Components/Text/FilteredList',
}

const items = [
  'kindalongemail@test.com',
  'abc@abc.com',
  'test@cde.com',
  'anothertest@cde.com',
  'lasttest@cde.com',
  'unbelievablylongemailaddress2374829e28732@test.com',
]

export const Default = () => <FilteredList items={items} />

Default.story = {
  name: 'default',
}

export const WithLimit = () => (
  <FilteredList items={items} limit={number('limit', 2)} />
)

WithLimit.story = {
  name: 'with Limit',
}

export const Inline = () => (
  <FilteredList items={items} limit={number('limit', 2)} inline />
)

Inline.story = {
  name: 'inline',
}

export const InlineMultiple = () => (
  <FilteredList items={items.slice(0, 2)} inline />
)

InlineMultiple.story = {
  name: 'inline multiple',
}

export const InlineSingle = () => (
  <FilteredList items={items.slice(0, 1)} inline />
)

InlineSingle.story = {
  name: 'inline single',
}
