import * as React from 'react'
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
import { SelectDropdown } from '..'

const stories = storiesOf('SelectDropdown', module)
stories.addDecorator(
  withArtboard({ id: 'SelectDropdown', withResponsiveWidth: true })
)
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

stories.add('Really long items', () => {
  const props = {
    items: [
      {
        label:
          'Will has a really really really really really really really really really really really really really really really long name',
        value: '1',
      },
      {
        label:
          'Ron has a really really really really really really really really really really really really really really really long name',
        value: '2',
      },
    ],
    value: null,
  }

  return <SelectDropdown {...props} />
})

stories.add('Statefully controlled', () => {
  class Example extends React.Component {
    state = {
      items: [
        { label: 'Will', value: '123' },
        { label: 'Ron', value: '456' },
      ],
      value: null,
    }

    onChange = value => {
      this.setState({ value })
    }

    render() {
      return <SelectDropdown {...this.state} onChange={this.onChange} />
    }
  }

  return <Example />
})
