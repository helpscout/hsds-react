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
  onClick: () => value => console.log('Item Clicked!', value),
})

stories.add('Default', () => {
  const options = ItemSpec.generate(4)

  return (
    <ButtonWithOptions
      options={options}
      onClick={() => alert('Button Clicked!')}
    >
      Submit
    </ButtonWithOptions>
  )
})

stories.add('Disabled', () => {
  const options = ItemSpec.generate(4)

  return (
    <ButtonWithOptions
      disabled
      options={options}
      onClick={() => alert('Button Clicked!')}
    >
      Submit
    </ButtonWithOptions>
  )
})
