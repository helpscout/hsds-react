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
import { SelectDropdown } from '..'

export default {
  component: SelectDropdown,
  title: 'Components/SelectDropdown',
}

const ItemSpec = createSpec({
  id: faker.random.uuid(),
  value: faker.name.firstName(),
})
const items = ItemSpec.generate(15)

export const Default = () => {
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
}

export const ReallyLongItems = () => {
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
}

ReallyLongItems.story = {
  name: 'Really long items',
}

export const StatefullyControlled = () => {
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
}

StatefullyControlled.story = {
  name: 'Statefully controlled',
}
