import React from 'react'
import { boolean, number, select, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { createSpec, faker } from '@helpscout/helix'
import SelectDropdown from './index'

export default {
  component: SelectDropdown,
  title: 'Components/Dropdowns/SelectDropdown',
}

export const Default = () => {
  return (
    <SelectDropdown
      disabled={boolean('disabled', false)}
      autoInput={false}
      items={createSpec({
        id: faker.random.uuid(),
        value: faker.name.firstName(),
      }).generate(20)}
      state={select(
        'state',
        {
          default: 'default',
          error: 'error',
        },
        'default'
      )}
      dropUp={boolean('dropUp', false)}
      maxHeight={text('maxHeight', '200px')}
      maxWidth={text('maxWidth', '100%')}
      limit={number('limit', 15)}
      width={text('width', '100%')}
      onSelect={action('onSelect')}
    />
  )
}

export const WithAutoInput = () => {
  return (
    <SelectDropdown
      autoInput
      items={createSpec({
        id: faker.random.uuid(),
        value: faker.name.firstName(),
      }).generate(20)}
      state={select(
        'state',
        {
          default: 'default',
          error: 'error',
        },
        'default'
      )}
      dropUp={boolean('dropUp', false)}
      maxHeight={text('maxHeight', '200px')}
      maxWidth={text('maxWidth', '100%')}
      limit={number('limit', 15)}
      width={text('width', '100%')}
      onSelect={action('onSelect')}
    />
  )
}

WithAutoInput.story = {
  name: 'with auto input',
}

export const States = () => (
  <div>
    <SelectDropdown state="error" />
    <br />
    <SelectDropdown state="success" />
    <br />
    <SelectDropdown state="warning" />
  </div>
)

States.story = {
  name: 'states',
}
