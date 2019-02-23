import React from 'react'
import { storiesOf } from '@storybook/react'
import ButtonWithOptions from '../src/components/ButtonWithOptions'

import {
  withKnobs,
  boolean,
  number,
  text,
  select,
} from '@storybook/addon-knobs'
import { createSpec, faker } from '@helpscout/helix'
import { withArtboard } from '@helpscout/artboard'

const stories = storiesOf('ButtonWithOptions', module)

stories.addDecorator(
  withArtboard({
    id: 'hsds-ButtonWithOptions',
    width: 500,
    height: 300,
    withCenterGuides: false,
  })
)
stories.addDecorator(withKnobs)

const ItemSpec = createSpec({
  label: faker.lorem.words(),
  value: faker.lorem.words(),
  onClick: () => event => console.log('Item Clicked!', event),
})

const dropdownProps = {
  items: ItemSpec.generate(20),
  onSelect: value => console.log(value),
}

stories.add('Default', () => {
  return (
    <ButtonWithOptions
      dropdownProps={dropdownProps}
      kind="primary"
      onClick={() => alert('Button Clicked!')}
      size="lg"
    >
      Submit
    </ButtonWithOptions>
  )
})

stories.add('Sizes and Colours', () => {
  return (
    <div>
      <ButtonWithOptions
        dropdownProps={dropdownProps}
        kind="tertiary"
        size="sm"
      >
        Small
      </ButtonWithOptions>
      <ButtonWithOptions
        dropdownProps={dropdownProps}
        kind="primaryAlt"
        size="md"
      >
        Medium
      </ButtonWithOptions>
      <ButtonWithOptions dropdownProps={dropdownProps} kind="primary" size="lg">
        Primary
      </ButtonWithOptions>
    </div>
  )
})

stories.add('Disabled', () => {
  return (
    <ButtonWithOptions
      disabled
      dropdownProps={dropdownProps}
      kind="secondary"
      size="lg"
    >
      Submit
    </ButtonWithOptions>
  )
})
