import * as React from 'react'
import { withKnobs, boolean, number, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'

import { FilteredList } from '../src/components'

const items = [
  'kindalongemail@test.com',
  'abc@abc.com',
  'test@cde.com',
  'anothertest@cde.com',
  'lasttest@cde.com',
]

const stories = storiesOf('FilteredList', module)
stories.addDecorator(withKnobs)

stories.add('default', () => <FilteredList items={items} />)
stories.add('with Limit', () => (
  <FilteredList items={items} limit={number('limit', 2)} />
))
stories.add('inline', () => (
  <FilteredList items={items} limit={number('limit', 2)} inline />
))
