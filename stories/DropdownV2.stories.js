import React from 'react'
import { storiesOf } from '@storybook/react'
import Artboard from '@helpscout/artboard'
import Dropdown from '../src/components/Dropdown/DropdownV2'
import { createSpec, faker } from '@helpscout/helix'

const stories = storiesOf('DropdownV2', module)

const ItemSpec = createSpec({
  id: faker.random.uuid(),
  label: faker.name.firstName(),
  value: faker.name.firstName(),
})

const items = [
  {
    ...ItemSpec.generate(),
    items: [
      ...ItemSpec.generate(5),
      {
        ...ItemSpec.generate(),
        items: [
          ...ItemSpec.generate(5),
          { ...ItemSpec.generate(), items: ItemSpec.generate(20) },
        ],
      },
    ],
  },
  ...ItemSpec.generate(10),
]

stories.add('Default', () => (
  <Artboard name="dropdown-v2">
    <Dropdown items={items} />
  </Artboard>
))
