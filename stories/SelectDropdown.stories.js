import * as React from 'react'
import { SelectDropdown } from '../src/components'
import {
  withKnobs,
  boolean,
  number,
  select,
  text,
} from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { createSpec, faker } from '@helpscout/helix'
import { storiesOf } from '@storybook/react'
import { withArtboard } from '@helpscout/artboard'

const stories = storiesOf('SelectDropdown', module)
stories.addDecorator(withArtboard({ withResponsiveWidth: true }))
stories.addDecorator(withKnobs)

const ItemSpec = createSpec({
  id: faker.random.uuid(),
  value: faker.name.firstName(),
})
const items = ItemSpec.generate(15)

stories.add('Default', () => {
  const props = {
    items,
    state: select(
      'state',
      {
        default: 'default',
        error: 'error',
      },
      'default'
    ),
    dropUp: boolean('dropUp', false),
    maxHeight: text('maxHeight', '200px'),
    maxWidth: text('maxWidth', '100%'),
    limit: number('limit', 15),
    width: text('width', '100%'),
    onSelect: action('onSelect'),
  }
  return <SelectDropdown {...props} />
})
